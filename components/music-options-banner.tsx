"use client";

import React from "react";

interface MusicOptionsBannerProps {
  selectedGenre: string | null;
  selectedYear: string | null;
  selectedCountry: string | null;
  currentTab: string;
}

export function MusicOptionsBanner({
  selectedYear,
  selectedGenre,
  selectedCountry,
  currentTab,
}: MusicOptionsBannerProps) {
  const isOptionsSelected = selectedYear || selectedCountry || selectedGenre;
  return (
    <>
      {currentTab !== "Home" && (
        <div className="w-full flex font-bold h-24 align-middle sticky ">
          <div className="absolute inset-0 -z-10 h-36 bg-gradient-to-b from-primary/20 via-transparent to-transparent"></div>

          {isOptionsSelected ? (
            <div className="flex items-center w-full border-b border-muted px-4 md:px-12">
              <div className="py-2 text-foreground text-4xl">
                {(
                  [selectedGenre, selectedYear, selectedCountry].filter(
                    Boolean
                  ) as string[]
                ).join(" • ")}
              </div>
            </div>
          ) : (
            <div className="flex align-middle items-center w-full border-b border-muted px-4 md:px-12">
              <div className="py-2 text-foreground text-4xl">
                Explore all : {currentTab}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
