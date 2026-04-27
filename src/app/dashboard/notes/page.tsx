import { getNotes } from "./actions"
import Link from "next/link"
import { NotesList } from "@/components/NotesList"

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="panel-surface-elevated relative overflow-hidden rounded-[32px] px-6 py-8 sm:px-10 sm:py-10 animate-fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,_rgba(139,92,246,0.18),_transparent_32%),radial-gradient(circle_at_82%_18%,_rgba(6,182,212,0.1),_transparent_26%)]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-glow" />
              <p className="section-label text-violet-200">Thinking Space</p>
            </div>
            <div className="space-y-4">
              <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[4rem] lg:leading-[1.1]">
                Capture ideas before they disappear.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--foreground-muted)] sm:text-xl">
                Keep notes close at hand, move from rough thought to clearer writing, and let your workspace stay calm even as the library grows.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/notes/new"
            className="group inline-flex items-center gap-3 self-start rounded-[22px] bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 text-base font-semibold text-white shadow-[0_20px_50px_rgba(139,92,246,0.3)] transition-all duration-300 hover:-translate-y-1 hover:from-violet-400 hover:to-fuchsia-500 hover:shadow-[0_24px_60px_rgba(139,92,246,0.35)] lg:self-auto"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-110">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            New Note
          </Link>
        </div>
      </section>

      {notes.length === 0 ? (
        <section className="panel-surface-glass rounded-[32px] px-6 py-12 sm:px-8 sm:py-14 animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
            <div className="card-glow-violet flex h-24 w-24 items-center justify-center rounded-[30px] border border-violet-400/14 bg-gradient-to-br from-violet-500/12 via-violet-500/8 to-transparent text-violet-300 backdrop-blur-sm">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="mt-8 text-3xl font-semibold text-white">No notes yet</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[color:var(--foreground-muted)]">
              Start with a quick thought, a study insight, or a planning draft, and this workspace will begin to feel like an extension of your mind.
            </p>
            <Link
              href="/dashboard/notes/new"
              className="mt-10 inline-flex items-center gap-2 rounded-[22px] border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-violet-400/20 hover:bg-violet-500/[0.1] hover:-translate-y-0.5"
            >
              Create your first note
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-6 animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center justify-between gap-4 px-1">
            <div>
              <p className="section-label">Library</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Recent notes</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <svg className="h-4 w-4 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-[color:var(--foreground-muted)]">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>
          </div>
          <NotesList notes={notes} />
        </section>
      )}
    </div>
  )
}
