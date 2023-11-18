import { SiteHeader } from "@/components/layouts/site-header"

interface FestivalsLayoutProps {
  children: React.ReactNode
}

export default function FestivalsLayout({ children }: FestivalsLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">{children}</main>
    </>
  )
}
