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
      <section className="panel-surface relative overflow-hidden rounded-[32px] px-6 py-7 sm:px-8 sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(16,185,129,0.08),_transparent_24%)]" />
        <div className="relative space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label text-cyan-200/90">Focus Room</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Enter a quieter, deeper rhythm.
            </h1>
            <p className="mt-4 text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
              Keep the timer central, reduce noise, and let each session feel like a deliberate block of work.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
              <p className="section-label">Today</p>
              <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{stats.sessionCount}</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">sessions completed</p>
            </div>
            <div className="rounded-[24px] border border-cyan-400/12 bg-cyan-500/8 p-5 shadow-[0_18px_50px_rgba(6,182,212,0.12)]">
              <p className="section-label text-cyan-200/90">Total Focus</p>
              <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{totalHours}h {totalMinutes}m</p>
              <p className="mt-2 text-sm text-cyan-100/70">recorded time in motion</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
              <p className="section-label">Momentum</p>
              <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{sessions.length}</p>
              <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">sessions logged overall</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel-surface overflow-hidden rounded-[32px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <FocusTimer />
      </section>

      <section className="panel-surface rounded-[32px] p-6 sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="section-label">Session Log</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Recent sessions</h2>
          </div>
        </div>
        <SessionHistory sessions={sessions} />
      </section>
    </div>
  )
}
