import { getAnalytics } from "./analytics/actions"
import Link from "next/link"

const activityStyles = {
  note: {
    dot: "bg-violet-400",
    badge: "bg-violet-500/12 text-violet-300 ring-1 ring-violet-400/12",
    label: "Note",
  },
  task: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-400/12",
    label: "Task",
  },
  session: {
    dot: "bg-cyan-400",
    badge: "bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/12",
    label: "Focus",
  },
} as const

export default async function DashboardPage() {
  const analytics = await getAnalytics()
  const bestStreak = analytics.streaks.length > 0 ? Math.max(...analytics.streaks.map((s) => s.currentCount)) : 0
  const focusHours = Math.floor(analytics.focus.todayMinutes / 60)
  const focusMinutes = analytics.focus.todayMinutes % 60

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="panel-surface relative overflow-hidden rounded-[30px] px-6 py-7 sm:px-8 sm:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_32%),radial-gradient(circle_at_75%_18%,_rgba(139,92,246,0.1),_transparent_28%)]" />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="section-label">Mission Control</p>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  Build momentum with a calmer, sharper operating rhythm.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                  See today&apos;s progress at a glance, start a focus block, and move directly into the work that matters.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-cyan-400/12 bg-cyan-500/8 p-5 shadow-[0_18px_50px_rgba(6,182,212,0.12)]">
                <p className="section-label text-cyan-200/90">Focus Today</p>
                <p className="metric-numeral mt-4 text-4xl font-semibold text-white">
                  {focusHours}h {focusMinutes}m
                </p>
                <p className="mt-2 text-sm text-cyan-100/75">{analytics.focus.todaySessions} sessions completed</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.035] p-5">
                <p className="section-label">Completion</p>
                <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{analytics.tasks.completionRate}%</p>
                <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">
                  {analytics.tasks.completed} of {analytics.tasks.total || 0} tasks done
                </p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.035] p-5">
                <p className="section-label">Best Streak</p>
                <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{bestStreak}</p>
                <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">days of visible consistency</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface rounded-[28px] p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="section-label">Quick Actions</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Enter a focused mode</h2>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                href="/dashboard/focus"
                className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-4 text-sm font-medium text-white shadow-[0_18px_40px_rgba(6,182,212,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(6,182,212,0.28)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Start Focus Session
                </span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/dashboard/tasks/new"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white transition-all duration-200 hover:border-white/12 hover:bg-white/[0.05]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  Capture New Task
                </span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/dashboard/notes/new"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white transition-all duration-200 hover:border-white/12 hover:bg-white/[0.05]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </span>
                  Open Thinking Space
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel-surface rounded-[28px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-label">Snapshot</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Current system state</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="section-label">Notes</p>
                <p className="metric-numeral mt-3 text-3xl font-semibold text-white">{analytics.notes.total}</p>
                <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">ideas stored</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="section-label">Pending</p>
                <p className="metric-numeral mt-3 text-3xl font-semibold text-white">{analytics.tasks.pending}</p>
                <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">active tasks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="panel-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Weekly Rhythm</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Where your energy is landing</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="section-label">Sessions</p>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  Focus
                </span>
              </div>
              <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{analytics.focus.weekSessions}</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">sessions this week</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="section-label">Volume</p>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Total
                </span>
              </div>
              <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{analytics.focus.totalSessions}</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">sessions recorded</p>
            </div>
          </div>
        </div>

        <div className="panel-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Recent Activity</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Latest movement across your system</h2>
            </div>
          </div>
          {analytics.recentActivity.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-white/8 bg-white/[0.03] px-6 py-10 text-center">
              <p className="text-base font-medium text-white">No recent activity yet</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">
                Start with a focus session, task, or note to bring this timeline to life.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {analytics.recentActivity.slice(0, 4).map((activity, index) => {
                const style = activityStyles[activity.type]

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-[22px] border border-white/8 bg-white/[0.025] px-4 py-4 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04]"
                  >
                    <div className="flex flex-col items-center pt-1">
                      <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                      {index !== Math.min(analytics.recentActivity.slice(0, 4).length - 1, 3) && (
                        <span className="mt-2 h-10 w-px bg-white/8" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>
                      <p className="mt-3 truncate text-sm font-medium text-white">{activity.title}</p>
                      <p className="mt-1 text-xs text-[color:var(--foreground-muted)]">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
