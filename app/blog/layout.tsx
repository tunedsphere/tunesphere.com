import { currentUser } from "@clerk/nextjs"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

export const metadata = {
  title: "TunedSphere",
  description: "Psychedelic Dedicated Platform",

  keywords: ["Psytrance", "Music Platform", "Psychedelic", "Art", "Shop"],
  authors: [
    {
      name: "TunedShpere",
      url: "https://TuneSphere.com",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "light" },
    { media: "(prefers-color-scheme: dark)", color: "dark" },
  ],
  creator: "Tunedsphere",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
}



export default async function TunedLayout({ children }: React.PropsWithChildren) {
  const user = await currentUser()
  return (
    <>
     <SiteHeader user={user} />
      <main className="flex-1 mt-[var(--headerHeight)] py-14 px-4 md:px-8">{children}</main>
      <SiteFooter />
    </>
  )
}
