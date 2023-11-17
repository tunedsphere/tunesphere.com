import { currentUser } from "@clerk/nextjs"

import { ReducedFooter } from "@/components/layouts/reduced-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface RootMusicLayoutProps {
  children: React.ReactNode
}

export default  function RootMusicLayout({ children }: RootMusicLayoutProps) {

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">{children}</main>
      <ReducedFooter />
    </>
  )
}