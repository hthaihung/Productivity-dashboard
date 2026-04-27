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
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="panel-surface-elevated relative overflow-hidden rounded-[32px] px-6 py-8 sm:px-10 sm:py-10 animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(6,182,212,0.18),_transparent_35%),radial-gradient(circle_at_80%_15%,_rgba(139,92,246,0.12),_transparent_30%)]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
          <div className="relative space-y-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                <p className="section-label text-cyan-200">Mission Control</p>
              </div>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                  Build momentum with a calmer, sharper operating rhythm.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                  See today&apos;s progress at a glance, start a focus block, and move directly into the work that matters.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="card-glow-cyan card-interactive group rounded-[26px] border border-cyan-400/14 bg-gradient-to-br from-cyan-500/12 via-cyan-500/8 to-transparent p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <p className="section-label text-cyan-200/90">Focus Today</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/12 text-cyan-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="metric-numeral mt-5 text-5xl font-semibold text-white">
                  {focusHours}h {focusMinutes}m
                </p>
                <p className="mt-3 text-sm text-cyan-100/75">{analytics.focus.todaySessions} sessions completed</p>
              </div>
              <div className="card-interactive group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <p className="section-label">Completion</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{analytics.tasks.completionRate}%</p>
                <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">
                  {analytics.tasks.completed} of {analytics.tasks.total || 0} tasks done
                </p>
              </div>
              <div className="card-interactive group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <p className="section-label">Best Streak</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                </div>
                <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{bestStreak}</p>
                <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">days of visible consistency</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface-glass rounded-[30px] p-7 animate-slide-in">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="section-label">Quick Actions</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Enter a focused mode</h2>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                href="/dashboard/focus"
                className="group flex items-center justify-between rounded-[22px] bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-5 text-sm font-medium text-white shadow-[0_20px_50px_rgba(6,182,212,0.28)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(6,182,212,0.35)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-base">Start Focus Session</span>
                </span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/dashboard/tasks/new"
                className="group flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/16 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span className="text-base">Capture New Task</span>
                </span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/dashboard/notes/new"
                className="group flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/16 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/12 text-violet-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </span>
                  <span className="text-base">Open Thinking Space</span>
                </span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel-surface-glass rounded-[30px] p-7 animate-slide-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-label">Snapshot</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Current system state</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              <div className="card-interactive rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="section-label">Notes</p>
                    <p className="metric-numeral mt-1 text-2xl font-semibold text-white">{analytics.notes.total}</p>
                  </div>
                </div>
              </div>
              <div className="card-interactive rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="section-label">Pending</p>
                    <p className="metric-numeral mt-1 text-2xl font-semibold text-white">{analytics.tasks.pending}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="panel-surface rounded-[30px] p-7 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Weekly Rhythm</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Where your energy is landing</h2>
            </div>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="card-interactive rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="section-label">Sessions</p>
                <span className="rounded-full bg-cyan-500/12 px-3 py-1.5 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
                  Focus
                </span>
              </div>
              <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{analytics.focus.weekSessions}</p>
              <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">sessions this week</p>
            </div>
            <div className="card-interactive rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="section-label">Volume</p>
                <span className="rounded-full bg-emerald-500/12 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                  Total
                </span>
              </div>
              <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{analytics.focus.totalSessions}</p>
              <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">sessions recorded</p>
            </div>
          </div>
        </div>

        <div className="panel-surface rounded-[30px] p-7 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Recent Activity</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Latest movement across your system</h2>
            </div>
          </div>
          {analytics.recentActivity.length === 0 ? (
            <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <svg className="h-8 w-8 text-[color:var(--foreground-soft)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="mt-5 text-base font-medium text-white">No recent activity yet</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">
                Start with a focus session, task, or note to bring this timeline to life.
              </p>
            </div>
          ) : (
            <div className="mt-7 space-y-3">
              {analytics.recentActivity.slice(0, 4).map((activity, index) => {
                const style = activityStyles[activity.type]

                return (
                  <div
                    key={index}
                    className="card-interactive flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center pt-1">
                      <span className={`h-2.5 w-2.5 rounded-full ${style.dot} shadow-[0_0_8px_currentColor]`} />
                      {index !== Math.min(analytics.recentActivity.slice(0, 4).length - 1, 3) && (
                        <span className="mt-2 h-10 w-px bg-gradient-to-b from-white/10 to-transparent" />
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
