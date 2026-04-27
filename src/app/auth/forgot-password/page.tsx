import { Metadata } from "next"
import { RequestResetForm } from "@/components/RequestResetForm"

export const metadata: Metadata = {
  title: "Reset Password - Dashboard",
  description: "Request a password reset link",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        <RequestResetForm />

        <p className="text-center text-sm text-gray-400">
          Remember your password?{" "}
          <a href="/auth/signin" className="text-cyan-400 hover:text-cyan-300 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
