"use client"

import "@/styles/globals.css"

import * as React from "react"
import { recordLabels } from "@/public/data.js"

interface SelectCountryProps {
  selectedCountry: string | null
  onCountryChange: (country: string | null) => void
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(e.target.value)
  }

  return (
    <div className="relative flex">
      <div className="absolute -inset-1 -z-10 rounded-lg bg-theme opacity-50 blur"></div>
      <select
        className="h-10 cursor-pointer items-center justify-between space-x-5 rounded-md border border-input bg-background px-3 py-2 font-bold ring-offset-background focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option className="bg-accent-1" value="">
          Country
        </option>
        {Array.from(
          new Set(recordLabels.flatMap((recordLabel) => recordLabel.country))
        ).map((country) => (
          <option
            className="bg-accent-1 font-normal"
            key={country}
            value={country}
          >
            {country}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectCountry
