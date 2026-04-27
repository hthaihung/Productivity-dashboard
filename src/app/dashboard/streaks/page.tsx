import { getStreaks } from "./actions"
import Link from "next/link"
import { StreakCard } from "@/components/StreakCard"

export default async function StreaksPage() {
  const streaks = await getStreaks()

  const streakMap = new Map(streaks.map((s) => [s.type, s]))

  const focusStreak = streakMap.get("daily_focus")
  const tasksStreak = streakMap.get("daily_tasks")
  const notesStreak = streakMap.get("daily_notes")

  const hasAnyStreak = focusStreak || tasksStreak || notesStreak

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="panel-surface relative overflow-hidden rounded-[30px] px-6 py-7 sm:px-8 sm:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_30%),radial-gradient(circle_at_80%_18%,_rgba(139,92,246,0.08),_transparent_24%)]" />
          <div className="relative space-y-4">
            <p className="section-label text-orange-200/90">Momentum Engine</p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Make consistency feel visible and worth protecting.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                Track the habits that matter, see your current rhythm at a glance, and let steady repetition feel like real progress instead of invisible effort.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface rounded-[28px] p-6">
            <p className="section-label">Tracked Streaks</p>
            <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{streaks.length}</p>
            <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">consistency lanes in play</p>
          </div>
          <div className="panel-surface rounded-[28px] border border-orange-400/10 bg-orange-500/[0.08] p-6 shadow-[0_16px_40px_rgba(249,115,22,0.1)]">
            <p className="section-label text-orange-200/90">Focus</p>
            <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{focusStreak?.currentCount ?? 0}</p>
            <p className="mt-2 text-sm text-orange-100/75">days in your current focus streak</p>
          </div>
        </div>
      </section>

      {!hasAnyStreak ? (
        <section className="panel-surface rounded-[30px] px-6 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-orange-400/12 bg-orange-500/10 text-orange-300 shadow-[0_18px_50px_rgba(249,115,22,0.14)]">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">No streaks yet</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--foreground-muted)] sm:text-base">
              Start building momentum with one focus session, one finished task, or one note a day, and the system will begin to reflect your rhythm.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard/focus"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(6,182,212,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500"
              >
                Start Focus Session
              </Link>
              <Link
                href="/dashboard/tasks"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/12 hover:bg-white/[0.06]"
              >
                View Tasks
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {focusStreak && (
            <StreakCard
              type="daily_focus"
              currentCount={focusStreak.currentCount}
              longestCount={focusStreak.longestCount}
              lastActiveAt={focusStreak.lastActiveAt}
            />
          )}
          {tasksStreak && (
            <StreakCard
              type="daily_tasks"
              currentCount={tasksStreak.currentCount}
              longestCount={tasksStreak.longestCount}
              lastActiveAt={tasksStreak.lastActiveAt}
            />
          )}
          {notesStreak && (
            <StreakCard
              type="daily_notes"
              currentCount={notesStreak.currentCount}
              longestCount={notesStreak.longestCount}
              lastActiveAt={notesStreak.lastActiveAt}
            />
          )}
        </section>
      )}

      <section className="panel-surface rounded-[30px] p-6 sm:p-7">
        <div>
          <p className="section-label">Guide</p>
          <h2 className="mt-2 text-xl font-semibold text-white">How streaks work</h2>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Focus Streak</h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">Complete at least one focus session each day.</p>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Task Streak</h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">Complete at least one task each day.</p>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">Notes Streak</h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">Create or update at least one note each day.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
