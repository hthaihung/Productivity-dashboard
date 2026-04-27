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
      <div className="panel-surface flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-surface-glass">
        <div className="border-b border-white/6 px-6 py-6">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-cyan-400/15 bg-cyan-400/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Personal OS
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white">Dashboard</h1>
              <p className="mt-1 text-sm text-[color:var(--foreground-muted)] text-balance">
                Calm command center for focus, planning, and momentum.
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/14 via-cyan-500/8 to-transparent text-white shadow-[0_16px_40px_rgba(6,182,212,0.14)] ring-1 ring-cyan-400/14"
                    : "text-[color:var(--foreground-muted)] hover:bg-white/4 hover:text-white"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full transition-all ${
                    isActive ? "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]" : "bg-transparent"
                  }`}
                />
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                    isActive
                      ? "border-cyan-400/16 bg-cyan-400/10 text-cyan-300"
                      : "border-white/6 bg-white/[0.03] text-[color:var(--foreground-soft)] group-hover:border-white/10 group-hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="flex-1">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-white/6 px-4 py-4">
          <Link
            href="/dashboard/settings"
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--foreground-muted)] transition-all duration-200 hover:bg-white/4 hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03] text-[color:var(--foreground-soft)] transition-all group-hover:border-white/10 group-hover:text-white">
              <Cog6ToothIcon className="h-5 w-5" />
            </span>
            <span className="flex-1">Settings</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--foreground-muted)] transition-all duration-200 hover:bg-white/4 hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03] text-[color:var(--foreground-soft)] transition-all group-hover:border-white/10 group-hover:text-white">
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
