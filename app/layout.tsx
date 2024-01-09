import '@/styles/globals.css'
import clsx from 'clsx'
import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { env } from '@/env.mjs'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteConfig } from '@/configs/site'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: 'Psychedelic Dedicated Platform',

  keywords: ['Psytrance', 'Music Platform', 'Psychedelic', 'Art', 'Shop'],
  authors: [
    {
      name: 'TunedShpere',
      url: 'https://tunesphere.com',
    },
  ],
  creator: 'TunedSphere',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

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
          '7xl:text-4xl',
          'bg-background',
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <body className="font-sans antialiased">
          {children}
          <Toaster richColors />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
