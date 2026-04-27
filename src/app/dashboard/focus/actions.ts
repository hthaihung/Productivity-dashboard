"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { updateStreak } from "@/app/dashboard/streaks/actions"

const pomodoroSessionSchema = z.object({
  duration: z.number().min(1, "Duration must be at least 1 minute").max(120, "Duration cannot exceed 120 minutes"),
  type: z.enum(["focus", "short_break", "long_break"]),
})

export async function getPomodoroSessions() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const sessions = await prisma.pomodoroSession.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: "desc" },
  })

  return sessions
}

export async function createPomodoroSession(duration: number, type: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const validated = pomodoroSessionSchema.parse({ duration, type })

  const pomodoroSession = await prisma.pomodoroSession.create({
    data: {
      duration: validated.duration,
      type: validated.type,
      userId: session.user.id,
    },
  })

  // Update focus streak
  if (validated.type === "focus") {
    try {
      await updateStreak("daily_focus")
    } catch (error) {
      console.error("Failed to update focus streak:", error)
    }
  }

  revalidatePath("/dashboard/focus")
  return pomodoroSession
}

export async function getTodayStats() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const todaySessions = await prisma.pomodoroSession.findMany({
    where: {
      userId: session.user.id,
      completedAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  })

  const sessionCount = todaySessions.length
  const totalFocusTime = todaySessions.reduce((sum, session) => sum + session.duration, 0)

  return {
    sessionCount,
    totalFocusTime,
  }
}
