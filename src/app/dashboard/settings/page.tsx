import { getProfile } from "./actions"
import { ProfileForm } from "@/components/ProfileForm"
import { DeleteAccountButton } from "@/components/DeleteAccountButton"
import { format } from "date-fns"

export default async function SettingsPage() {
  const user = await getProfile()

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="panel-surface relative overflow-hidden rounded-[30px] px-6 py-7 sm:px-8 sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_30%),radial-gradient(circle_at_82%_18%,_rgba(236,72,153,0.08),_transparent_24%)]" />
        <div className="relative max-w-3xl space-y-4">
          <p className="section-label text-cyan-200/90">Account Studio</p>
          <div className="space-y-3">
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Keep your account calm, clear, and under control.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--foreground-muted)] sm:text-lg">
              Update the profile others see, review the state of your account, and separate routine settings from actions that deserve more care.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="panel-surface rounded-[30px] p-6 sm:p-7">
          <div>
            <p className="section-label">Profile</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Personal details</h2>
          </div>
          <div className="mt-6">
            <ProfileForm user={user} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-surface rounded-[30px] p-6">
            <div>
              <p className="section-label">Account</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Information</h2>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <span className="text-sm text-[color:var(--foreground-muted)]">User ID</span>
                <span className="max-w-[12rem] truncate text-sm font-mono text-white sm:max-w-[16rem]">{user.id}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <span className="text-sm text-[color:var(--foreground-muted)]">Member Since</span>
                <span className="text-sm text-white">{format(new Date(user.createdAt), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.08] px-4 py-4">
                <span className="text-sm text-emerald-100/80">Account Status</span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/10">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="panel-surface rounded-[30px] p-6">
            <div>
              <p className="section-label">Preferences</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Current defaults</h2>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">Theme</p>
                    <p className="mt-1 text-xs text-[color:var(--foreground-soft)]">Dark mode is currently enabled</p>
                  </div>
                  <span className="rounded-xl border border-white/8 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/80">
                    Dark
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">Notifications</p>
                    <p className="mt-1 text-xs text-[color:var(--foreground-soft)]">Receive updates about your activity</p>
                  </div>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/10">
                    Enabled
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">Focus Timer Sound</p>
                    <p className="mt-1 text-xs text-[color:var(--foreground-soft)]">Play sound when timer completes</p>
                  </div>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/10">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel-surface rounded-[30px] border border-red-400/12 bg-[linear-gradient(180deg,rgba(236,72,153,0.05),rgba(17,24,39,0)_55%)] p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label text-rose-200/90">Danger Zone</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Delete account</h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--foreground-muted)]">
              Permanently remove your account and all associated data. This includes notes, tasks, focus sessions, and streak history.
            </p>
          </div>
          <DeleteAccountButton />
        </div>
      </section>
    </div>
  )
}
