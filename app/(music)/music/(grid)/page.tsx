"use client";
import "@/styles/globals.css";
import * as React from "react";
import { useState } from "react";

import { HomeGrid } from "@/components/grid/home-grid";

export default function MusicLayoutPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <>
      <HomeGrid
        selectedGenre={selectedGenre} // Pass the selectedGenre prop
        selectedYear={selectedYear} // Pass the selectedYear prop
        selectedCountry={selectedCountry}
      />
    </>
  );
}
