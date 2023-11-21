"use client"

import "@/styles/globals.css"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { recordLabelsData } from '@/public/recordLabelsData';

import { Icons } from "@/components/icons"


interface DjsGridProps {
  selectedGenre: string | null; // Define the type of selectedGenre
  selectedYear: string | null; // Define the type of selectedYear
  selectedCountry: string | null;
}

export function DjsGrid({
selectedYear, 
selectedCountry,
selectedGenre, }: DjsGridProps) {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const expandedLabelRef = useRef(null)

  const handleLabelClick = (labelIndex: number) => {
    setSelectedLabel((prevSelectedLabel) =>
      prevSelectedLabel === labelIndex.toString() ? null : labelIndex.toString()
    );
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
        <>
            <div
              id="djs-grid"
              className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted pl-4 pt-2 pb-12 pr-8 @container sm:pl-12"
            >
              <div className="grid grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9">
                {sortedAndFilteredLabels.map((label, index) => (
                  <React.Fragment key={index}>
                    <div
                      key={label.id}
                      className={`relative cursor-pointer items-center justify-center text-center ${
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
                      <h1 className="cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-xl">
                        {label.name}
                      </h1>
                      <p className="cursor-pointer text-xs text-textlow hover:text-theme">
                        {label.genres.join(", ")}
                      </p>
                      {String(selectedLabel) === String(index) && (
    <div
      className="arrow-up absolute top-[96%] left-0 right-0 flex justify-center z-100 text-muted"
    >
      <Icons.chevronUp className="h-10 w-10"></Icons.chevronUp>
      
    </div>

  )}
                 {String(selectedLabel) === String(index) && (
    <div
      className="arrow-up absolute top-[98%] left-0 right-0 flex justify-center z-100 text-accent"
    >
      <Icons.chevronUp className="h-10 w-10"></Icons.chevronUp>     
    </div>
  )}
                    </div>
                    {String(selectedLabel) === String(index) && (
                      <div
                        ref={expandedLabelRef}
                        className="sm:-ml-12 -ml-4 -mr-12 col-span-full hidden border-spacing-2 border-y-2 border-muted bg-accent py-8 @container  @xs:block"
                      >

                        <div className="grid gap-4 @xs:grid-cols-2 @xs:grid-rows-1 @md:grid-cols-3 @md:grid-rows-1 @2xl:grid-flow-col @2xl:grid-rows-2 @3xl:grid-rows-2">
                          <div className=" flex justify-center border-r-2 border-muted @xs:row-start-1 @xs:row-end-1 @2xl:row-span-3 @3xl:row-span-2">
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
   </>
  )
}
