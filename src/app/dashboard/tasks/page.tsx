import { getTasks } from "./actions"
import Link from "next/link"
import { TaskList } from "@/components/TaskList"

export default async function TasksPage() {
  const tasks = await getTasks()
  const activeTasks = tasks.filter((task) => task.status !== "completed")
  const completedTasks = tasks.length - activeTasks.length

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="panel-surface relative overflow-hidden rounded-[30px] px-6 py-7 sm:px-8 sm:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_82%_16%,_rgba(6,182,212,0.08),_transparent_24%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="section-label text-emerald-200/90">Work Queue</p>
              <div className="space-y-3">
                <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  Keep the next important thing impossible to miss.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                  See what is active, what is complete, and where deadlines or priority deserve attention before the day gets noisy.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/tasks/new"
              className="inline-flex items-center gap-3 self-start rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(16,185,129,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500 hover:shadow-[0_22px_44px_rgba(16,185,129,0.28)] lg:self-auto"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
              New Task
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-surface rounded-[28px] p-6">
            <p className="section-label">Active Work</p>
            <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{activeTasks.length}</p>
            <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">tasks currently in motion</p>
          </div>
          <div className="panel-surface rounded-[28px] border border-emerald-400/10 bg-emerald-500/[0.08] p-6 shadow-[0_16px_40px_rgba(16,185,129,0.1)]">
            <p className="section-label text-emerald-200/90">Completed</p>
            <p className="metric-numeral mt-4 text-4xl font-semibold text-white">{completedTasks}</p>
            <p className="mt-2 text-sm text-emerald-100/70">tasks already cleared</p>
          </div>
        </div>
      </section>

      {tasks.length === 0 ? (
        <section className="panel-surface rounded-[30px] px-6 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-emerald-400/12 bg-emerald-500/10 text-emerald-300 shadow-[0_18px_50px_rgba(16,185,129,0.14)]">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">No tasks yet</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--foreground-muted)] sm:text-base">
              Create the first task, define a clear priority, and this space will start turning intention into visible progress.
            </p>
            <Link
              href="/dashboard/tasks/new"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-emerald-400/16 hover:bg-emerald-500/[0.08]"
            >
              Create your first task
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 px-1">
            <div>
              <p className="section-label">Queue</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Current task list</h2>
            </div>
            <p className="text-sm text-[color:var(--foreground-muted)]">{tasks.length} total tasks</p>
          </div>
          <TaskList tasks={tasks} />
        </section>
      )}
    </div>
  )
}
