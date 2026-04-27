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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/dashboard/notes/${note.id}`}
          className="group panel-surface flex min-h-[16rem] flex-col rounded-[26px] p-6 transition-all duration-200 hover:border-violet-400/14 hover:bg-violet-500/[0.05] hover:shadow-[0_24px_60px_rgba(139,92,246,0.12)]"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-300 ring-1 ring-violet-400/10">
              Note
            </span>
            <svg className="h-4 w-4 flex-shrink-0 text-violet-200/0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="mt-5 flex-1 space-y-3">
            <h3 className="line-clamp-2 text-xl font-semibold leading-7 text-white transition-colors group-hover:text-violet-200">
              {note.title}
            </h3>
            <p className="line-clamp-4 text-sm leading-7 text-[color:var(--foreground-muted)]">
              {note.content || "No content"}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-[color:var(--foreground-soft)]">
            <span>Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</span>
            <span className="text-violet-200/75">Open note</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
