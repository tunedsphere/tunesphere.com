
import { SiteHeader } from '@components/layouts/site-header';
import { ShopHeader } from '@components/layouts/shop-header';
import { SiteFooter } from '@components/layouts/site-footer';

interface ShopLayoutProps {
  children: React.ReactNode
}


export default async function ShopLayout({ children }: ShopLayoutProps) {
  return (
      <>
      
        <SiteHeader/>
        <ShopHeader/>
        <main className='bg-white w-screen h-full '>
          {children}
          </main>
        <SiteFooter/>

      </>
  )
}
