import { SiteNavbar } from '@/components/layouts/site-navbar'

interface FestivalsLayoutProps {
  children: React.ReactNode
}

export default function FestivalsLayout({ children }: FestivalsLayoutProps) {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1 bg-background">{children}</main>
    </>
  )
}
