import { SiteHeader } from "@/components/layouts/site-header"

interface LabelsLayoutProps {
  children: React.ReactNode
}

export default function LabelsLayout({ children }: LabelsLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
