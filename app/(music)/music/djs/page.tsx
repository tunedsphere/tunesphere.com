"use client"
import "@/styles/globals.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { recordLabelsData } from "@/public/recordLabelsData.js";
import { DjsGrid } from "@/components/grid/djs-grid";
import { useMusicContext } from "@/components/grid/music-context"


export default function DjsPage() {

  const { selectedYear, selectedCountry, selectedGenre } = useMusicContext();
 

  return (
 <>
        <DjsGrid 
            selectedGenre={selectedGenre || null} // Pass the selectedGenre prop
            selectedYear={selectedYear || null}   // Pass the selectedYear prop
            selectedCountry={selectedCountry|| null}/>
            </>
  );
}
