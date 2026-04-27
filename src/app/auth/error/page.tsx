import { Metadata } from "next"
import Link from "next/link"

type AuthErrorPageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

const errorContent: Record<string, { eyebrow: string; title: string; description: string; hint?: string }> = {
  OAuthAccountNotLinked: {
    eyebrow: "Account protection",
    title: "This email is already tied to another sign-in method",
    description:
      "For your security, we can’t automatically connect Google to an existing account that was created another way.",
    hint: "Sign in using the original method you used before. After that, you can connect Google later only if the product adds a safe linking flow inside settings.",
  },
  AccessDenied: {
    eyebrow: "Access denied",
    title: "We couldn’t complete that sign-in request",
    description: "The sign-in attempt was denied before your session could be created.",
    hint: "Try again or use another available sign-in method.",
  },
  OAuthSignin: {
    eyebrow: "Google sign-in",
    title: "Google sign-in could not start",
    description: "Something interrupted the beginning of the Google sign-in flow.",
    hint: "Try again, or sign in with email if that’s how you created the account.",
  },
  OAuthCallback: {
    eyebrow: "Google sign-in",
    title: "Google sign-in did not finish correctly",
    description: "The callback from Google did not complete successfully.",
    hint: "Try again, or return to the original sign-in method for this account.",
  },
  Default: {
    eyebrow: "Authentication",
    title: "We couldn’t sign you in",
    description: "Something went wrong while trying to sign you in.",
    hint: "Please try again from the sign-in page.",
  },
}

export const metadata: Metadata = {
  title: "Authentication Error - Dashboard",
  description: "Resolve a sign-in issue securely and return to your dashboard.",
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const params = searchParams ? await searchParams : undefined
  const content = (params?.error && errorContent[params.error]) || errorContent.Default

  return (
    <div className="auth-shell relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="auth-panel relative z-10 w-full max-w-2xl rounded-[34px] p-6 sm:p-8 lg:p-10">
        <div className="relative z-10 space-y-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/14 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              {content.eyebrow}
            </div>
            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                {content.title}
              </h1>
              <p className="mx-auto max-w-xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
                {content.description}
              </p>
            </div>
          </div>

          {content.hint && (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5 text-sm leading-6 text-[color:var(--foreground-muted)]">
              {content.hint}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/auth/signin"
              className="btn-primary inline-flex items-center justify-center rounded-[20px] px-5 py-3 text-sm font-semibold"
            >
              Return to sign in
            </Link>
            <Link
              href="/auth/signin?error=OAuthAccountNotLinked"
              className="btn-secondary inline-flex items-center justify-center rounded-[20px] px-5 py-3 text-sm font-semibold"
            >
              See sign-in guidance
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
