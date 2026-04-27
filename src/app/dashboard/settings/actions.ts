"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { sanitizeText } from "@/lib/sanitize"
import { logSecurityEvent } from "@/lib/security-logger"
import { checkRateLimit } from "@/lib/rate-limit"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
})

export async function getProfile() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

export async function updateProfile(data: { name: string; email: string }) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:updateProfile:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "update_profile",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const validated = profileSchema.parse(data)

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: sanitizeText(validated.name),
      email: validated.email,
    },
  })

  revalidatePath("/dashboard/settings")
  return user
}

export async function deleteAccount() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:deleteAccount:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "delete_account",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const userId = session.user.id
  const userEmail = session.user.email

  await prisma.user.delete({
    where: { id: userId },
  })

  logSecurityEvent({
    timestamp: new Date().toISOString(),
    event: "account_deleted",
    userId,
    email: userEmail || undefined,
  })

  revalidatePath("/dashboard/settings")
}
