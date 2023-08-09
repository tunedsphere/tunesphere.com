"use client"

import "@styles/globals.css"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { recordLabels } from "@public/data.js"

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
  const [selectedLabel, setSelectedLabel] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const expandedLabelRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
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
  const handleLabelClick = (labelIndex) => {
    setSelectedLabel((prevSelectedLabel) =>
      prevSelectedLabel === labelIndex ? null : labelIndex
    )
  }
  const yearOptions = Array.from(
    new Set(recordLabels.flatMap((label) => label.founding_year))
  )
  const handleYearSelection = (year) => {
    if (year === selectedYear) {
      // If the same year is selected, reset the filter
      setSelectedYear(null)
    } else {
      setSelectedYear(year)
    }
  }

  const genreOptions = Array.from(
    new Set(recordLabels.flatMap((label) => label.genres))
  )
  const handleGenreSelection = (genre) => {
    if (genre === selectedGenre) {
      // If the same genre is selected, reset the filter
      setSelectedGenre(null)
    } else {
      setSelectedGenre(genre)
    }
  }
  const countryOptions = Array.from(
    new Set(recordLabels.flatMap((label) => label.country))
  )
  const handleCountrySelection = (country) => {
    if (country === selectedCountry) {
      // If the same country is selected, reset the filter
      setSelectedCountry(null)
    } else {
      setSelectedCountry(country)
    }
  }

  // Filter and sort the record labels based on selected filters
  const sortedAndFilteredLabels = recordLabels
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
    const handleOutsideClick = (event) => {
      if (
        selectedLabel !== null &&
        !event.target.closest(".expanded-label-container")
      ) {
        setSelectedLabel(null)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setSelectedLabel(null)
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

  const handleResize = (e) => {
    setColumnWidth(e.target.offsetWidth)
  }

  return (
    <section className="mt-[var(--headerHeight)]">
      <div className="">
        <div className=" relative mx-auto flex w-full items-center justify-center">
          <div className="inset-x-0 mx-auto flex justify-center gap-2 overflow-x-hidden px-4 py-2 sm:py-4 md:gap-6">
            <Button className="px-1 text-texthigh hover:text-theme-500 sm:px-4" variant="outline">
              Albums
            </Button>
            <Button className="px-1 text-texthigh hover:text-theme-500 sm:px-4" variant="outline">
              Artists
            </Button>
            <Button className="px-1 text-texthigh hover:text-theme-500 sm:px-4" variant="outline">
              Djs
            </Button>
            <Button className="px-1 text-texthigh hover:text-theme-500 sm:px-4" variant="outline">
              Labels
            </Button>
          </div>
        </div>
        <div className="flex">
          <Sidebar
            variant="musicgrid"
            className={`sidebar  ${
              isSidebarOpen
                ? "sidebar-open w-52 xl:w-64"
                : "hidden-sidebar w-[68px] xl:w-24"
            }`}
          >
            <div
              className={`flex border-b-2 border-accent-4 py-2 ${
                isSidebarOpen ? "flex-row-reverse" : "justify-center"
              }`}
            >
              <MusicSidebarMenuBurger
                isOpen={isSidebarOpen}
                handleSidebarToggle={handleSidebarClick}
                setIsOpen={setIsSidebarOpen}
              />
            </div>
            {/* // Sort the genreOptions */}
            <div className="middle-sidebar py-2">
              {/* // Sort the CountryOptions */}
              <div className="@container">
                <Collapsible>
                  <CollapsibleTrigger
                    onClick={handleGenreToggle}
                    className={`flex w-full items-center justify-center py-2 text-xl text-texthigh ${
                      genreExpanded ? "" : ""
                    }`}
                  >
                    <div
                      onClick={handleSidebarClick}
                      className={`w-full justify-center ${
                        isSidebarOpen ? "hidden" : "flex "
                      }`}
                    >
                      <Icons.flower />
                    </div>

                    <div
                      className={`items-center ${
                        isSidebarOpen ? "w-full p-4" : "hidden "
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">
                          <Icons.flower />
                        </span>
                        <span>Genres</span>
                        <div className="w-full">
                          <span className="float-right">
                            {genreExpanded ? "-" : "+"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  {genreExpanded && (
                    <CollapsibleContent
                      className={`${isSidebarOpen ? "w-full" : "hidden"}`}
                    >
                      <div>
                        {genreOptions
                          .sort((a, b) => a.localeCompare(b)) // Sort the genreOptions array alphabetically
                          .map((genre) => (
                            <div
                              key={genre}
                              className={`cursor-pointer py-2 pl-8 text-lg font-normal ${
                                genre === selectedGenre ? " text-texthigh" : ""
                              }`}
                              onClick={() => handleGenreSelection(genre)}
                            >
                              {genre}
                            </div>
                          ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </div>

              {/* // Sort the CountryOptions */}
              <div className="@container">
                <Collapsible>
                  <CollapsibleTrigger
                    onClick={handleCountryToggle}
                    className={`flex w-full items-center justify-center py-2 text-xl text-texthigh ${
                      genreExpanded ? "" : ""
                    }`}
                  >
                    <div
                      onClick={handleSidebarClick}
                      className={`w-full justify-center py-2 ${
                        isSidebarOpen ? "hidden" : "flex"
                      }`}
                    >
                      <Icons.globe />
                    </div>

                    <div
                      className={`items-center ${
                        isSidebarOpen ? "w-full p-4" : "hidden "
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">
                          <Icons.globe />
                        </span>
                        <span>Countries</span>
                        <div className="w-full">
                          <span className="float-right">
                            {genreExpanded ? "-" : "+"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  {countryExpanded && (
                    <CollapsibleContent
                      className={`${isSidebarOpen ? "w-full" : "hidden"}`}
                    >
                      <div>
                        {countryOptions
                          .sort((a, b) => a.localeCompare(b)) // Sort the countryOptions array in descending order
                          .map((country) => (
                            <div
                              key={country}
                              className={`cursor-pointer py-2 pl-8 text-lg font-normal ${
                                country === selectedCountry
                                  ? "text-texthigh"
                                  : ""
                              }`}
                              onClick={() => handleCountrySelection(country)}
                            >
                              {country}
                            </div>
                          ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </div>

              {/* // Sort the YearOptions */}
              <div className="@container">
                <Collapsible>
                  <CollapsibleTrigger
                    onClick={handleYearToggle}
                    className={`flex w-full content-center items-center justify-center py-2 text-center text-xl text-texthigh ${
                      genreExpanded ? "" : ""
                    }`}
                  >
                    <div
                      onClick={handleSidebarClick}
                      className={`w-full ${
                        isSidebarOpen ? "hidden" : "flex justify-center"
                      }`}
                    >
                      <Icons.listMusic />
                    </div>

                    <div
                      className={`items-center ${
                        isSidebarOpen ? "w-full p-4" : "hidden"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">
                          <Icons.listMusic />
                        </span>
                        <span>Year</span>
                        <div className="w-full">
                          <span className="float-right">
                            {genreExpanded ? "-" : "+"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  {yearExpanded && (
                    <CollapsibleContent
                      className={`${isSidebarOpen ? "w-full" : "hidden"}`}
                    >
                      <div>
                        {yearOptions
                          .sort((a, b) => b.localeCompare(a)) // Sort the yearOptions array in descending order
                          .map((year) => (
                            <div
                              key={year}
                              className={`cursor-pointer py-2 pl-8 text-lg font-normal ${
                                year === selectedYear ? "text-texthigh" : ""
                              }`}
                              onClick={() => handleYearSelection(year)}
                            >
                              {year}
                            </div>
                          ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </div>
            </div>
          </Sidebar>
          <div
            id="GridMusicView"
            className="grow border-2 border-accent-4 @container"
          >
            <div
              id="MusicGridBanner"
              className="relative z-10 ml-4 flex min-h-[--music-grid-banner-height-mobile] w-full justify-center border-b-2 border-accent-4 bg-transparent sm:ml-12 sm:min-h-[--music-grid-banner-height]"
            >
              <div className="absolute inset-x-0 bottom-2 w-full items-center ">
                <h3 className="text-2xl font-semibold text-texthigh sm:text-3xl md:text-4xl">
                  {selectedGenre ? `${selectedGenre} ` : "ALL Genres"}
                </h3>
                <div className="flex gap-1">
                  <h5 className="text-base text-textlow sm:text-xl md:text-3xl">
                    {selectedCountry ? `${selectedCountry}, ` : ""}
                  </h5>
                  <h5 className="text-textlow ">{selectedYear}</h5>
                </div>
              </div>
            </div>
            <div
              id="GridMusicView"
              className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-accent-4 p-4 @container sm:pl-12"
            >
              <div className="grid grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9 @5xl:grid-cols-10 @6xl:grid-cols-12">
                {sortedAndFilteredLabels.map((label, index) => (
                  <React.Fragment key={index}>
                    <div
                      key={label.id}
                      className={`cursor-pointer items-center justify-center text-center ${
                        selectedLabel === index ? "" : ""
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
                      <h3 className="mb-2 cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-xl">
                        {label.name}
                      </h3>
                      <p className="cursor-pointer text-xs text-textlow hover:text-theme">
                        {label.genres.join(", ")}
                      </p>
                    </div>
                    {selectedLabel === index && (
                      <div
                        ref={expandedLabelRef}
                        className="col-span-full mt-4 hidden border-spacing-2 border-y-2 bg-accent py-8 @container  @xs:block"
                      >

                        <div className="grid gap-4 @xs:grid-cols-2 @xs:grid-rows-1 @md:grid-cols-3 @md:grid-rows-1 @2xl:grid-flow-col @2xl:grid-rows-2 @3xl:grid-rows-2">
                          <div className=" flex justify-center border-r-2 border-accent-5 pr-8 @xs:row-start-1 @xs:row-end-1 @2xl:row-span-3 @3xl:row-span-2">
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
                              <h3 className="cursor-pointer text-lg font-bold text-texthigh underline hover:text-theme">
                                {label.name}
                              </h3>
                            </Link>
                            <p className="text-textlow">
                              Location: {label.location}
                            </p>
                            <p className="text-textlow">
                              Founding Year: {label.founding_year}
                            </p>
                            <p className="text-textlow">
                              Main Genre: {label.genre}
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
