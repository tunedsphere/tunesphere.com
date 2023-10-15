import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { Sidebar } from "@/components/ui/sidebar"

import { dashboardConfig } from "@/configs/dashboard"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "@/components/layouts/sidebar-nav"


export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }


  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col sm:px-6 md:px-8">
      <SiteHeader user={user} />
        <section className="mt-[var(--headerHeight)] grid flex-1 items-start md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[var(--sidebar-dashboard-width)_minmax(0,1fr)]">
          <Sidebar variant="dashboard">
            <ScrollArea className="py-6 pr-6">
              <SidebarNav items={dashboardConfig.sidebarNav} />
            </ScrollArea>
          </Sidebar>
          <main className="flex w-full flex-col overflow-hidden bg-background">
            {children}
          </main>
        </section>
        <SiteFooter />
      </div>
    </>
  )
}
