import { currentUser } from "@clerk/nextjs"
import { SiteGlobalNav } from "@/components/layouts/site-global-nav"
import { SiteIndexFooter } from "@/components/layouts/site-index-footer"
import "@/styles/globals.css"

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

interface TunedLayoutProps {
  children: React.ReactNode
}

export default async function TunedLayout({ children }: TunedLayoutProps) {
  const user = await currentUser()

  return (
    <>
      <SiteGlobalNav user={user} />
      <main className="flex-1 bg-background-index">
        {children}
        <SiteIndexFooter />
        </main>
      
    </>
  )
}
