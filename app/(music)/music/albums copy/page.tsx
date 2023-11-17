"use client"
import "@/styles/globals.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react"
import { recordLabelsData } from "@/public/recordLabelsData.js"
import { AlbumsGrid } from "@/components/grid/albums-grid"



export default function AlbumsPage() {
  const [selectedTab, setSelectedTab] = useState("Home");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedGenre(null); // Reset the Genre selection
    setSelectedYear(null);  // Reset the Year selection
    setSelectedCountry(null); // Reset the Country selection
  };
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // New state for search bar visibility

  // Other code...

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState<string | null>(null);

  const handleToggleContent = (content: string) => {
    setActiveContent(activeContent === content ? null : content);
  };
  // Function to handle the showing and hiding of content

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsSearchBarVisible(false); 
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



  return (
 <>
        <AlbumsGrid 
            selectedGenre={selectedGenre} // Pass the selectedGenre prop
            selectedYear={selectedYear}   // Pass the selectedYear prop
            selectedCountry={selectedCountry}/>
            </>
  );
}
