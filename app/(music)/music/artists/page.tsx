"use client"
import "@/styles/globals.css";
import * as React from "react";
import { useState } from "react";

import { ArtistsGrid } from "@/components/grid/artists-grid";
import { useMusicContext } from "@/components/grid/music-context"

interface ArtistsPageProps {
}

export default function ArtistsPage({} : ArtistsPageProps) {
  const [selectedTab, setSelectedTab] = useState("Home");

  const { selectedYear, selectedCountry, selectedGenre } = useMusicContext();

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // New state for search bar visibility

  // Other code...

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };


  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState<string | null>(null);

  const handleToggleContent = (content: string) => {
    setActiveContent(activeContent === content ? null : content);
  };
  // Function to handle the showing and hiding of content



  return (
 <>
        <ArtistsGrid
            selectedGenre={selectedGenre || null} // Pass the selectedGenre prop
            selectedYear={selectedYear || null}   // Pass the selectedYear prop
            selectedCountry={selectedCountry|| null}/>
            </>
  );
}
