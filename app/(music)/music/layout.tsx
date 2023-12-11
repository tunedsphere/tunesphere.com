"use client";
import "@/styles/globals.css";
import * as React from "react";
import { useState } from "react";
import { recordLabelsData } from "@/public/recordLabelsData.js";
import Link from "next/link";
import { Sidebar } from "@/components/ui/sidebar";
import { Icon } from "@/components/icon";
import MusicSidebarMenuBurger from "@/components/menuburgers/music-sidebar-menu-burger";
import { MusicTabs } from "@/components/pagers/music-tabs";
import { MusicSearchBar } from "@/components/searchs/music-search-bar";
import { Separator } from "@/components/ui/separator";

import { MusicProvider } from "@/components/grid/music-context";

interface MusicLayoutPageProps {
  children: React.ReactNode;
}

export default function MusicLayoutPage({ children }: MusicLayoutPageProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState("Home");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedGenre(null); // Reset the Genre selection
    setSelectedYear(null); // Reset the Year selection
    setSelectedCountry(null); // Reset the Country selection
  };
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

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchBarVisible(false);
  };

  const yearOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.founding_year))
  );
  const handleYearSelection = (year: string) => {
    if (year === selectedYear) {
      // If the same year is selected, reset the filter
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
    }
  };

  const genreOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.genres))
  );
  const handleGenreSelection = (genre: string) => {
    if (genre === selectedGenre) {
      // If the same genre is selected, reset the filter
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };
  const countryOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.country))
  );
  const handleCountrySelection = (country: string) => {
    if (country === selectedCountry) {
      // If the same country is selected, reset the filter
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  };

  return (
    <section className="mt-[var(--headerHeight)]">
      <div className="">
        <div className="relative mx-auto flex items-center justify-center">
          <div className="inset-x-0 mx-auto flex justify-center gap-2 overflow-x-hidden">
            <MusicTabs onTabChange={handleTabChange} />
          </div>
        </div>
        <div className="flex">
          <Sidebar
            id="music-sidebar"
            variant="musicgrid"
            className={`sidebar ${
              isSidebarOpen
                ? "sidebar-open overflow-y-auto"
                : "hidden-sidebar w-[68px]"
            }`}
          >
            <div
              className={`flex border-b border-muted py-2 ${
                isSidebarOpen ? "flex-row-reverse" : "justify-center"
              }`}
            >
              <MusicSidebarMenuBurger
                isOpen={isSidebarOpen}
                handleSidebarToggle={handleSidebarClick}
                setIsOpen={setIsSidebarOpen}
              />
            </div>
            <div className="pt-2 shrink-0">
              <Link
                href="/music"
                onClick={() => handleToggleContent("home")}
                className={`items-center text-xs md:text-sm text-texthigh hover:text-foreground hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 cursor-pointer ${
                  activeContent === "home" ? "" : ""
                }`}
              >
                <div
                  onClick={handleSidebarClick}
                  className={` ${
                    isSidebarOpen
                      ? "hidden"
                      : "py-2.5 flex justify-center hover:bg-cyan-500/20 dark:hover:bg-purple-500/20"
                  }`}
                >
                  <Icon name="home" className="h-5 w-5" />
                </div>
                <div
                  className={` ${
                    isSidebarOpen
                      ? "py-2 pl-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 flex items-center gap-2"
                      : "hidden "
                  }`}
                >
                  <span className="">
                    <Icon name="home" className="h-5 w-5" />
                  </span>
                  <span className="">Home</span>
                </div>
              </Link>

              <div
                onClick={toggleSearchBar}
                className="items-center text-xs md:text-sm text-texthigh hover:text-foreground cursor-pointer"
              >
                <div
                  onClick={handleSidebarClick}
                  className={` ${
                    isSidebarOpen
                      ? "hidden"
                      : "py-2.5 flex justify-center hover:bg-cyan-500/20 dark:hover:bg-purple-500/20"
                  }`}
                >
                  <Icon name="search" className="h-5 w-5" />
                </div>

                {isSearchBarVisible ? (
                  <div
                    className={`items-center ${
                      isSidebarOpen ? "px-4" : "hidden"
                    }`}
                  >
                    <div className="flex items-center">
                      <MusicSearchBar isSearchBarVisible={isSearchBarVisible} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={` ${
                      isSidebarOpen
                        ? "py-2 pl-4 flex items-center gap-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 "
                        : "hidden"
                    }`}
                  >
                    <div
                      onClick={toggleSearchBar}
                      className="flex items-center "
                    >
                      <span className="mr-2">
                        <Icon name="search" className="h-5 w-5" />
                      </span>
                      <span>Search</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex min-h-full h-full grow">
              <div
                id="music-sidebar-menu-triggers"
                className="middle-sidebar overflow-y-auto border-muted"
              >
                {isSidebarOpen ? (
                  <div className="pb-1 px-4 h-[24px] ml-1 items-center text-xs font-medium">
                    Melody Nexus
                  </div>
                ) : (
                  <div className="pb-1 px-4 h-[24px] ml-1"></div>
                )}
                <div
                  onClick={() => handleToggleContent("fresh-frequencies")}
                  className={`items-center text-xs md:text-sm text-texthigh hover:text-foreground cursor-pointer ${
                    activeContent === "fresh-frenquencies"
                      ? "bg-cyan-300 dark:bg-purple-800/50 "
                      : ""
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={` ${
                      isSidebarOpen
                        ? "hidden"
                        : "p-2 flex justify-center hover:bg-cyan-500/20 dark:hover:bg-purple-500/20"
                    }`}
                  >
                    <Icon name="rocket" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? "py-2 px-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 flex items-center gap-2"
                        : "hidden "
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Icon name="rocket" className="h-5 w-5" />
                      </span>
                      <span>Fresh frequencies</span>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleToggleContent("genre")}
                  className={`items-center text-xs md:text-sm text-texthigh hover:text-foreground cursor-pointer ${
                    activeContent === "genre"
                      ? "bg-cyan-300 dark:bg-purple-800/50 "
                      : ""
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={` ${
                      isSidebarOpen
                        ? "hidden"
                        : "p-2 flex justify-center hover:bg-cyan-500/20 dark:hover:bg-purple-500/20"
                    }`}
                  >
                    <Icon name="flower" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? "py-2 px-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 flex items-center gap-2"
                        : "hidden "
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Icon name="flower" className="h-5 w-5" />
                      </span>
                      <span>Genres</span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleToggleContent("country")}
                  className={`items-center text-xs md:text-sm text-texthigh hover:text-foreground cursor-pointer ${
                    activeContent === "country"
                      ? "bg-cyan-300 dark:bg-purple-800/50 "
                      : ""
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={`${
                      isSidebarOpen
                        ? "hidden"
                        : "p-2 flex justify-center hover:bg-cyan-500/20 dark:hover:bg-purple-500/20"
                    }`}
                  >
                    <Icon name="globe" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? "py-2 px-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 flex items-center gap-2"
                        : "hidden "
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Icon name="globe" className="h-5 w-5" />
                      </span>
                      <span>Countries</span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleToggleContent("year")}
                  className={`items-center text-xs md:text-sm text-texthigh hover:text-foreground cursor-pointer ${
                    activeContent === "year"
                      ? "bg-cyan-300 dark:bg-purple-800/50 "
                      : ""
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={`${
                      isSidebarOpen
                        ? "hidden"
                        : "p-2 flex justify-center hover:bg-cyan-500/20 dark:hover:bg-purple-500/20"
                    }`}
                  >
                    <Icon name="list" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? "py-2 px-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 flex items-center gap-2"
                        : "hidden "
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Icon name="list" className="h-5 w-5" />
                      </span>
                      <span>Year</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="music-sidebar-menu-content"
                className={`middle-sidebar scrollable-container  border-l border-muted ${
                  isSidebarOpen ? "" : "hidden"
                }`}
              >
                {activeContent === "genre" && (
                  <div className=" min-w-[200px] ">
                    {genreOptions
                      .sort((a, b) => a.localeCompare(b))
                      .map((genre) => (
                        <div
                          key={genre}
                          className={`cursor-pointer py-2 pl-1.5 text-xs md:text-sm font-normal border-b border-muted hover:bg-muted/20 ${
                            genre === selectedGenre
                              ? "text-texthigh bg-muted"
                              : "text-textlow"
                          }`}
                          onClick={() => handleGenreSelection(genre)}
                        >
                          {genre}
                        </div>
                      ))}
                  </div>
                )}
                <div>
                  {activeContent === "country" && (
                    <div className="min-w-[200px] ">
                      {countryOptions
                        .sort((a, b) => a.localeCompare(b))
                        .map((country) => (
                          <div
                            key={country}
                            className={`cursor-pointer py-2 pl-1.5 text-xs md:text-sm font-normal border-b border-muted hover:bg-muted/20 ${
                              country === selectedCountry
                                ? "text-texthigh bg-muted"
                                : "text-textlow"
                            }`}
                            onClick={() => handleCountrySelection(country)}
                          >
                            {country}
                          </div>
                        ))}
                    </div>
                  )}

                  {activeContent === "year" && (
                    <div className="scrollable-container min-w-[200px] ">
                      {yearOptions
                        .sort((a, b) => b.localeCompare(a))
                        .map((year) => (
                          <div
                            key={year}
                            className={`cursor-pointer py-2 pl-1.5 text-xs md:text-sm font-normal border-b border-muted hover:bg-muted/20 ${
                              year === selectedYear
                                ? "text-texthigh bg-muted"
                                : "text-textlow"
                            }`}
                            onClick={() => handleYearSelection(year)}
                          >
                            {year}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Sidebar>

          <MusicProvider
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            selectedCountry={selectedCountry}
          >
            <main className="flex-1 grow border-t border-b border-muted @container">
              {children}
            </main>
          </MusicProvider>
        </div>
      </div>
    </section>
  );
}
