import { Sidebar } from "@/components/Sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="page-shell flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto lg:ml-[calc(var(--sidebar-width)+1.25rem)]">
        <div className="mx-auto min-h-screen w-full max-w-[var(--content-width)] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:px-10 xl:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
