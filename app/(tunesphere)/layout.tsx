import { GlobalNav } from '@/components';
import { Footer } from '@/components';



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
}export default function TunedLayout({ children }: TunedLayoutProps) {
  return (
    <>
      <GlobalNav />
      {children}
      <Footer />
    </>
  );
}