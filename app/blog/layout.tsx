import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

export default function TunedLayout({ children }: React.PropsWithChildren) {

  return (
    <>
     <SiteHeader />
      <main className="flex-1 mt-[var(--headerHeight)] py-14 px-4 md:px-8">{children}</main>
      <SiteFooter />
    </>
  )
}
