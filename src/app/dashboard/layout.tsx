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
      <main className="flex-1 overflow-y-auto lg:ml-[calc(var(--sidebar-width)+0.75rem)] xl:ml-[calc(var(--sidebar-width)+1rem)]">
        <div className="mx-auto min-h-screen w-full max-w-[var(--content-width)] px-4 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-7 xl:px-8 xl:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
