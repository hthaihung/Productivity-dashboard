"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rate-limit"
import { logSecurityEvent } from "@/lib/security-logger"

export async function getAnalytics() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rateLimitCheck = await checkRateLimit(`action:getAnalytics:${session.user.id}`)

  if (!rateLimitCheck.success) {
    logSecurityEvent({
      event: "rate_limit_exceeded",
      userId: session.user.id,
      details: "get_analytics",
    })
    throw new Error("Too many requests. Please try again later.")
  }

  const userId = session.user.id

  // Get date ranges
  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)

  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - 7)
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfMonth = new Date(now)
  startOfMonth.setDate(now.getDate() - 30)
  startOfMonth.setHours(0, 0, 0, 0)

  // Fetch all data in parallel
  const [
    totalNotes,
    totalTasks,
    completedTasks,
    pendingTasks,
    totalPomodoroSessions,
    todayPomodoroSessions,
    weekPomodoroSessions,
    monthPomodoroSessions,
    streaks,
    recentActivity,
  ] = await Promise.all([
    // Notes
    prisma.note.count({ where: { userId } }),

    // Tasks
    prisma.task.count({ where: { userId } }),
    prisma.task.count({ where: { userId, status: "completed" } }),
    prisma.task.count({ where: { userId, status: { in: ["pending", "in_progress"] } } }),

    // Pomodoro sessions
    prisma.pomodoroSession.count({ where: { userId } }),
    prisma.pomodoroSession.count({
      where: { userId, completedAt: { gte: startOfToday } },
    }),
    prisma.pomodoroSession.count({
      where: { userId, completedAt: { gte: startOfWeek } },
    }),
    prisma.pomodoroSession.count({
      where: { userId, completedAt: { gte: startOfMonth } },
    }),

    // Streaks
    prisma.streak.findMany({
      where: { userId },
      orderBy: { currentCount: "desc" },
    }),

    // Recent activity (last 10 items across all types)
    Promise.all([
      prisma.note.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, createdAt: true },
      }),
      prisma.task.findMany({
        where: { userId, status: "completed" },
        orderBy: { completedAt: "desc" },
        take: 5,
        select: { id: true, title: true, completedAt: true },
      }),
      prisma.pomodoroSession.findMany({
        where: { userId },
        orderBy: { completedAt: "desc" },
        take: 5,
        select: { id: true, type: true, duration: true, completedAt: true },
      }),
    ]),
  ])

  // Calculate total focus time
  const allSessions = await prisma.pomodoroSession.findMany({
    where: { userId },
    select: { duration: true },
  })
  const totalFocusMinutes = allSessions.reduce((sum, s) => sum + s.duration, 0)

  // Calculate today's focus time
  const todaySessions = await prisma.pomodoroSession.findMany({
    where: { userId, completedAt: { gte: startOfToday } },
    select: { duration: true },
  })
  const todayFocusMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0)

  // Combine and sort recent activity
  const [recentNotes, recentTasks, recentSessions] = recentActivity
  const combinedActivity = [
    ...recentNotes.map((n) => ({
      type: "note" as const,
      title: n.title,
      timestamp: n.createdAt,
    })),
    ...recentTasks.map((t) => ({
      type: "task" as const,
      title: t.title,
      timestamp: t.completedAt || new Date(),
    })),
    ...recentSessions.map((s) => ({
      type: "session" as const,
      title: `${s.type === "focus" ? "Focus" : "Break"} session (${s.duration}min)`,
      timestamp: s.completedAt,
    })),
  ]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10)

  return {
    notes: {
      total: totalNotes,
    },
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    },
    focus: {
      totalSessions: totalPomodoroSessions,
      todaySessions: todayPomodoroSessions,
      weekSessions: weekPomodoroSessions,
      monthSessions: monthPomodoroSessions,
      totalMinutes: totalFocusMinutes,
      todayMinutes: todayFocusMinutes,
    },
    streaks: streaks.map((s) => ({
      type: s.type,
      currentCount: s.currentCount,
      longestCount: s.longestCount,
    })),
    recentActivity: combinedActivity,
  }
}
