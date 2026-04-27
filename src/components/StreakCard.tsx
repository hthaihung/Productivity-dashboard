"use client"

import { formatDistanceToNow } from "date-fns"

type StreakType = "daily_focus" | "daily_tasks" | "daily_notes"

interface StreakCardProps {
  type: StreakType
  currentCount: number
  longestCount: number
  lastActiveAt: Date
}

const streakConfig = {
  daily_focus: {
    label: "Focus Streak",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    color: "orange",
  },
  daily_tasks: {
    label: "Task Streak",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "emerald",
  },
  daily_notes: {
    label: "Notes Streak",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "violet",
  },
}

const milestones = [
  { days: 5, label: "5-Day Warrior", emoji: "🔥" },
  { days: 10, label: "10-Day Champion", emoji: "⚡" },
  { days: 25, label: "25-Day Legend", emoji: "💎" },
  { days: 50, label: "50-Day Master", emoji: "👑" },
  { days: 100, label: "100-Day Titan", emoji: "🏆" },
]

function getMilestone(count: number) {
  for (let i = milestones.length - 1; i >= 0; i--) {
    if (count >= milestones[i].days) {
      return milestones[i]
    }
  }
  return null
}

function getNextMilestone(count: number) {
  for (const milestone of milestones) {
    if (count < milestone.days) {
      return milestone
    }
  }
  return null
}

export function StreakCard({ type, currentCount, longestCount, lastActiveAt }: StreakCardProps) {
  const config = streakConfig[type]
  const milestone = getMilestone(currentCount)
  const nextMilestone = getNextMilestone(currentCount)

  const progress = nextMilestone
    ? ((currentCount % nextMilestone.days) / nextMilestone.days) * 100
    : 100

  const colorClasses = {
    orange: {
      border: "border-orange-500/50",
      shadow: "shadow-orange-500/10",
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      gradient: "from-orange-500 to-red-500",
    },
    emerald: {
      border: "border-emerald-500/50",
      shadow: "shadow-emerald-500/10",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      gradient: "from-emerald-500 to-green-500",
    },
    violet: {
      border: "border-violet-500/50",
      shadow: "shadow-violet-500/10",
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      gradient: "from-violet-500 to-purple-500",
    },
  }

  const colors = colorClasses[config.color as keyof typeof colorClasses]

  return (
    <div
      className={`panel-surface rounded-[28px] p-6 transition-all duration-300 hover:${colors.border} hover:${colors.shadow}`}
      style={{ transition: "all 0.3s ease-out" }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="section-label">Streak</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{config.label}</h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 ${colors.bg} ${colors.text}`}>
          {config.icon}
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="relative inline-block">
            <div className={`absolute inset-3 rounded-full bg-gradient-to-br ${colors.gradient} opacity-10 blur-2xl`} />
            <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-white/8"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className={colors.text}
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="metric-numeral text-5xl font-semibold text-white">{currentCount}</p>
              <p className="mt-1 text-xs text-[color:var(--foreground-soft)]">days</p>
            </div>
          </div>
        </div>

        {milestone && (
          <div className={`rounded-2xl border border-white/8 bg-gradient-to-r ${colors.gradient} px-4 py-3 text-center shadow-[0_14px_36px_rgba(15,23,42,0.22)]`}>
            <p className="text-sm font-medium text-white">
              {milestone.emoji} {milestone.label}
            </p>
          </div>
        )}

        {nextMilestone && (
          <div className="space-y-3 rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-xs text-[color:var(--foreground-soft)]">
              <span>Next milestone</span>
              <span>{nextMilestone.days - currentCount} days left</span>
            </div>
            <p className="text-sm font-medium text-white">{nextMilestone.label}</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-3 border-t border-white/8 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[color:var(--foreground-muted)]">Longest streak</span>
            <span className="font-semibold text-white">{longestCount} days</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[color:var(--foreground-soft)]">
            <span>Last active</span>
            <span>{formatDistanceToNow(new Date(lastActiveAt), { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
