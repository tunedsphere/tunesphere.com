import { SiteHeader } from "@/components/layouts/site-header"

interface LabelsLayoutProps {
  children: React.ReactNode
}

export default function LabelsLayout({ children }: LabelsLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">{children}</main>
    </>
  )
}
