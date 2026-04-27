"use client"

import { useState } from "react"
import { toggleTaskComplete, deleteTask } from "@/app/dashboard/tasks/actions"
import { useRouter } from "next/navigation"

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

interface TaskListProps {
  tasks: Task[]
}

const priorityColors = {
  low: "bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/10",
  medium: "bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/10",
  high: "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/10",
}

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
}

export function TaskList({ tasks }: TaskListProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleToggle = async (id: string) => {
    setLoading(id)
    try {
      await toggleTaskComplete(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to toggle task:", error)
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return

    setLoading(id)
    try {
      await deleteTask(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete task:", error)
    } finally {
      setLoading(null)
    }
  }

  const pendingTasks = tasks.filter((t) => t.status !== "completed")
  const completedTasks = tasks.filter((t) => t.status === "completed")

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="section-label">Active Tasks</h2>
            <span className="text-xs text-[color:var(--foreground-soft)]">{pendingTasks.length}</span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                loading={loading === task.id}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      )}

      {completedTasks.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="section-label">Completed</h2>
            <span className="text-xs text-[color:var(--foreground-soft)]">{completedTasks.length}</span>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                loading={loading === task.id}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function TaskItem({
  task,
  loading,
  onToggle,
  onDelete,
}: {
  task: Task
  loading: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  const router = useRouter()
  const isCompleted = task.status === "completed"

  return (
    <div className="group panel-surface rounded-[24px] px-4 py-4 transition-all duration-200 hover:border-emerald-400/14 hover:bg-white/[0.045] sm:px-5">
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          disabled={loading}
          aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
          className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all disabled:opacity-50 ${
            isCompleted
              ? "border-emerald-400/30 bg-emerald-500/12 text-emerald-300"
              : "border-white/14 bg-white/[0.03] text-transparent hover:border-emerald-400/30 hover:bg-emerald-500/8 hover:text-emerald-300"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <button
              onClick={() => router.push(`/dashboard/tasks/${task.id}`)}
              className="min-w-0 flex-1 text-left"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                  {task.priority}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--foreground-soft)]">
                  {statusLabels[task.status as keyof typeof statusLabels] ?? task.status}
                </span>
              </div>
              <h3 className={`mt-3 text-base font-semibold transition-colors ${isCompleted ? "text-[color:var(--foreground-soft)] line-through" : "text-white group-hover:text-emerald-200"}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--foreground-muted)]">{task.description}</p>
              )}
            </button>

            <button
              onClick={() => onDelete(task.id)}
              disabled={loading}
              aria-label="Delete task"
              className="self-start rounded-xl border border-transparent p-2 text-[color:var(--foreground-soft)] opacity-100 transition-all hover:border-red-400/16 hover:bg-red-500/[0.08] hover:text-red-300 sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/8 pt-4 text-xs text-[color:var(--foreground-soft)]">
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
