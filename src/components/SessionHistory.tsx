"use client"

import { formatDistanceToNow, format } from "date-fns"

interface Session {
  id: string
  type: string
  duration: number
  completedAt: Date
}

interface SessionHistoryProps {
  sessions: Session[]
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/8 bg-white/[0.03] py-12 text-center">
        <svg className="mb-4 h-16 w-16 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mb-2 text-lg font-medium text-white">No sessions yet</h3>
        <p className="text-sm text-[color:var(--foreground-muted)]">Start your first focus session to build momentum.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} />
      ))}
    </div>
  )
}

function SessionItem({ session }: { session: Session }) {
  const isWork = session.type === "work"
  const durationMinutes = Math.floor(session.duration / 60)
  const completedDate = new Date(session.completedAt)

  return (
    <div className="group rounded-[22px] border border-white/8 bg-white/[0.025] p-4 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
              isWork
                ? "border-cyan-400/14 bg-cyan-500/10 text-cyan-300"
                : "border-emerald-400/14 bg-emerald-500/10 text-emerald-300"
            }`}
          >
            {isWork ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-white">{isWork ? "Focus Session" : "Break Session"}</h3>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  isWork
                    ? "bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/10"
                    : "bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-400/10"
                }`}
              >
                {durationMinutes} min
              </span>
            </div>
            <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">
              {format(completedDate, "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>

        <div className="text-xs font-medium text-[color:var(--foreground-soft)] sm:text-right">
          {formatDistanceToNow(completedDate, { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}
