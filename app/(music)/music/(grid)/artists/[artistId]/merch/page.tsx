'use client'
import '@/styles/globals.css'

import { Button } from '@/components/ui/button'
import * as React from 'react'

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Artist Page",
//   description: "Artist Discography",
// };
interface ArtistPageProps {
  params: {
    ArtistId: string
  }
}

export default function ArtistMerchPage({ params }: ArtistPageProps) {
  return (
    <div className="container mx-auto flex min-h-[600px] max-w-6xl bg-background px-8 pb-24 pt-8 backdrop-blur-sm">
      <div className="flex w-full flex-col gap-2">
        <Button variant="default" className="h-16 w-full">
          Default
        </Button>
        <Button variant="primary" className="h-16 w-full">
          Primary
        </Button>
        <Button variant="secondary" className="h-16 w-full">
          secondary
        </Button>
        <Button variant="soft" className="h-16 w-full">
          soft
        </Button>
        <Button variant="ghostColor" className="h-16 w-full">
          ghostColor
        </Button>
        <Button variant="ghost" className="h-16 w-full">
          ghost
        </Button>
        <Button variant="outlineColor" className="h-16 w-full">
          outlineColor
        </Button>
        <Button variant="link" className="h-16 w-full">
          link
        </Button>
        <Button variant="outline" className="h-16 w-full">
          outline
        </Button>
        <Button variant="destructive" className="h-16 w-full">
          destructive
        </Button>
        <Button variant="success" className="h-16 w-full">
          success
        </Button>
      </div>
    </div>
  )
}
