"use client"
import "@/styles/globals.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { recordLabelsData } from "@/public/recordLabelsData.js";

import { Sidebar } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import MusicSidebarMenuBurger from "@/components/menuburgers/music-sidebar-menu-burger";
import { MusicTabs } from "@/components/pagers/music-tabs";
import { LabelsGrid } from "@/components/grid/labels-grid";
import { AlbumsGrid } from "@/components/grid/albums-grid";
import { DjsGrid } from "@/components/grid/djs-grid";
import { ArtistsGrid } from "@/components/grid/artists-grid";
import { MusicSearchBar } from "@/components/searchs/music-search-bar";
import { Separator } from "@/components/ui/separator";
import { HomeGrid } from "@/components/grid/home-grid";
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
