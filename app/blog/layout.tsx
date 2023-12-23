import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteNavbar } from '@/components/layouts/site-navbar'

export default function TunedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SiteNavbar />
      <main className="mx-auto mt-[var(--headerHeight)] max-w-8xl flex-1 px-4 py-14 md:px-8">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
