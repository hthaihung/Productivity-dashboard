"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { updateStreak } from "@/app/dashboard/streaks/actions"
import { sanitizeText } from "@/lib/sanitize"
import { checkRateLimit } from "@/lib/rate-limit"
import { logSecurityEvent } from "@/lib/security-logger"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().optional(),
})

export async function getTasks() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: [
      { status: "asc" },
      { priority: "desc" },
      { dueDate: "asc" },
    ],
  })

  return tasks
}

export async function getTask(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: session.user.id
    },
  })

  if (!task) {
    throw new Error("Task not found")
  }

  return task
}

export async function createTask(data: z.infer<typeof taskSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:createTask:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "create_task",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const validated = taskSchema.parse(data)

  const task = await prisma.task.create({
    data: {
      title: sanitizeText(validated.title),
      description: validated.description ? sanitizeText(validated.description) : undefined,
      status: validated.status,
      priority: validated.priority,
      dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard/tasks")
  return task
}

export async function updateTask(id: string, data: z.infer<typeof taskSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:updateTask:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "update_task",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const validated = taskSchema.parse(data)

  const task = await prisma.task.updateMany({
    where: {
      id,
      userId: session.user.id
    },
    data: {
      title: sanitizeText(validated.title),
      description: validated.description ? sanitizeText(validated.description) : undefined,
      status: validated.status,
      priority: validated.priority,
      dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
    },
  })

  if (task.count === 0) {
    throw new Error("Task not found")
  }

  revalidatePath("/dashboard/tasks")
  revalidatePath(`/dashboard/tasks/${id}`)
}

export async function toggleTaskComplete(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const task = await prisma.task.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!task) {
    throw new Error("Task not found")
  }

  const isCompleted = task.status === "completed"

  await prisma.task.update({
    where: { id },
    data: {
      status: isCompleted ? "pending" : "completed",
      completedAt: isCompleted ? null : new Date(),
    },
  })

  // Update tasks streak when completing a task
  if (!isCompleted) {
    try {
      await updateStreak("daily_tasks")
    } catch (error) {
      console.error("Failed to update tasks streak:", error)
    }
  }

  revalidatePath("/dashboard/tasks")
}

export async function deleteTask(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:deleteTask:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "delete_task",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const task = await prisma.task.deleteMany({
    where: {
      id,
      userId: session.user.id
    },
  })

  if (task.count === 0) {
    throw new Error("Task not found")
  }

  revalidatePath("/dashboard/tasks")
}
