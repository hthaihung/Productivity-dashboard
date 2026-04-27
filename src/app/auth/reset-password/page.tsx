import { Metadata } from "next"
import { ResetPasswordForm } from "@/components/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password - Dashboard",
  description: "Set a new password for your account",
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Invalid Link</h1>
            <p className="text-gray-400">This password reset link is invalid</p>
          </div>
          <div className="text-center">
            <a
              href="/auth/forgot-password"
              className="text-cyan-400 hover:text-cyan-300 font-medium text-sm"
            >
              Request a new reset link
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Set New Password</h1>
          <p className="text-gray-400">Enter your new password below</p>
        </div>

        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}
