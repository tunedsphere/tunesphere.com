
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { dashboardConfig } from "@/configs/dashboard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "@/components/layouts/sidebar-nav"

import { GlobalNav } from '@/components/GlobalNav/GlobalNav';
import { Footer } from '@/components/Footer';
import { Sidebar } from "@components/ui/sidebar"


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
<>
  <GlobalNav user={user} />
  <div className="min-h-screen flex flex-col items-center">
  <div className="mt-[var(--headerHeight)] container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <Sidebar variant="dashboard">
        <ScrollArea className="py-6 pr-6 ">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </ScrollArea>
      </Sidebar>
    <main className="flex w-full flex-col overflow-hidden">
      {children}
    </main>
  </div>
  </div>
  <Footer />
  </>
   
  )
}
