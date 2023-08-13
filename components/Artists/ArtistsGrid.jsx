"use client"

import "@/styles/globals.css"

import React, { useState } from "react"
import Link from "next/link"
import { recordLabels } from "@/public/data.js"

import { Button } from "@/components/ui/button"
import SelectCountry from "@/components/ui/SelectCountry"
import SelectGenre from "@/components/ui/SelectGenre"
import SelectYear from "@/components/ui/SelectYear"

const ArtistsGrid = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [numColumns, setNumColumns] = useState(10) // Number of columns in the grid

  const handleItemClick = (label) => {
    setSelectedItem(label)
  }

  const filterByGenre = (label) => {
    if (!selectedGenre) return true
    return label.genres.includes(selectedGenre)
  }

  const filterByYear = (label) => {
    if (!selectedYear) return true
    return label.founding_year.includes(selectedYear)
  }

  const filterByCountry = (label) => {
    if (!selectedCountry) return true
    return label.country.includes(selectedCountry)
  }

  const renderItems = () => {
    const filteredItems = recordLabels.filter(
      (label) =>
        filterByGenre(label) && filterByYear(label) && filterByCountry(label)
    )

    const selectedIndex = filteredItems.indexOf(selectedItem)
    const selectedRow = Math.floor(selectedIndex / numColumns) + 1
    const expandedGridRow = selectedRow + 1

    const gridItems = filteredItems.map((label, index) => {
      return (
        <div className="">
          <div
            key={label.id}
            className={`cursor-pointer items-center justify-center rounded-lg text-center shadow-md ${
              selectedItem === label
                ? " grid-items rounded-lg text-center shadow-md"
                : ""
            }`}
            onClick={() => handleItemClick(label)}
          >
            <img
              src={label.image}
              alt={label.name}
              className=" my-4 cursor-pointer rounded-full border-4"
            />

            <h3 className="mb-2 cursor-pointer text-xl font-bold text-texthigh hover:text-theme">
              {label.name}
            </h3>
            <p className="cursor-pointer text-textlow hover:text-theme">
              {label.genres.join(", ")}
            </p>
          </div>
        </div>
      )
    })

    if (selectedItem) {
      gridItems.splice(
        selectedIndex + 1,
        0,
        <div
          key="expanded"
          className={`border-spacing-2 border-b-2 border-t-2 bg-accent p-4 py-8 @container ${
            selectedItem ? "hidden @xs:block" : ""
          }`}
          id="expanded"
          style={{ gridColumn: "1 / -1", gridRow: expandedGridRow }}
        >
          <div className="grid gap-4 @xs:grid-cols-2 @xs:grid-rows-1 @md:grid-cols-3 @md:grid-rows-1 @2xl:grid-flow-col @2xl:grid-rows-2 @3xl:grid-rows-3 ">
            <div className="  to-bg-background absolute -inset-1.5 -z-10 rounded-lg bg-gradient-to-r from-theme opacity-50 blur"></div>
            <div className="border-r-2 border-accent-5 pr-8 @xs:row-start-1 @xs:row-end-1 @2xl:row-span-3">
              <Link href={`label/${selectedItem.id}`}>
                <img src={selectedItem.image} className="cursor-pointer" />
              </Link>
            </div>
            <div className="col-span-2 items-center pl-6">
              <Link href={`label/${selectedItem.id}`}>
                <h3 className="cursor-pointer text-lg font-bold text-texthigh underline hover:text-theme">
                  {selectedItem.name}
                </h3>
              </Link>
              <p className="text-textlow">Location: {selectedItem.location}</p>
              <p className="text-textlow">
                Founding Year: {selectedItem.founding_year}
              </p>
              <p className="text-textlow">Main Genre: {selectedItem.genre}</p>
            </div>
            <div className="w-5/6 pl-6 @xs:col-span-3">
              <p>
                <strong className="text-lg text-texthigh underline">
                  Description:
                </strong>
              </p>
              <p className="text-textlow">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )
    }

    return gridItems
  }

  return (
    <div className="mx-auto max-w-[1600px] p-4 py-8">
      <aside className="lg\:\[--scroll-mt\:6\.3125rem\] fixed w-72 overflow-y-auto ">
        <nav className="relative table  pr-6">
          <SelectGenre
            className="sticky top-0 "
            selectedGenre={selectedGenre}
            onGenreChange={(genre) => setSelectedGenre(genre)}
          />
          <SelectYear
            className="sticky top-0"
            selectedYear={selectedYear}
            onYearChange={(year) => setSelectedYear(year)}
          />
          <SelectCountry
            className="sticky top-0"
            selectedCountry={selectedCountry}
            onCountryChange={(country) => setSelectedCountry(country)}
          />
          <Button variant="outline"> By Year</Button>
        </nav>
      </aside>
      <div className={`@grid @grid-row pl-72 @container`}>
        <div className="grid grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9 @5xl:grid-cols-10">
          {renderItems()}
        </div>
      </div>
    </div>
  )
}

export default ArtistsGrid
