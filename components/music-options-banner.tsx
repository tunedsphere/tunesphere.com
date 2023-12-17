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
        <div className="sticky flex h-24 w-full align-middle font-bold ">
          <div className="absolute inset-0 -z-10 h-36 bg-gradient-to-b from-primary/20 via-transparent to-transparent"></div>
          {isOptionsSelected ? (
            <div className="flex w-full items-center border-b border-muted px-4 md:px-12">
              <div className="py-2 font-mono text-4xl tracking-tighter text-foreground">
                {toTitleCase(segment)}
                {' : '}
                {(
                  [selectedGenre, selectedYear, selectedCountry].filter(
                    Boolean,
                  ) as string[]
                ).join(' • ')}
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center border-b border-muted px-4 align-middle font-mono md:px-12">
              <div className="py-2 text-4xl tracking-tighter text-foreground">
                {toTitleCase(segment)}
                {' : '}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
