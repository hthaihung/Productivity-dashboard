"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Notes", href: "/dashboard/notes", icon: DocumentTextIcon },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckCircleIcon },
  { name: "Focus", href: "/dashboard/focus", icon: ClockIcon },
  { name: "Streaks", href: "/dashboard/streaks", icon: FireIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 px-4 py-5 lg:block">
      <div className="panel-surface-glass flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 backdrop-blur-xl">
        <div className="border-b border-white/8 px-6 py-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Personal OS</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white">Dashboard</h1>
              <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)] text-balance">
                Calm command center for focus, planning, and momentum.
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-[20px] px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/16 via-cyan-500/10 to-transparent text-white shadow-[0_18px_45px_rgba(6,182,212,0.18)] ring-1 ring-cyan-400/20"
                    : "text-[color:var(--foreground-muted)] hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-r-full transition-all duration-200 ${
                    isActive ? "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" : "bg-transparent"
                  }`}
                />
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "border-cyan-400/20 bg-cyan-400/12 text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.2)]"
                      : "border-white/8 bg-white/[0.04] text-[color:var(--foreground-soft)] group-hover:border-white/12 group-hover:bg-white/[0.06] group-hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-white/8 px-4 py-5">
          <Link
            href="/dashboard/settings"
            className="group flex items-center gap-3 rounded-[20px] px-4 py-3.5 text-sm font-semibold text-[color:var(--foreground-muted)] transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-[color:var(--foreground-soft)] transition-all duration-200 group-hover:border-white/12 group-hover:bg-white/[0.06] group-hover:text-white">
              <Cog6ToothIcon className="h-5 w-5" />
            </span>
            <span className="flex-1">Settings</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="group flex w-full items-center gap-3 rounded-[20px] px-4 py-3.5 text-sm font-semibold text-[color:var(--foreground-muted)] transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-[color:var(--foreground-soft)] transition-all duration-200 group-hover:border-white/12 group-hover:bg-white/[0.06] group-hover:text-white">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </span>
              <span className="flex-1 text-left">Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
