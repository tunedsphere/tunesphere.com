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
        <div className="sticky flex w-full border-b align-bottom">
          <div className="absolute inset-0 -z-10 h-36 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-20"></div>
          <div className="grid grid-flow-row py-4">
            <div className="px-4 text-lg font-semibold leading-relaxed sm:text-2xl md:px-12">
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
