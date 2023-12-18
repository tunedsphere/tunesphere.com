'use client'

import React from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { toTitleCase } from '@/lib/utils'
interface MusicOptionsBannerProps {
  selectedGenre: string | null
  selectedYear: string | null
  selectedCountry: string | null
}

export function MusicOptionsBanner({
  selectedYear,
  selectedGenre,
  selectedCountry,
}: MusicOptionsBannerProps) {
  const segment = useSelectedLayoutSegment()
  const isOptionsSelected = selectedYear || selectedCountry || selectedGenre

  return (
    <>
      {segment && (
        <div className="sticky flex h-[--music-options-banner-height-mobile] w-full border-b border-muted align-bottom sm:h-[--music-options-banner-height]">
          <div className="absolute inset-0 -z-10 h-36 bg-gradient-to-b from-primary/20 via-transparent to-transparent"></div>
          {isOptionsSelected ? (
            <div className="grid w-full grid-flow-row">
              <div className="self-end px-4 font-mono text-lg font-extrabold tracking-tighter sm:text-4xl md:px-12">
                {toTitleCase(segment)}
                {' : '}
              </div>

              {/* Styling for the options */}
              <div className="px-4 text-sm font-bold md:px-12">
                {(
                  [selectedGenre, selectedYear, selectedCountry].filter(
                    Boolean,
                  ) as string[]
                ).join(' • ')}
              </div>
            </div>
          ) : (
            <div className="flex w-full self-end px-4 font-mono text-lg font-extrabold tracking-tighter text-foreground sm:text-4xl md:px-12">
              {toTitleCase(segment)}
              {' : '}
            </div>
          )}
        </div>
      )}
    </>
  )
}
