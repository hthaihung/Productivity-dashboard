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
    <div className="flex flex-col w-64 bg-surface-1 border-r border-gray-800 h-screen fixed left-0 top-0">
      <div className="flex items-center h-16 px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-gray-800 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          Settings
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
