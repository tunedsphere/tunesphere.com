"use client"

import "@styles/globals.css"

import * as React from "react"
import { useEffect, useState } from "react"
import { genres } from "@/constants/genres.js"
import { recordLabels } from "@/public/data.js"
import { Icons } from "@components/icons"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const NewReleasesSection: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)

  // Update the number of items per page based on the screen size
  const handleResize = () => {
    const screenWidth = window.innerWidth
    if (screenWidth >= 20 * 16) {
      setItemsPerPage(2)
    } else if (screenWidth >= 24 * 16) {
      setItemsPerPage(3)
    } else if (screenWidth >= 28 * 16) {
      setItemsPerPage(4)
    } else if (screenWidth >= 32 * 16) {
      setItemsPerPage(5)
    } else if (screenWidth >= 36 * 16) {
      setItemsPerPage(6)
    } else if (screenWidth >= 42 * 16) {
      setItemsPerPage(7)
    } else if (screenWidth >= 48 * 16) {
      setItemsPerPage(8)
    } else if (screenWidth >= 56 * 16) {
      setItemsPerPage(9)
    } else {
      setItemsPerPage(2) // Fallback value
    }
  }

  // Add event listener to handle window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Call the resize handler initially
  useEffect(() => {
    handleResize()
  }, [])

  // Calculate start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, recordLabels.length)

  // Get the labels for the current page
  const currentLabels = recordLabels.slice(startIndex, endIndex)
  const [selectedLabel, setSelectedLabel] = useState(null)

  // Function to handle previous page button click
  const previousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  // Function to handle next page button click
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    // Set the initially selected label to the first item in the list
    setSelectedLabel(recordLabels[0])
  }, [])

  return (
    <section id="NewReleases">
      <div className="py-12 ">
        <h3 className="py-4 text-center font-extrabold md:text-4xl">
          <span className="justify-center bg-theme-600 bg-clip-text text-transparent">
            NEW{" "}
          </span>
          <span className="justify-center bg-theme from-texthigh bg-clip-text text-transparent">
            RELEASES
          </span>
        </h3>
        <p className="text-center text-lg font-normal text-textlow lg:text-xl">
          The latest releases on TunedSphere
        </p>
      </div>
      <div className="relative inset-0 w-full bg-theme-900">
        <div className="absolute -inset-1  -z-10 rounded-lg bg-gradient-to-r from-theme to-theme-900 blur"></div>
        <div className="flex justify-center divide-x overflow-x-auto text-sm">
          {/* Left arrow icon */}
          <div className="align-center flex items-center">
            <Icons.chevronLeft className="cursor-pointer p-2 text-texthigh" />
          </div>
          {genres.map((item, index) => (
            <div
              className="align-center flex items-center"
              key={`genre-${index}`}
            >
              <a
                href={item.href}
                className="group cursor-pointer rounded-lg border border-transparent p-2 text-center text-texthigh decoration-theme underline-offset-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30 hover:underline group-hover:translate-x-1 motion-reduce:transform-none"
                style={{ float: "left" }}
              >
                {item.title}
              </a>
              <Separator orientation="vertical" />
            </div>
          ))}
          {/* Right arrow icon */}
          <div className="align-center flex items-center">
            <Icons.chevronRight className="cursor-pointer p-2 text-texthigh" />
          </div>
        </div>
      </div>

      <div className="flex max-w-[1600px]">
        <div className="scrollable-container w-full grow overflow-y-scroll border-2 border-accent-4 p-6 @container">
          <div className="grid grid-flow-col-dense gap-2 p-4 py-12 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9">
            {selectedLabel && (
              <div className="top-0 col-span-2 row-span-2">
                <img
                  src={selectedLabel.image}
                  alt={selectedLabel.name}
                  className="object-contain object-center"
                />
                <h2 className="mt-4 text-sm font-semibold md:text-xl">
                  {selectedLabel.name}
                </h2>
                <p className="mt-2 text-gray-600">
                  {selectedLabel.genres.join(", ")}
                </p>
              </div>
            )}

            {currentLabels.map((label) => (
              <div
                key={label.id}
                onClick={() => setSelectedLabel(label)}
                className="rounded-lg bg-accent-1 p-4 shadow-lg"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={label.image}
                    alt={label.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h2 className="py-2 text-xs font-bold md:text-xl">
                  {label.name}
                </h2>
                <p className="text-xs text-gray-600 md:text-sm">
                  {label.genres.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 md:mt-4 md:gap-6 md:py-4">
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 1}
            className="bg-- h-6 px-1 py-1 text-xs text-texthigh hover:bg-accent-3 md:px-3 md:py-1 md:text-sm"
          >
            <Icons.chevronLeft />{" "}
            {/* Replace Icons.Left with the appropriate icon component or SVG */}
          </Button>
          <div className="flex justify-center gap-2">
            {/* Display page numbers */}
            {Array.from(
              {
                length: Math.min(
                  Math.ceil(recordLabels.length / itemsPerPage),
                  5
                ), // Limit to 5 pages
              },
              (_, i) => i + 1 + Math.max(currentPage - 3, 0) // Adjust page numbers based on current page
            ).map((page) => (
              <Button
                variant="outline"
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-6 rounded-md px-2 py-1 text-xs font-medium text-texthigh hover:bg-accent-3 hover:text-texthigh md:px-3 md:py-1 md:text-sm ${
                  page === currentPage
                    ? "bg-theme-900 text-texthigh hover:bg-theme"
                    : "text-textlow"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={
              endIndex >= recordLabels.length ||
              Math.ceil(recordLabels.length / itemsPerPage) <= currentPage
            }
            className="h-6 bg-accent-2 px-1 py-1 text-xs text-texthigh hover:bg-accent-3 md:px-3 md:py-1 md:text-sm"
          >
            <Icons.chevronRight className="text-xs" />{" "}
            {/* Replace Icons.Right with the appropriate icon component or SVG */}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewReleasesSection
