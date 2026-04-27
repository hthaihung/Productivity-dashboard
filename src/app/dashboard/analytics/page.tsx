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
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="panel-surface relative overflow-hidden rounded-[30px] px-6 py-7 sm:px-8 sm:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.16),_transparent_32%),radial-gradient(circle_at_80%_12%,_rgba(6,182,212,0.12),_transparent_28%)]" />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="section-label">Analytics Deck</p>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  See how your time, tasks, and consistency are compounding.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                  A calmer view of what is moving forward, where attention is accumulating, and which systems are building momentum.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-violet-400/12 bg-violet-500/8 p-5 shadow-[0_18px_50px_rgba(139,92,246,0.12)]">
                <p className="section-label text-violet-200/90">Completion Rate</p>
                <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{analytics.tasks.completionRate}%</p>
                <p className="mt-2 text-sm text-violet-100/75">{analytics.tasks.completed} of {analytics.tasks.total} tasks finished</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.035] p-5">
                <p className="section-label">Focus Today</p>
                <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{todayHours}h {todayMinutes}m</p>
                <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">{analytics.focus.todaySessions} sessions completed</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.035] p-5">
                <p className="section-label">Best Streak</p>
                <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{bestStreak}</p>
                <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">days of sustained rhythm</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface rounded-[28px] p-6">
            <p className="section-label">Knowledge Base</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Stored output</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="section-label">Notes</p>
                <p className="metric-numeral mt-3 text-3xl font-semibold text-white">{analytics.notes.total}</p>
                <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">captured ideas and writing</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="section-label">Active Work</p>
                <p className="metric-numeral mt-3 text-3xl font-semibold text-white">{analytics.tasks.pending}</p>
                <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">tasks still in motion</p>
              </div>
            </div>
          </div>

          <div className="panel-surface rounded-[28px] p-6">
            <p className="section-label">Focus Volume</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Longer-term output</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-cyan-400/12 bg-cyan-500/8 p-4 shadow-[0_16px_40px_rgba(6,182,212,0.1)]">
                <p className="section-label text-cyan-200/90">Total Focus</p>
                <p className="metric-numeral mt-3 text-3xl font-semibold text-white">{totalHours}h {totalMinutes}m</p>
                <p className="mt-1 text-sm text-cyan-100/75">across {analytics.focus.totalSessions} recorded sessions</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="section-label">Week</p>
                  <p className="metric-numeral mt-3 text-2xl font-semibold text-white">{analytics.focus.weekSessions}</p>
                  <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">sessions</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
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
        <div className="panel-surface rounded-[28px] p-6 sm:p-7">
          <div>
            <p className="section-label">Task Breakdown</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Completion and remaining load</h2>
          </div>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              <span className="text-sm text-[color:var(--foreground-muted)]">Total Tasks</span>
              <span className="text-lg font-semibold text-white">{analytics.tasks.total}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.08] px-4 py-4">
              <span className="text-sm text-emerald-100/80">Completed</span>
              <span className="text-lg font-semibold text-emerald-300">{analytics.tasks.completed}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-amber-400/10 bg-amber-500/[0.08] px-4 py-4">
              <span className="text-sm text-amber-100/80">Pending</span>
              <span className="text-lg font-semibold text-amber-300">{analytics.tasks.pending}</span>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-[color:var(--foreground-muted)]">Completion Rate</span>
                <span className="text-sm font-medium text-white">{analytics.tasks.completionRate}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500"
                  style={{ width: `${analytics.tasks.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="panel-surface rounded-[28px] p-6 sm:p-7">
          <div>
            <p className="section-label">Recent Activity</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Latest signals across your system</h2>
          </div>
          {analytics.recentActivity.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-white/8 bg-white/[0.03] px-6 py-10 text-center">
              <p className="text-base font-medium text-white">No recent activity</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">Use the app a little more and your timeline will begin to take shape.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {analytics.recentActivity.map((activity, index) => {
                const style = activityStyles[activity.type]

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-[22px] border border-white/8 bg-white/[0.025] px-4 py-4 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04]"
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border ${style.iconWrap}`}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
