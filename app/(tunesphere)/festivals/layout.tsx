import { currentUser } from "@clerk/nextjs"
import { SiteHeader } from "@/components/layouts/site-header"

interface FestivalsLayoutProps {
  children: React.ReactNode
}

export default async function FestivalsLayout({ children }: FestivalsLayoutProps) {
  const user = await currentUser()
  return (
    <>
      <SiteHeader user={user} />
      <main className="flex-1 bg-background">{children}</main>
    </>
  )
}
