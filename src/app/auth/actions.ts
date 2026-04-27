"use server"

import { signIn } from "@/lib/auth"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { logSecurityEvent } from "@/lib/security-logger"
import { checkRateLimit } from "@/lib/rate-limit"

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function signInWithCredentials(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validation = signInSchema.safeParse({ email, password })

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    }
  }

  const rateLimitCheck = await checkRateLimit(`auth:signin:${validation.data.email}`, "auth")

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      timestamp: new Date().toISOString(),
      event: "rate_limit_exceeded",
      email: validation.data.email,
      details: "signin_attempt",
    })
    return { error: "Too many attempts. Please try again later." }
  }

  try {
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    })

    logSecurityEvent({
      timestamp: new Date().toISOString(),
      event: "auth_signin_success",
      email: validation.data.email,
    })

    return { success: true }
  } catch (error) {
    logSecurityEvent({
      timestamp: new Date().toISOString(),
      event: "auth_signin_failed",
      email: validation.data.email,
      details: error instanceof AuthError ? error.type : "unknown_error",
    })

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" }
        default:
          return { error: "Something went wrong. Please try again." }
      }
    }
    throw error
  }
}

export async function signUpWithCredentials(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validation = signUpSchema.safeParse({ name, email, password })

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    }
  }

  const rateLimitCheck = await checkRateLimit(`auth:signup:${validation.data.email}`, "auth")

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      timestamp: new Date().toISOString(),
      event: "rate_limit_exceeded",
      email: validation.data.email,
      details: "signup_attempt",
    })
    return { error: "Too many attempts. Please try again later." }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validation.data.email },
    })

    if (existingUser) {
      logSecurityEvent({
        timestamp: new Date().toISOString(),
        event: "auth_signup_failed",
        email: validation.data.email,
        details: "email_already_exists",
      })
      return { error: "An account with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validation.data.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: hashedPassword,
      },
    })

    logSecurityEvent({
      timestamp: new Date().toISOString(),
      event: "auth_signup_success",
      userId: user.id,
      email: validation.data.email,
    })

    // Sign in the user
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    logSecurityEvent({
      timestamp: new Date().toISOString(),
      event: "auth_signup_failed",
      email: validation.data.email,
      details: "database_error",
    })
    return { error: "Failed to create account. Please try again." }
  }
}
