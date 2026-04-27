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
    description: "Drop into a deliberate block and let the rest of the board fall quiet.",
    iconClass: "bg-white/14 text-white",
    primary: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/tasks/new",
    label: "Capture new task",
    description: "Move open loops out of your head before they start pulling attention.",
    iconClass: "bg-emerald-500/12 text-emerald-300",
    primary: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    href: "/dashboard/notes/new",
    label: "Open thinking space",
    description: "Shift into a quieter writing surface when ideas need room to develop.",
    iconClass: "bg-violet-500/12 text-violet-300",
    primary: false,
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
    <div className="space-y-5 lg:space-y-6">
      <section className="dashboard-main-grid grid gap-5 xl:grid-cols-[minmax(0,1.58fr)_minmax(312px,0.82fr)]">
        <div className="panel-surface-elevated hero-shell animate-fade-in rounded-[24px] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 xl:px-8 xl:py-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,_rgba(6,182,212,0.15),_transparent_32%),radial-gradient(circle_at_82%_16%,_rgba(139,92,246,0.08),_transparent_26%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 0)",
              backgroundSize: "42px 42px",
            }}
          />

          <div className="dashboard-hero-grid relative grid gap-5 xl:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.82fr)] xl:items-stretch">
            <div className="flex min-w-0 flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="status-pill border-cyan-400/16 bg-cyan-500/9 text-cyan-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                  Mission control
                </div>

                <div className="max-w-3xl space-y-3">
                  <h1 className="hero-safe-title text-balance-safe max-w-[11.5ch] text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-[2.9rem] xl:text-[3.3rem]">
                    The calmest next move for your day, in one view.
                  </h1>
                  <p className="max-w-2xl text-[0.98rem] leading-7 text-[color:var(--foreground-muted)] sm:text-base">
                    See what matters, enter a focus block quickly, and keep the system feeling spacious instead of overloaded.
                  </p>
                </div>
              </div>

              <div className="dashboard-support-grid grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <div className="metric-card-primary card-interactive rounded-[24px] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="section-label text-cyan-100/88">Focus today</p>
                      <p className="metric-numeral mt-3 text-[2.35rem] font-semibold tracking-[-0.055em] text-white sm:text-[2.8rem]">
                        {focusHours}h {focusMinutes}m
                      </p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-cyan-400/14 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.14)]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm text-cyan-100/72">
                    <span>{analytics.focus.todaySessions} sessions completed</span>
                    <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                    <span>Deep work remains the lead signal.</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="metric-card-secondary card-interactive rounded-[20px] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="section-label">Completion</p>
                        <p className="metric-numeral mt-3 text-[2rem] font-semibold text-white">{analytics.tasks.completionRate}%</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-emerald-400/10 text-emerald-300">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-2.5 text-sm leading-6 text-[color:var(--foreground-muted)]">
                      {analytics.tasks.completed} of {analytics.tasks.total || 0} tasks closed cleanly.
                    </p>
                  </div>

                  <div className="metric-card-secondary card-interactive rounded-[20px] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="section-label">Best streak</p>
                        <p className="metric-numeral mt-3 text-[2rem] font-semibold text-white">{bestStreak}</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-orange-400/10 text-orange-300">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-2.5 text-sm leading-6 text-[color:var(--foreground-muted)]">Days of consistency already protected.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget-card rounded-[24px] p-4 sm:p-5">
              <div className="relative z-10 flex h-full flex-col justify-between gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="section-label">System snapshot</p>
                    <h2 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-white">Current state</h2>
                  </div>
                  <span className="status-pill border-white/8 bg-white/[0.04] text-white/70">Live</span>
                </div>

                <div className="space-y-3">
                  <div className="surface-subtle rounded-[18px] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-violet-500/12 text-violet-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">Notes captured</p>
                          <p className="mt-1 text-xs leading-5 text-[color:var(--foreground-soft)]">Everything available to revisit.</p>
                        </div>
                      </div>
                      <p className="metric-numeral text-[1.85rem] font-semibold text-white">{analytics.notes.total}</p>
                    </div>
                  </div>

                  <div className="surface-subtle rounded-[18px] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-amber-500/12 text-amber-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">Pending tasks</p>
                          <p className="mt-1 text-xs leading-5 text-[color:var(--foreground-soft)]">Open loops waiting for action.</p>
                        </div>
                      </div>
                      <p className="metric-numeral text-[1.85rem] font-semibold text-white">{analytics.tasks.pending}</p>
                    </div>
                  </div>
                </div>

                <div className="surface-accent-muted rounded-[18px] p-4 text-sm leading-6 text-cyan-100/78">
                  Start with focus if the system feels noisy. One decisive action restores the rest of the board.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-quick-grid grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <div className="command-surface animate-slide-in relative overflow-hidden rounded-[24px] p-5 sm:p-6">
            <div className="relative z-10 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Quick actions</p>
                  <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.04em] text-white">Command deck</h2>
                </div>
              </div>

              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`command-row card-interactive group flex items-center justify-between gap-4 rounded-[18px] px-4 py-4 ${
                      action.primary ? "command-row-primary text-white" : "text-white/92"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${action.iconClass} backdrop-blur-sm transition-transform group-hover:scale-105`}>
                        {action.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white sm:text-[0.98rem]">{action.label}</p>
                        <p className="mt-1 text-sm leading-6 text-white/64">{action.description}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-lg text-white/70 transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="panel-surface-glass animate-slide-in rounded-[24px] p-5 sm:p-6" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-label">Daily balance</p>
                <h2 className="mt-2 text-[1.4rem] font-semibold tracking-[-0.04em] text-white">Signal over noise</h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="surface-subtle rounded-[18px] p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="section-label">Task flow</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">A cleaner finish rate keeps the system light.</p>
                  </div>
                  <p className="metric-numeral text-[1.9rem] font-semibold text-white">{analytics.tasks.completed}</p>
                </div>
              </div>

              <div className="surface-subtle rounded-[18px] p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="section-label">Focus cadence</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">Sessions completed today shape the rest of the board.</p>
                  </div>
                  <p className="metric-numeral text-[1.9rem] font-semibold text-white">{analytics.focus.todaySessions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-secondary-grid grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="panel-surface animate-fade-in rounded-[24px] p-5 sm:p-6 lg:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Weekly rhythm</p>
              <h2 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.04em] text-white">Where your energy is landing</h2>
            </div>
            <span className="status-pill border-emerald-400/14 bg-emerald-500/10 text-emerald-200">In motion</span>
          </div>

          <div className="dashboard-rhythm-grid mt-5 grid gap-4 lg:grid-cols-2">
            <div className="widget-card card-interactive rounded-[20px] p-5">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="section-label">Sessions</p>
                  <span className="rounded-full bg-cyan-500/12 px-3 py-1.5 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20">Focus</span>
                </div>
                <p className="metric-numeral text-[2.5rem] font-semibold text-white">{analytics.focus.weekSessions}</p>
                <p className="text-sm leading-6 text-[color:var(--foreground-muted)]">Completed this week across your current working rhythm.</p>
              </div>
            </div>

            <div className="widget-card card-interactive rounded-[20px] p-5">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="section-label">Volume</p>
                  <span className="rounded-full bg-emerald-500/12 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">Total</span>
                </div>
                <p className="metric-numeral text-[2.5rem] font-semibold text-white">{analytics.focus.totalSessions}</p>
                <p className="text-sm leading-6 text-[color:var(--foreground-muted)]">All recorded focus sessions contributing to long-term consistency.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-surface animate-fade-in rounded-[24px] p-5 sm:p-6 lg:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Recent activity</p>
              <h2 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.04em] text-white">Latest movement across the system</h2>
            </div>
          </div>

          {analytics.recentActivity.length === 0 ? (
            <div className="empty-state-premium mt-6 rounded-[22px] px-6 py-11 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/7 bg-white/[0.04] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.07)]">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="mt-5 text-lg font-semibold text-white">No recent activity yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[color:var(--foreground-muted)]">
                Start with a focus session, task, or note and this timeline will turn into a cleaner view of momentum.
              </p>
            </div>
          ) : (
            <div className="activity-track mt-6 space-y-3">
              {analytics.recentActivity.slice(0, 4).map((activity, index) => {
                const style = activityStyles[activity.type]

                return (
                  <div
                    key={index}
                    className="widget-card card-interactive flex items-start gap-4 rounded-[18px] px-4 py-4"
                  >
                    <div className="relative z-10 flex pt-1">
                      <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${style.dot}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`timeline-badge rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase ${style.badge}`}>
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
