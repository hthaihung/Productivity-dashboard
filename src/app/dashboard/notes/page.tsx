import { getNotes } from "./actions"
import Link from "next/link"
import { NotesList } from "@/components/NotesList"

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="panel-surface relative overflow-hidden rounded-[30px] px-6 py-7 sm:px-8 sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.16),_transparent_30%),radial-gradient(circle_at_82%_18%,_rgba(6,182,212,0.08),_transparent_24%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="section-label text-violet-200/90">Thinking Space</p>
            <div className="space-y-3">
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Capture ideas before they disappear.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                Keep notes close at hand, move from rough thought to clearer writing, and let your workspace stay calm even as the library grows.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/notes/new"
            className="inline-flex items-center gap-3 self-start rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(139,92,246,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:from-violet-400 hover:to-fuchsia-500 hover:shadow-[0_22px_44px_rgba(139,92,246,0.28)] lg:self-auto"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            New Note
          </Link>
        </div>
      </section>

      {notes.length === 0 ? (
        <section className="panel-surface rounded-[30px] px-6 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-violet-400/12 bg-violet-500/10 text-violet-300 shadow-[0_18px_50px_rgba(139,92,246,0.14)]">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">No notes yet</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--foreground-muted)] sm:text-base">
              Start with a quick thought, a study insight, or a planning draft, and this workspace will begin to feel like an extension of your mind.
            </p>
            <Link
              href="/dashboard/notes/new"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-violet-400/16 hover:bg-violet-500/[0.08]"
            >
              Create your first note
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 px-1">
            <div>
              <p className="section-label">Library</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Recent notes</h2>
            </div>
            <p className="text-sm text-[color:var(--foreground-muted)]">{notes.length} captured {notes.length === 1 ? "note" : "notes"}</p>
          </div>
          <NotesList notes={notes} />
        </section>
      )}
    </div>
  )
}
