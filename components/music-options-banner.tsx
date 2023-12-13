"use client";

import React from "react";

interface MusicOptionsBannerProps {
  selectedGenre: string | null; // Define the type of selectedGenre
  selectedYear: string | null; // Define the type of selectedYear
  selectedCountry: string | null;
}

export function MusicOptionsBanner({
  selectedYear,
  selectedGenre,
  selectedCountry,
}: MusicOptionsBannerProps) {
  return (
    <div className="">
      {(selectedYear || selectedCountry || selectedGenre) && (
        <div className="w-full flex font-bold h-24 align-middle px-8">
          <div className="absolute inset-0 -z-10 h-36 bg-gradient-to-b from-primary/20 via-transparent to-transparent"></div>
          <div className="flex align-middle items-center w-full border-b border-muted">
            <div className="py-2 px-4 text-foreground text-4xl">
              {selectedGenre}
            </div>
            <div className="py-2 px-4 text-foreground text-2xl">
              {selectedYear}
            </div>
            <div className="py-2 px-4 text-foreground text-2xl">
              {selectedCountry}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
