
import { SiteHeader } from '@components/layouts/site-header';
import { currentUser } from "@clerk/nextjs";


interface LabelsLayoutProps {
  children: React.ReactNode
}


export default async function LabelsLayout({ children }: LabelsLayoutProps) {
  const user = await currentUser()
  return (
      <>
      <SiteHeader user={user}/>
          {children}
          </>
  )
}
