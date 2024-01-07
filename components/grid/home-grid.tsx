'use client'

import '@/styles/globals.css'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { recordLabelsData } from '@/public/recordLabelsData'
import { Button } from '../ui/button'

interface HomeGridProps {
  selectedGenre: string | null
  selectedYear: string | null
  selectedCountry: string | null
}

export function HomeGrid({
  selectedYear,
  selectedCountry,
  selectedGenre,
}: HomeGridProps) {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const expandedLabelRef = useRef(null)

  const handleLabelClick = (labelIndex: number) => {
    setSelectedLabel((prevSelectedLabel) =>
      prevSelectedLabel === labelIndex.toString()
        ? null
        : labelIndex.toString(),
    )
  }
  const yearOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.founding_year)),
  )

  // Filter and sort the record labels based on selected filters
  const sortedAndFilteredLabels = recordLabelsData
    .filter((label) => {
      if (
        (selectedGenre === null || label.genres.includes(selectedGenre)) &&
        (selectedYear === null || label.founding_year.includes(selectedYear)) &&
        (selectedCountry === null || label.country.includes(selectedCountry))
      ) {
        return true
      }
      return false
    })
    .sort((a, b) => a.name.localeCompare(b.name))
  const limitedLabels = sortedAndFilteredLabels.slice(0, 14)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectedLabel !== null &&
        event.target instanceof Element &&
        event.target.closest('.expanded-label-container')
      ) {
        // Inside the expanded label container, do nothing
        return
      }

      setSelectedLabel(null)
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedLabel(null)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [selectedLabel])
  const initialColumnWidth = 200 // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth)

  const handleResize = (e: React.SyntheticEvent) => {
    setColumnWidth((e.target as HTMLDivElement).offsetWidth)
  }

  return (
    <>
      <div
        id="music-home-index"
        className="sm:music-grid music-grid-mobile scrollable-container grow overflow-y-scroll "
      >
        <div className="flex flex-col">
          <section
            id="music-home-slider"
            className="relative mb-10 h-64 w-full overflow-hidden"
          >
            <div className="absolute inset-0 flex h-full w-full items-center justify-between">
              <Button variant="ghost">
                <svg
                  className=" z-100 h-6 w-6"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button variant="ghost">
                <svg
                  className=" z-100 h-6 w-6"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
            <div className="flex h-full w-full gap-2">
              <div className="relative h-full w-full">
                <img
                  alt="Slide 1"
                  className="h-full w-full object-cover"
                  height={600}
                  src="/genreselections/meditation/Ascend.jpg"
                  style={{
                    aspectRatio: '1200/600',
                    objectFit: 'cover',
                  }}
                  width={1200}
                />
                <div className="absolute inset-0 flex items-end bg-black bg-opacity-30">
                  <div className="w-full p-2">
                    <h2 className="text-center text-lg font-semibold text-zinc-50 opacity-80">
                      New album
                    </h2>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full">
                <img
                  alt="Slide 2"
                  className="h-full w-full object-cover"
                  height={600}
                  src="/genreselections/psybient/A Singularity Encoded.jpg"
                  style={{
                    aspectRatio: '1200/600',
                    objectFit: 'cover',
                  }}
                  width={1200}
                />
                <div className="absolute inset-0 flex items-end bg-black bg-opacity-30">
                  <div className="w-full p-2">
                    <h2 className="text-center text-lg font-semibold text-zinc-50 opacity-80">
                      New album
                    </h2>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full">
                <img
                  alt="Slide 3"
                  className="h-full w-full object-cover"
                  height={600}
                  src="/genreselections/meditation/Altona.png"
                  style={{
                    aspectRatio: '1200/600',
                    objectFit: 'cover',
                  }}
                  width={1200}
                />
                <div className="absolute inset-0 flex items-end bg-black bg-opacity-30">
                  <div className="w-full p-2">
                    <h2 className="text-center text-lg font-semibold text-zinc-50 opacity-80">
                      New album
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          id="home-grid"
          className="sm:music-grid music-grid-mobile pb-12 pl-4 pr-8 pt-4 @container sm:pl-12"
        >
          <div className="flex items-center justify-between">
            <h1 className="py-4 text-center text-xl underline decoration-primary decoration-2 underline-offset-4">
              New release
            </h1>
            <Link className="text-center" href="/">
              View All
            </Link>
          </div>
          <section id="music-home-new-release" className="flex gap-2">
            <div className="grid w-9/12 grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7">
              {limitedLabels.map((label, index) => (
                <React.Fragment key={index}>
                  <div
                    key={label.id}
                    className={`relative cursor-pointer items-center ${
                      selectedLabel === index.toString() ? '' : ''
                    }`}
                    onClick={() => handleLabelClick(index)}
                  >
                    <Image
                      width={400}
                      height={400}
                      src={label.image}
                      alt={label.name}
                      className="-pointer aspect-square  border"
                    ></Image>
                    <h3 className="mt-2 cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-base">
                      {label.name}
                    </h3>
                    <p className="cursor-pointer text-xs text-textlow hover:text-theme">
                      {label.genres.join(', ')}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex w-3/12 flex-col items-center gap-2">
              <div>
                <h1 className="py-4 text-2xl">Our Pick</h1>
              </div>
              <Image
                width={180}
                height={180}
                alt="Yo"
                src="/images/product-placeholder.webp"
                className="aspect-square cursor-pointer border object-cover"
              />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni
                a at asperiores illo, dicta, ex, earum praesentium nihil animi
                nulla eum amet natus velit inventore et in voluptatum?
                Perspiciatis, deserunt.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
