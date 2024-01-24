'use client'

import '@/styles/globals.css'
import * as React from 'react'

import { ArtistTabs } from '@/components/pagers/artist-tabs'
import { Avatar } from '@/components/ui/avatar'

interface ArtistLayoutPageProps {
  children: React.ReactNode
}

export default function ArtistLayoutPage({ children }: ArtistLayoutPageProps) {
  return (
    <>
      <div
        id="artist-private-page"
        className="scrollable-container h-[calc(100vh-var(--headerHeight)-var(--musicTabsHeight)-var(--reduced-footer-height))] grow overflow-y-scroll"
        style={{
          backgroundImage: 'url("/bggenre/milky-way.jpg")',
          backgroundRepeat: 'repeat',
        }}
      >
        <section className="mx-auto max-w-6xl items-center bg-background align-middle">
          <div className="relative flex items-center py-8 font-bold">
            <Avatar className="ml-8 mr-4 h-40 w-40" />
            <div className="items-end self-end text-4xl">Artist Name</div>
          </div>
          <ArtistTabs />
        </section>
        {children}
      </div>
    </>
  )
}
