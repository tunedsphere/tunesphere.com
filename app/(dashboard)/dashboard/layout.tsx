
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { dashboardConfig } from "@/configs/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/layouts/sidebar-nav";

import { SiteHeader } from "@components/layouts/site-header";
import { Footer } from '@components/layouts/site-footer';
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
  <SiteHeader/>
  <div className="min-h-screen mt-[var(--headerHeight)] flex justify-center max-w-[1280px] mx-auto">
      <Sidebar variant="dashboard">
        <ScrollArea className="py-6 pr-6">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </ScrollArea>
      </Sidebar>
    <main className="overflow-hidden flex w-screen">
      {children}
    </main>

  </div>
  <Footer />
  </>
   
  )
}
