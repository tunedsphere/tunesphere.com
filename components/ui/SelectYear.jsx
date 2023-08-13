"use client"

import "@/styles/globals.css"

import React from "react"
import { recordLabels } from "@/public/data.js"

const SelectYear = ({ selectedYear, onYearChange }) => {
  const handleYearChange = (e) => {
    onYearChange(e.target.value)
  }

  return (
    <div className="relative flex">
      <div className="absolute -inset-1 -z-10 rounded-lg bg-theme opacity-50 blur"></div>
      <select
        className="h-10 cursor-pointer items-center justify-between space-x-5 rounded-md border border-input bg-background px-3 py-2 font-bold text-primary  ring-offset-background focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={selectedYear || ""}
        onChange={handleYearChange}
      >
        <option className="bg-accent-1" value="">
          Year
        </option>
        {Array.from(
          new Set(
            recordLabels.flatMap((recordLabel) => recordLabel.founding_year)
          )
        ).map((year) => (
          <option className="bg-accent-1" key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectYear
