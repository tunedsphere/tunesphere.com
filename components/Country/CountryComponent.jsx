"use client"

import "@/styles/globals.css"

import React, { useState } from "react"
import { Country } from "country-state-city"
import countriesData from "country-state-city/lib/assets/country.json"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CountryComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const countries = countriesData

  const handleChange = (e) => {
    setSelectedCountry(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setSearchResults(filteredCountries)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Selected country:", selectedCountry)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <div className="mb-4">
        <label
          htmlFor="country"
          className="mb-2 block font-medium text-gray-700"
        >
          Select Country
        </label>
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        <select
          id="country"
          name="country"
          value={selectedCountry}
          onChange={handleChange}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">-- Select a country --</option>
          {searchTerm
            ? searchResults.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))
            : countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  )
}

export default CountryComponent
