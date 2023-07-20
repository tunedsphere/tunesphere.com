
import { SiteHeader } from '@components/layouts/site-header';



interface LabelsLayoutProps {
  children: React.ReactNode
}


export default async function LabelsLayout({ children }: LabelsLayoutProps) {
  return (
      <>
      <body className='no-scrollbar'>
     <SiteHeader/>
          {children}
          </body>
          </>
  )
}
