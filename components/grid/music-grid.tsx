"use client"

import "@/styles/globals.css"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { recordLabelsData } from '@/public/recordLabelsData';
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Sidebar } from "@/components/ui/sidebar"
import { Icons } from "@/components/icons"
import MusicSidebarMenuBurger from "@/components/menuburgers/music-sidebar-menu-burger"

const MusicGrid: React.FC = () => {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const expandedLabelRef = useRef(null)

  const [genreExpanded, setGenreExpanded] = useState(false)
  const [yearExpanded, setYearExpanded] = useState(false)
  const [countryExpanded, setCountryExpanded] = useState(false)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleGenreToggle = () => {
    setGenreExpanded(!genreExpanded)
  }

  const handleYearToggle = () => {
    setYearExpanded(!yearExpanded)
  }

  const handleCountryToggle = () => {
    setCountryExpanded(!countryExpanded)
  }
  const handleLabelClick = (labelIndex: number) => {
    setSelectedLabel((prevSelectedLabel) =>
      prevSelectedLabel === labelIndex.toString() ? null : labelIndex.toString()
    );
  }
  const yearOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.founding_year))
  )
  const handleYearSelection = (year: string) => {
    if (year === selectedYear) {
      // If the same year is selected, reset the filter
      setSelectedYear(null)
    } else {
      setSelectedYear(year)
    }
  }

  const genreOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.genres))
  )
  const handleGenreSelection = (genre: string) => {
    if (genre === selectedGenre) {
      // If the same genre is selected, reset the filter
      setSelectedGenre(null)
    } else {
      setSelectedGenre(genre)
    }
  }
  const countryOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.country))
  )
  const handleCountrySelection = (country: string) => {
    if (country === selectedCountry) {
      // If the same country is selected, reset the filter
      setSelectedCountry(null)
    } else {
      setSelectedCountry(country)
    }
  }

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
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (
            selectedLabel !== null &&
            event.target instanceof Element &&
            event.target.closest(".expanded-label-container")
          ) {
            // Inside the expanded label container, do nothing
            return;
          }
          
          setSelectedLabel(null);
        }
      
        const handleEscapeKey = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            setSelectedLabel(null);
          }
        }
      

    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("click", handleOutsideClick)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [selectedLabel])
  const initialColumnWidth = 200 // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth)

  const handleResize = (e: React.SyntheticEvent) => {
    setColumnWidth((e.target as HTMLDivElement).offsetWidth);
  }

  return (
    <section className="">
      <div className="">
        <div className="flex">
          <div
            id="GridMusicView"
            className="grow border-2 border-muted @container"
          >
            <div
              id="MusicGridBanner"
              className="relative z-10 ml-4 flex min-h-[--music-grid-banner-height-mobile] w-full justify-center border-b-2 border-muted bg-transparent sm:ml-12 sm:min-h-[--music-grid-banner-height]"
            >
              <div className="absolute inset-x-0 bottom-2 w-full items-center ">
                <h1 className="text-2xl font-semibold text-texthigh sm:text-3xl md:text-4xl">
                  {selectedGenre ? `${selectedGenre} ` : "ALL Genres"}
                </h1>
                <div className="flex gap-1">
                  <h2 className="text-base text-textlow sm:text-xl md:text-3xl">
                    {selectedCountry ? `${selectedCountry}, ` : ""}
                  </h2>
                  <h5 className="text-textlow ">{selectedYear}</h5>
                </div>
              </div>
            </div>
            <div
              id="GridMusicView"
              className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted p-4 @container sm:pl-12"
            >
              <div className="grid grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9 @5xl:grid-cols-10 @6xl:grid-cols-12">
                {sortedAndFilteredLabels.map((label, index) => (
                  <React.Fragment key={index}>
                    <div
                      key={label.id}
                      className={`cursor-pointer items-center justify-center text-center ${
                        selectedLabel === index.toString() ? "" : ""
                      }`}
                      onClick={() => handleLabelClick(index)}
                    >
                      <Image
                        width={400}
                        height={400}
                        src={label.image}
                        alt={label.name}
                        className="my-4 cursor-pointer rounded-full border-4">
                        </Image>
                      <h1 className="mb-2 cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-xl">
                        {label.name}
                      </h1>
                      <p className="cursor-pointer text-xs text-textlow hover:text-theme">
                        {label.genres.join(", ")}
                      </p>
                    </div>
                    {String(selectedLabel) === String(index) && (
                      <div
                        ref={expandedLabelRef}
                        className="col-span-full mt-4 hidden border-spacing-2 border-y-2 bg-accent py-8 @container  @xs:block"
                      >

                        <div className="grid gap-4 @xs:grid-cols-2 @xs:grid-rows-1 @md:grid-cols-3 @md:grid-rows-1 @2xl:grid-flow-col @2xl:grid-rows-2 @3xl:grid-rows-2">
                          <div className=" flex justify-center border-r-2 border-muted pr-8 @xs:row-start-1 @xs:row-end-1 @2xl:row-span-3 @3xl:row-span-2">
                            <Link href={`label/${label.id}`} className="">
                              <Image
                                src={label.image}
                                width={380}
                                height={380}
                                alt={label.id}
                                className="cursor-pointer object-contain"
                              />
                            </Link>
                          </div>
                          <div className="col-span-2 items-center">
                            <Link href={`label/${label.id}`}>
                              <h1 className="cursor-pointer text-lg font-bold text-texthigh underline hover:text-theme">
                                {label.name}
                              </h1>
                            </Link>
                            <p className="text-textlow">
                              Location: {label.country}
                            </p>
                            <p className="text-textlow">
                              Founding Year: {label.founding_year}
                            </p>
                            <p className="text-textlow">
                              Main Genre: {label.genres}
                            </p>
                          </div>
                          <div className="w-5/6 @xs:col-span-3">
                            <p>
                              <strong className="text-lg text-texthigh underline">
                                Description:
                              </strong>
                            </p>
                            <p className="text-textlow">{label.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MusicGrid