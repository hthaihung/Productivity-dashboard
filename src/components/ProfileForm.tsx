"use client"

import { useState } from "react"
import { updateProfile } from "@/app/dashboard/settings/actions"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  user: {
    name: string | null
    email: string
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [name, setName] = useState(user.name || "")
  const [email, setEmail] = useState(user.email)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Name is required")
      return
    }

    setIsSaving(true)
    setError("")
    setSuccess(false)

    try {
      await updateProfile({ name, email })
      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          Profile updated successfully
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/88">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-[color:var(--foreground-soft)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            disabled={isSaving}
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/88">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-[color:var(--foreground-soft)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            disabled={isSaving}
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-white/8 pt-5">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(6,182,212,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}
