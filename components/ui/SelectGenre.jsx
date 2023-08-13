"use client"

import "@/styles/globals.css"

import React from "react"
import { recordLabels } from "@/public/data.js"

const SelectGenre = ({ selectedGenre, onGenreChange }) => {
  const handleGenreChange = (e) => {
    onGenreChange(e.target.value)
  }

  return (
    <div className="relative flex">
      <div className="absolute -inset-1 -z-10 rounded-lg bg-theme opacity-50 blur"></div>
      <select
        className="h-10 items-center justify-between rounded-md border bg-background px-3 py-2 font-bold text-theme ring-offset-background focus:outline-none focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={selectedGenre || ""}
        onChange={handleGenreChange}
      >
        <option className="bg-accent-1 font-normal text-theme" value="">
          Genre
        </option>

        {Array.from(
          new Set(recordLabels.flatMap((recordLabel) => recordLabel.genres))
        ).map((genre) => (
          <option
            className="divide-y divide-y-reverse bg-accent-1 font-normal"
            key={genre}
            value={genre}
          >
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectGenre
