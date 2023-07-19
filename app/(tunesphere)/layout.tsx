import { SiteGlobalNav } from "@/components/layouts/site-global-nav";
import { Footer } from '@components/layouts/site-footer';
import { currentUser } from "@clerk/nextjs";

export const metadata = {
  title: 'TunedSphere',
  description: 'Psychedelic Dedicated Platform',

    keywords: [
      "Psytrance",
      "Music Platform",
      "Psychedelic",
      "Art",
      "Shop",
    ],
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

      {children}
      <Footer />
    </>
  )
}