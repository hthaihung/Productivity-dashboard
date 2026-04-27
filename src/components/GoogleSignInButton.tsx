"use client"

import { signIn } from "next-auth/react"

type GoogleSignInButtonProps = {
  children: React.ReactNode
}

export function GoogleSignInButton({ children }: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
    >
      {children}
    </button>
  )
}
