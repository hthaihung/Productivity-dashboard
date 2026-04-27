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
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[var(--sidebar-width)] px-2.5 py-3 lg:block xl:px-3 xl:py-4">
      <div className="panel-surface-glass flex h-full flex-col overflow-hidden rounded-[24px] border border-white/7">
        <div className="border-b border-white/7 px-4 py-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/16 bg-cyan-400/8 px-2.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Personal OS</span>
            </div>
            <h1 className="text-[1.15rem] font-semibold tracking-[-0.04em] text-white">Dashboard</h1>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-2 py-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-2.5 rounded-[16px] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/14 via-cyan-500/6 to-transparent text-white ring-1 ring-cyan-400/16"
                    : "text-[color:var(--foreground-muted)] hover:bg-white/[0.035] hover:text-white"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full transition-all duration-200 ${
                    isActive ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.35)]" : "bg-transparent"
                  }`}
                />
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-[12px] border transition-all duration-200 ${
                    isActive
                      ? "border-cyan-400/16 bg-cyan-400/10 text-cyan-300"
                      : "border-white/6 bg-white/[0.025] text-[color:var(--foreground-soft)] group-hover:border-white/10 group-hover:bg-white/[0.04] group-hover:text-white"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1 truncate">{item.name}</span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
              </Link>
            )
          })}
        </nav>

        <div className="space-y-1.5 border-t border-white/7 px-2 py-3">
          <Link
            href="/dashboard/settings"
            className="group flex items-center gap-2.5 rounded-[16px] px-3 py-2.5 text-sm font-medium text-[color:var(--foreground-muted)] transition-all duration-200 hover:bg-white/[0.035] hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[12px] border border-white/6 bg-white/[0.025] text-[color:var(--foreground-soft)] transition-all duration-200 group-hover:border-white/10 group-hover:bg-white/[0.04] group-hover:text-white">
              <Cog6ToothIcon className="h-4.5 w-4.5" />
            </span>
            <span className="flex-1">Settings</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="group flex w-full items-center gap-2.5 rounded-[16px] px-3 py-2.5 text-sm font-medium text-[color:var(--foreground-muted)] transition-all duration-200 hover:bg-white/[0.035] hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-[12px] border border-white/6 bg-white/[0.025] text-[color:var(--foreground-soft)] transition-all duration-200 group-hover:border-white/10 group-hover:bg-white/[0.04] group-hover:text-white">
                <ArrowRightOnRectangleIcon className="h-4.5 w-4.5" />
              </span>
              <span className="flex-1 text-left">Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
