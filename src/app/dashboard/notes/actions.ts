"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { updateStreak } from "@/app/dashboard/streaks/actions"
import { sanitizeHtml, sanitizeText } from "@/lib/sanitize"
import { checkRateLimit } from "@/lib/rate-limit"
import { logSecurityEvent } from "@/lib/security-logger"

const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string(),
})

export async function getNotes() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return notes
}

export async function getNote(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId: session.user.id
    },
  })

  if (!note) {
    throw new Error("Note not found")
  }

  return note
}

export async function createNote(data: { title: string; content: string }) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:createNote:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "create_note",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const validated = noteSchema.parse(data)

  const note = await prisma.note.create({
    data: {
      title: sanitizeText(validated.title),
      content: sanitizeHtml(validated.content),
      userId: session.user.id,
    },
  })

  // Update notes streak
  try {
    await updateStreak("daily_notes")
  } catch (error) {
    console.error("Failed to update notes streak:", error)
  }

  revalidatePath("/dashboard/notes")
  return note
}

export async function updateNote(id: string, data: { title: string; content: string }) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:updateNote:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "update_note",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const validated = noteSchema.parse(data)

  const note = await prisma.note.updateMany({
    where: {
      id,
      userId: session.user.id
    },
    data: {
      title: sanitizeText(validated.title),
      content: sanitizeHtml(validated.content),
    },
  })

  if (note.count === 0) {
    throw new Error("Note not found")
  }

  revalidatePath("/dashboard/notes")
  revalidatePath(`/dashboard/notes/${id}`)
}

export async function deleteNote(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:deleteNote:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "delete_note",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const note = await prisma.note.deleteMany({
    where: {
      id,
      userId: session.user.id
    },
  })

  if (note.count === 0) {
    throw new Error("Note not found")
  }

  revalidatePath("/dashboard/notes")
}
