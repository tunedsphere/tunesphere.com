import { currentUser } from "@clerk/nextjs"
import { SiteGlobalNav } from "@/components/layouts/site-global-nav"
import { SiteIndexFooter } from "@/components/layouts/site-index-footer"

interface TunedLayoutProps {
  children: React.ReactNode
}

export default async function TunedLayout({ children }: TunedLayoutProps) {
  const user = await currentUser()

  return (
    <>
      <SiteGlobalNav user={user} />
      <main className="flex-1 bg-background-index">
        {children}
        <SiteIndexFooter />
        </main>
      
    </>
  )
}
