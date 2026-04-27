import { getAnalytics } from "./actions"
import { formatDistanceToNow } from "date-fns"

const activityStyles = {
  note: {
    badge: "bg-violet-500/12 text-violet-300 ring-1 ring-violet-400/12",
    iconWrap: "border-violet-400/14 bg-violet-500/10 text-violet-300",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    label: "Note",
  },
  task: {
    badge: "bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-400/12",
    iconWrap: "border-emerald-400/14 bg-emerald-500/10 text-emerald-300",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Task",
  },
  session: {
    badge: "bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/12",
    iconWrap: "border-cyan-400/14 bg-cyan-500/10 text-cyan-300",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Focus",
  },
} as const

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()
  const bestStreak = analytics.streaks.length > 0 ? Math.max(...analytics.streaks.map((s) => s.currentCount)) : 0
  const totalHours = Math.floor(analytics.focus.totalMinutes / 60)
  const totalMinutes = analytics.focus.totalMinutes % 60
  const todayHours = Math.floor(analytics.focus.todayMinutes / 60)
  const todayMinutes = analytics.focus.todayMinutes % 60

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="panel-surface-elevated relative overflow-hidden rounded-[32px] px-6 py-8 sm:px-10 sm:py-10 animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(139,92,246,0.18),_transparent_35%),radial-gradient(circle_at_80%_12%,_rgba(6,182,212,0.14),_transparent_30%)]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
          <div className="relative space-y-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-glow" />
                <p className="section-label text-violet-200">Analytics Deck</p>
              </div>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
                  See how your time, tasks, and consistency are compounding.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[color:var(--foreground-muted)] sm:text-xl">
                  A calmer view of what is moving forward, where attention is accumulating, and which systems are building momentum.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="card-glow-violet card-interactive group rounded-[26px] border border-violet-400/14 bg-gradient-to-br from-violet-500/12 via-violet-500/8 to-transparent p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <p className="section-label text-violet-200/90">Completion Rate</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/12 text-violet-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{analytics.tasks.completionRate}%</p>
                <p className="mt-3 text-sm text-violet-100/75">{analytics.tasks.completed} of {analytics.tasks.total} tasks finished</p>
              </div>
              <div className="card-interactive group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <p className="section-label">Focus Today</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{todayHours}h {todayMinutes}m</p>
                <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">{analytics.focus.todaySessions} sessions completed</p>
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
                <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">days of sustained rhythm</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface-glass rounded-[30px] p-7 animate-slide-in">
            <p className="section-label">Knowledge Base</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Stored output</h2>
            <div className="mt-7 space-y-4">
              <div className="card-interactive rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="section-label">Notes</p>
                    <p className="metric-numeral mt-1 text-3xl font-semibold text-white">{analytics.notes.total}</p>
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
                    <p className="section-label">Active Work</p>
                    <p className="metric-numeral mt-1 text-3xl font-semibold text-white">{analytics.tasks.pending}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-surface-glass rounded-[30px] p-7 animate-slide-in" style={{ animationDelay: '50ms' }}>
            <p className="section-label">Focus Volume</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Longer-term output</h2>
            <div className="mt-7 space-y-4">
              <div className="card-glow-cyan rounded-[22px] border border-cyan-400/14 bg-gradient-to-br from-cyan-500/10 via-cyan-500/6 to-transparent p-5 backdrop-blur-sm">
                <p className="section-label text-cyan-200/90">Total Focus</p>
                <p className="metric-numeral mt-3 text-3xl font-semibold text-white">{totalHours}h {totalMinutes}m</p>
                <p className="mt-1 text-sm text-cyan-100/75">across {analytics.focus.totalSessions} recorded sessions</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                <div className="card-interactive rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                  <p className="section-label">Week</p>
                  <p className="metric-numeral mt-3 text-2xl font-semibold text-white">{analytics.focus.weekSessions}</p>
                  <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">sessions</p>
                </div>
                <div className="card-interactive rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                  <p className="section-label">Month</p>
                  <p className="metric-numeral mt-3 text-2xl font-semibold text-white">{analytics.focus.monthSessions}</p>
                  <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel-surface rounded-[30px] p-7 animate-fade-in">
          <div>
            <p className="section-label">Task Breakdown</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Completion and remaining load</h2>
          </div>
          <div className="mt-7 space-y-4">
            <div className="card-interactive flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
              <span className="text-sm font-medium text-[color:var(--foreground-muted)]">Total Tasks</span>
              <span className="text-xl font-semibold text-white">{analytics.tasks.total}</span>
            </div>
            <div className="card-interactive flex items-center justify-between rounded-[22px] border border-emerald-400/12 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 px-5 py-4 backdrop-blur-sm">
              <span className="text-sm font-medium text-emerald-100/80">Completed</span>
              <span className="text-xl font-semibold text-emerald-300">{analytics.tasks.completed}</span>
            </div>
            <div className="card-interactive flex items-center justify-between rounded-[22px] border border-amber-400/12 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-5 py-4 backdrop-blur-sm">
              <span className="text-sm font-medium text-amber-100/80">Pending</span>
              <span className="text-xl font-semibold text-amber-300">{analytics.tasks.pending}</span>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-[color:var(--foreground-muted)]">Completion Rate</span>
                <span className="text-lg font-semibold text-white">{analytics.tasks.completionRate}%</span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 transition-all duration-700 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  style={{ width: `${analytics.tasks.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="panel-surface rounded-[30px] p-7 animate-fade-in">
          <div>
            <p className="section-label">Recent Activity</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Latest signals across your system</h2>
          </div>
          {analytics.recentActivity.length === 0 ? (
            <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <svg className="h-8 w-8 text-[color:var(--foreground-soft)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="mt-5 text-base font-medium text-white">No recent activity</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">Use the app a little more and your timeline will begin to take shape.</p>
            </div>
          ) : (
            <div className="mt-7 space-y-3">
              {analytics.recentActivity.map((activity, index) => {
                const style = activityStyles[activity.type]

                return (
                  <div
                    key={index}
                    className="card-interactive flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
                  >
                    <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${style.iconWrap}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={style.icon} />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>
                      <p className="mt-3 truncate text-sm font-medium text-white">{activity.title}</p>
                      <p className="mt-1 text-xs text-[color:var(--foreground-muted)]">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
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
