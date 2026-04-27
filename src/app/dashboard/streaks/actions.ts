"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const streakTypeSchema = z.enum(["daily_focus", "daily_tasks", "daily_notes"])

type StreakAction = "increment" | "reset" | "no_change"

function shouldIncrementStreak(lastActiveAt: Date, today: Date): StreakAction {
  const lastActive = new Date(lastActiveAt.toISOString().split('T')[0] + 'T00:00:00.000Z')
  const todayStart = new Date(today.toISOString().split('T')[0] + 'T00:00:00.000Z')

  const diffTime = todayStart.getTime() - lastActive.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  if (diffDays === 0) {
    return "no_change"
  } else if (diffDays === 1) {
    return "increment"
  } else {
    return "reset"
  }
}

export async function getStreaks() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const streaks = await prisma.streak.findMany({
    where: { userId: session.user.id },
    orderBy: { type: "asc" },
  })

  return streaks
}

export async function updateStreak(type: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const validatedType = streakTypeSchema.parse(type)

  const today = new Date()

  const result = await prisma.$transaction(async (tx) => {
    const streak = await tx.streak.findFirst({
      where: {
        userId: session.user.id,
        type: validatedType,
      },
    })

    if (!streak) {
      return await tx.streak.create({
        data: {
          type: validatedType,
          currentCount: 1,
          longestCount: 1,
          lastActiveAt: today,
          userId: session.user.id,
        },
      })
    }

    const action = shouldIncrementStreak(streak.lastActiveAt, today)

    if (action === "no_change") {
      return streak
    }

    const newCurrentCount = action === "increment" ? streak.currentCount + 1 : 1
    const newLongestCount = Math.max(newCurrentCount, streak.longestCount)

    return await tx.streak.update({
      where: { id: streak.id },
      data: {
        currentCount: newCurrentCount,
        longestCount: newLongestCount,
        lastActiveAt: today,
      },
    })
  })

  revalidatePath("/dashboard/streaks")
  return result
}
