"use client"

import { useState } from "react"
import { deleteAccount } from "@/app/dashboard/settings/actions"
import { signOut } from "next-auth/react"

export function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      return
    }

    setIsDeleting(true)

    try {
      await deleteAccount()
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete account")
      setIsDeleting(false)
      setShowConfirm(false)
      setConfirmText("")
    }
  }

  if (!showConfirm) {
    return (
      <button
        className="rounded-2xl border border-red-400/16 bg-red-500/[0.08] px-4 py-2.5 text-sm font-medium text-red-300 transition-all duration-200 hover:border-red-400/24 hover:bg-red-500/[0.14] hover:text-red-200"
        onClick={() => setShowConfirm(true)}
      >
        Delete Account
      </button>
    )
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-[24px] border border-red-400/18 bg-red-500/[0.08] p-4">
        <p className="text-sm font-medium text-red-300">
          This action cannot be undone
        </p>
        <p className="mt-2 text-xs leading-6 text-red-100/70">
          All your data including notes, tasks, pomodoro sessions, and streaks will be permanently deleted.
        </p>
        <div className="mt-4 space-y-2">
          <label htmlFor="confirm-delete" className="block text-xs text-red-100/75">
            Type <span className="font-mono font-bold text-red-300">DELETE</span> to confirm
          </label>
          <input
            id="confirm-delete"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            className="w-full rounded-2xl border border-red-400/16 bg-[#120d11] px-3 py-2.5 text-sm text-white placeholder:text-red-100/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={isDeleting}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setShowConfirm(false)
            setConfirmText("")
          }}
          disabled={isDeleting}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[color:var(--foreground-muted)] transition-all duration-200 hover:text-white hover:bg-white/[0.07] disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting || confirmText !== "DELETE"}
          className="rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete My Account"}
        </button>
      </div>
    </div>
  )
}
