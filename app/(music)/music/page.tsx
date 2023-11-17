"use client"
import "@/styles/globals.css";
import * as React from "react";
import { useState } from "react";

import { HomeGrid } from "@/components/grid/home-grid";


export default function MusicLayoutPage() {
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


  return (
 <>
        <HomeGrid 
            selectedGenre={selectedGenre} // Pass the selectedGenre prop
            selectedYear={selectedYear}   // Pass the selectedYear prop
            selectedCountry={selectedCountry}/>
            </>
  );
}
