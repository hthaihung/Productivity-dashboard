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

const quickActions = [
  {
    href: "/dashboard/focus",
    label: "Start focus session",
    description: "Drop into a dedicated block and build momentum.",
    accent: "from-cyan-500 to-sky-500",
    iconClass: "bg-white/14 text-white",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/tasks/new",
    label: "Capture new task",
    description: "Clear your head before work starts to sprawl.",
    accent: "from-emerald-500/18 to-emerald-500/5",
    iconClass: "bg-emerald-500/12 text-emerald-300",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    href: "/dashboard/notes/new",
    label: "Open thinking space",
    description: "Move ideas into a quieter surface for deeper work.",
    accent: "from-violet-500/18 to-violet-500/5",
    iconClass: "bg-violet-500/12 text-violet-300",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
] as const

export default async function DashboardPage() {
  const analytics = await getAnalytics()
  const bestStreak = analytics.streaks.length > 0 ? Math.max(...analytics.streaks.map((s) => s.currentCount)) : 0
  const focusHours = Math.floor(analytics.focus.todayMinutes / 60)
  const focusMinutes = analytics.focus.todayMinutes % 60

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
        <div className="panel-surface-elevated hero-shell animate-fade-in rounded-[32px] px-6 py-6 sm:px-8 sm:py-8 lg:px-9 xl:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,_rgba(6,182,212,0.18),_transparent_32%),radial-gradient(circle_at_82%_16%,_rgba(139,92,246,0.12),_transparent_28%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "38px 38px",
            }}
          />
          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] xl:items-end">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="status-pill border-cyan-400/18 bg-cyan-500/10 text-cyan-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                  Mission control
                </div>
                <div className="space-y-3">
                  <h1 className="max-w-3xl text-balance text-[2.6rem] font-semibold tracking-[-0.06em] text-white sm:text-5xl xl:text-[3.55rem] xl:leading-[1.02]">
                    A sharper operating rhythm for the work that actually matters.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                    Read the day in seconds, move into a focus block, and keep your system feeling calm instead of crowded.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="metric-card-primary card-interactive rounded-[28px] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="section-label text-cyan-100/90">Focus today</p>
                      <p className="metric-numeral mt-4 text-[2.9rem] font-semibold tracking-[-0.06em] text-white sm:text-[3.35rem]">
                        {focusHours}h {focusMinutes}m
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/14 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-cyan-100/75">
                    <span>{analytics.focus.todaySessions} sessions completed</span>
                    <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                    <span>Built for deep work blocks</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="metric-card-secondary card-interactive rounded-[24px] p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="section-label">Completion</p>
                        <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{analytics.tasks.completionRate}%</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">
                      {analytics.tasks.completed} of {analytics.tasks.total || 0} tasks closed cleanly.
                    </p>
                  </div>

                  <div className="metric-card-secondary card-interactive rounded-[24px] p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="section-label">Best streak</p>
                        <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{bestStreak}</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">Days of visible consistency already banked.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget-card rounded-[28px] p-5 sm:p-6">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="section-label">System snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Current state</h2>
                  </div>
                  <span className="status-pill border-white/8 bg-white/[0.04] text-white/70">Live</span>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Notes captured</p>
                          <p className="mt-1 text-xs text-[color:var(--foreground-soft)]">Everything available to revisit.</p>
                        </div>
                      </div>
                      <p className="metric-numeral text-3xl font-semibold text-white">{analytics.notes.total}</p>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Pending tasks</p>
                          <p className="mt-1 text-xs text-[color:var(--foreground-soft)]">Open loops waiting for action.</p>
                        </div>
                      </div>
                      <p className="metric-numeral text-3xl font-semibold text-white">{analytics.tasks.pending}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-cyan-400/12 bg-cyan-500/[0.07] p-4 text-sm text-cyan-100/80">
                  Your dashboard is strongest when one action leads. Start with focus if the day feels noisy.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface-glass animate-slide-in rounded-[30px] p-6 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="section-label">Quick actions</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Move with intention</h2>
              </div>
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`command-dock card-interactive group block rounded-[24px] bg-gradient-to-r ${action.accent} p-4 ${index === 0 ? "text-white" : "text-white/92"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl ${action.iconClass} backdrop-blur-sm transition-transform group-hover:scale-110`}>
                        {action.icon}
                      </span>
                      <div>
                        <p className="text-base font-semibold text-white">{action.label}</p>
                        <p className="mt-1 text-sm leading-6 text-white/68">{action.description}</p>
                      </div>
                    </div>
                    <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel-surface-glass animate-slide-in rounded-[30px] p-6 sm:p-7" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-label">Daily balance</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Signal over noise</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="widget-card rounded-[24px] p-4">
                <div className="relative z-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="section-label">Task flow</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">A clean finish rate keeps the system light.</p>
                  </div>
                  <p className="metric-numeral text-3xl font-semibold text-white">{analytics.tasks.completed}</p>
                </div>
              </div>

              <div className="widget-card rounded-[24px] p-4">
                <div className="relative z-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="section-label">Focus cadence</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">Sessions completed today shape the rest of the board.</p>
                  </div>
                  <p className="metric-numeral text-3xl font-semibold text-white">{analytics.focus.todaySessions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="panel-surface animate-fade-in rounded-[30px] p-6 sm:p-7 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Weekly rhythm</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Where your energy is landing</h2>
            </div>
            <span className="status-pill border-emerald-400/14 bg-emerald-500/10 text-emerald-200">In motion</span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="widget-card card-interactive rounded-[26px] p-5 sm:p-6">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="section-label">Sessions</p>
                  <span className="rounded-full bg-cyan-500/12 px-3 py-1.5 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20">Focus</span>
                </div>
                <p className="metric-numeral text-5xl font-semibold text-white">{analytics.focus.weekSessions}</p>
                <p className="text-sm leading-6 text-[color:var(--foreground-muted)]">Completed this week across your current working rhythm.</p>
              </div>
            </div>

            <div className="widget-card card-interactive rounded-[26px] p-5 sm:p-6">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="section-label">Volume</p>
                  <span className="rounded-full bg-emerald-500/12 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">Total</span>
                </div>
                <p className="metric-numeral text-5xl font-semibold text-white">{analytics.focus.totalSessions}</p>
                <p className="text-sm leading-6 text-[color:var(--foreground-muted)]">All recorded focus sessions contributing to long-term consistency.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-surface animate-fade-in rounded-[30px] p-6 sm:p-7 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Recent activity</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Latest movement across the system</h2>
            </div>
          </div>

          {analytics.recentActivity.length === 0 ? (
            <div className="empty-state-premium mt-7 rounded-[26px] px-6 py-12 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/8 bg-white/[0.04] text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.08)]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="mt-5 text-lg font-semibold text-white">No recent activity yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[color:var(--foreground-muted)]">
                Start with a focus session, task, or note and this space will turn into a clean timeline of momentum.
              </p>
            </div>
          ) : (
            <div className="mt-7 space-y-3">
              {analytics.recentActivity.slice(0, 4).map((activity, index) => {
                const style = activityStyles[activity.type]

                return (
                  <div
                    key={index}
                    className="widget-card card-interactive flex items-start gap-4 rounded-[24px] px-5 py-4"
                  >
                    <div className="relative flex flex-col items-center pt-1">
                      <span className={`h-2.5 w-2.5 rounded-full ${style.dot} shadow-[0_0_10px_currentColor]`} />
                      {index !== Math.min(analytics.recentActivity.slice(0, 4).length - 1, 3) && (
                        <span className="mt-2 h-12 w-px bg-gradient-to-b from-white/12 to-transparent" />
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
