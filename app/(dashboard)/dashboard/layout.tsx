
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
  <div className="min-h-screen mt-[var(--headerHeight)] flex justify-center">

      <Sidebar variant="dashboard">
        <ScrollArea className="py-6 pr-6 ">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </ScrollArea>
      </Sidebar>
    <main className="overflow-hidden flex">
      {children}
    </main>

  </div>
  <Footer />
  </>
   
  )
}
