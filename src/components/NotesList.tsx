"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface NotesListProps {
  notes: Note[]
}

export function NotesList({ notes }: NotesListProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/dashboard/notes/${note.id}`}
          className="card-interactive group panel-surface-glass flex min-h-[18rem] flex-col rounded-[28px] p-7 transition-all duration-300 hover:border-violet-400/20 hover:bg-gradient-to-br hover:from-violet-500/[0.08] hover:to-transparent hover:shadow-[0_28px_70px_rgba(139,92,246,0.16)]"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-violet-500/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-300 ring-1 ring-violet-400/15 backdrop-blur-sm">
              Note
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/0 text-violet-200/30 transition-all duration-300 group-hover:bg-violet-500/10 group-hover:text-violet-300">
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="mt-6 flex-1 space-y-3">
            <h3 className="line-clamp-2 text-xl font-semibold leading-7 text-white transition-colors group-hover:text-violet-100">
              {note.title}
            </h3>
            <p className="line-clamp-4 text-sm leading-7 text-[color:var(--foreground-muted)] transition-colors group-hover:text-[color:var(--foreground)]">
              {note.content || "No content"}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-[color:var(--foreground-soft)] transition-colors group-hover:border-violet-400/15">
            <span>Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</span>
            <span className="flex items-center gap-1.5 text-violet-200/30 transition-all group-hover:text-violet-300">
              <span>Open</span>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
