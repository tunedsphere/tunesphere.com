import "@/styles/globals.css"
import clsx from 'clsx';
import type { Metadata } from "next"

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { env } from "@/env.mjs"
import { ClerkProvider } from "@clerk/nextjs"


import { siteConfig } from "@/configs/site"
import { Toaster, toast } from 'sonner'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: "Psychedelic Dedicated Platform",

  keywords: ["Psytrance", "Music Platform", "Psychedelic", "Art", "Shop"],
  authors: [
    {
      name: "TunedShpere",
      url: "https://tunesphere.com",
    },
  ],
  creator: "TunedSphere",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
   children,
}: {
children: React.ReactNode
}) {
  return (
    <ClerkProvider>
          <html
      lang="en"
      className={clsx(
        'bg-background',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
        <body className="antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
