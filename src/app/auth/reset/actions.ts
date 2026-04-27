"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"
import { checkRateLimit } from "@/lib/rate-limit"
import { logSecurityEvent } from "@/lib/security-logger"
import { sendPasswordResetEmail } from "@/lib/email"

const requestResetSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string

  const validation = requestResetSchema.safeParse({ email })

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    }
  }

  const rateLimitCheck = await checkRateLimit(`auth:reset-request:${validation.data.email}`, "auth")

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      email: validation.data.email,
      details: "password_reset_request",
    })
    return { error: "Too many requests. Please try again later." }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: validation.data.email },
    })

    if (!user) {
      return { success: true }
    }

    await prisma.passwordResetToken.deleteMany({
      where: { email: validation.data.email },
    })

    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 3600000)

    await prisma.passwordResetToken.create({
      data: {
        email: validation.data.email,
        token,
        expires,
      },
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

    const emailResult = await sendPasswordResetEmail({
      to: validation.data.email,
      resetUrl,
    })

    if (!emailResult.success) {
      console.warn(`Failed to send password reset email to ${validation.data.email}`)
    }

    logSecurityEvent({
      event: "password_reset_requested",
      email: validation.data.email,
      details: emailResult.success ? "email_sent" : "email_failed",
    })

    return { success: true }
  } catch (error) {
    console.error("Password reset request error:", error)
    return { error: "Failed to process request. Please try again." }
  }
}

export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string
  const password = formData.get("password") as string

  const validation = resetPasswordSchema.safeParse({ token, password })

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    }
  }

  const rateLimitCheck = await checkRateLimit(`auth:reset-password:${validation.data.token}`, "auth")

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      details: "password_reset_attempt",
    })
    return { error: "Too many requests. Please try again later." }
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: validation.data.token },
    })

    if (!resetToken || resetToken.expires < new Date()) {
      return { error: "Invalid or expired reset token" }
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10)

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    })

    await prisma.passwordResetToken.delete({
      where: { token: validation.data.token },
    })

    logSecurityEvent({
      event: "auth_signin_success",
      email: resetToken.email,
      details: "password_reset_completed",
    })

    return { success: true }
  } catch (error) {
    console.error("Password reset error:", error)
    return { error: "Failed to reset password. Please try again." }
  }
}
