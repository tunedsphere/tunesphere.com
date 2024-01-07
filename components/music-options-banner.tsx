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
        <div className="sticky flex h-[--music-options-banner-height-mobile] w-full border-b  align-bottom sm:h-[--music-options-banner-height]">
          <div className="absolute inset-0 -z-10 h-36 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-20"></div>
          <div className="mt-4 grid grid-rows-2">
            <div className="px-4 text-lg font-medium leading-relaxed sm:text-4xl md:px-12">
              {toTitleCase(segment)}
              {' : '}
            </div>
            {isOptionsSelected && (
              <div className="px-4 text-sm font-medium text-textlow md:px-12">
                {(
                  [selectedGenre, selectedYear, selectedCountry].filter(
                    Boolean,
                  ) as string[]
                ).join(' • ')}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
