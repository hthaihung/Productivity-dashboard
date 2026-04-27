import { getPomodoroSessions, getTodayStats } from "./actions"
import { FocusTimer } from "@/components/FocusTimer"
import { SessionHistory } from "@/components/SessionHistory"

export default async function FocusPage() {
  const [sessions, stats] = await Promise.all([
    getPomodoroSessions(),
    getTodayStats(),
  ])

  const totalHours = Math.floor(stats.totalFocusTime / 60)
  const totalMinutes = stats.totalFocusTime % 60

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="panel-surface-elevated relative overflow-hidden rounded-[34px] px-6 py-8 sm:px-10 sm:py-10 animate-fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,_rgba(6,182,212,0.2),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(16,185,129,0.12),_transparent_28%)]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
        <div className="relative space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              <p className="section-label text-cyan-200">Focus Room</p>
            </div>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
              Enter a quieter, deeper rhythm.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[color:var(--foreground-muted)] sm:text-xl">
              Keep the timer central, reduce noise, and let each session feel like a deliberate block of work.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="card-interactive group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <p className="section-label">Today</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/70 transition-transform group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{stats.sessionCount}</p>
              <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">sessions completed</p>
            </div>
            <div className="card-glow-cyan card-interactive group rounded-[26px] border border-cyan-400/14 bg-gradient-to-br from-cyan-500/12 via-cyan-500/8 to-transparent p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <p className="section-label text-cyan-200/90">Total Focus</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/12 text-cyan-300 transition-transform group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{totalHours}h {totalMinutes}m</p>
              <p className="mt-3 text-sm text-cyan-100/70">recorded time in motion</p>
            </div>
            <div className="card-interactive group rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <p className="section-label">Momentum</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 transition-transform group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <p className="metric-numeral mt-5 text-5xl font-semibold text-white">{sessions.length}</p>
              <p className="mt-3 text-sm text-[color:var(--foreground-muted)]">sessions logged overall</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel-surface-glass overflow-hidden rounded-[34px] px-4 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <FocusTimer />
      </section>

      <section className="panel-surface rounded-[32px] p-7 sm:p-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="section-label">Session Log</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Recent sessions</h2>
          </div>
        </div>
        <SessionHistory sessions={sessions} />
      </section>
    </div>
  )
}
