import { currentUser } from "@clerk/nextjs"
import { SiteHeader } from "@/components/layouts/site-header"

interface LabelsLayoutProps {
  children: React.ReactNode
}

export default async function LabelsLayout({ children }: LabelsLayoutProps) {
  const user = await currentUser()
  return (
    <>
      <SiteHeader user={user} />
      <main className="flex-1 bg-background">{children}</main>
    </>
  )
}
