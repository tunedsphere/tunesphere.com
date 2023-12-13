"use client"

import * as React from "react";

import { AlbumsGrid } from "@/components/grid/albums-grid";

import { useMusicContext } from "@/components/grid/music-context"
export default function AlbumsPage() {

  const { selectedYear, selectedCountry, selectedGenre } = useMusicContext();
 

  return (
 <>
        <AlbumsGrid 
            selectedGenre={selectedGenre || null} // Pass the selectedGenre prop
            selectedYear={selectedYear || null}   // Pass the selectedYear prop
            selectedCountry={selectedCountry|| null}/>
            </>
  );
}
