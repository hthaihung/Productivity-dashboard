import { Metadata } from "next"
import Link from "next/link"
import { SignUpForm } from "@/components/SignUpForm"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"

export const metadata: Metadata = {
  title: "Sign Up - Dashboard",
  description: "Create your personal operating system account",
}

export default function SignUpPage() {
  return (
    <div className="auth-shell relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative z-10 grid w-full max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center">
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div className="status-pill border-cyan-400/18 bg-cyan-500/10 text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              Personal OS
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white xl:text-6xl xl:leading-[1.02]">
                Build a cleaner system for study, work, focus, and momentum.
              </h1>
              <p className="max-w-lg text-base leading-7 text-[color:var(--foreground-muted)] xl:text-lg">
                Create your account to bring notes, tasks, focus sessions, and streaks into one refined operating layer.
              </p>
            </div>
            <div className="grid max-w-lg gap-3 sm:grid-cols-2">
              <div className="widget-card rounded-[24px] p-4">
                <div className="relative z-10">
                  <p className="section-label">Clarity</p>
                  <p className="mt-2 text-lg font-semibold text-white">One place to orient</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">See the shape of your work without the usual dashboard clutter.</p>
                </div>
              </div>
              <div className="widget-card rounded-[24px] p-4">
                <div className="relative z-10">
                  <p className="section-label">Momentum</p>
                  <p className="mt-2 text-lg font-semibold text-white">Built to keep moving</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)]">Tasks, streaks, and focus blocks stay aligned from day one.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-panel rounded-[32px] p-6 sm:p-8 lg:p-9">
          <div className="relative z-10 space-y-6">
            <div className="space-y-3 text-center lg:text-left">
              <p className="section-label text-cyan-200/90">Create account</p>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.2rem]">Start your productivity system</h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-muted)] sm:text-base">
                  Set up your account and step into a calmer dashboard for work, study, and focus.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <GoogleSignInButton>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </GoogleSignInButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="rounded-full border border-white/8 bg-[rgba(10,14,22,0.92)] px-3 py-1 text-[color:var(--foreground-soft)]">
                    Or sign up with email
                  </span>
                </div>
              </div>

              <SignUpForm />
            </div>

            <p className="text-center text-sm text-[color:var(--foreground-muted)] lg:text-left">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-medium text-cyan-300 transition-colors hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
