
import { SiteHeader } from '@components/layouts/site-header';



interface ShopLayoutProps {
  children: React.ReactNode
}


export default async function ShopLayout({ children }: ShopLayoutProps) {
  return (
      <>
               {children}
          </>
  )
}
