'use client'
import '@/styles/globals.css'
import * as React from 'react'
import { useState } from 'react'
import { recordLabelsData } from '@/public/recordLabelsData.js'
import Link from 'next/link'
import { Sidebar } from '@/components/ui/sidebar'
import { Icon } from '@/components/icon'
import MusicSidebarMenuBurger from '@/components/menuburgers/music-sidebar-menu-burger'
import { MusicTabs } from '@/components/pagers/music-tabs'
import { MusicSearchBar } from '@/components/searchs/music-search-bar'
import { Separator } from '@/components/ui/separator'

import { MusicProvider } from '@/components/grid/music-context'
import { MusicOptionsBanner } from '@/components/music-options-banner'

interface MusicLayoutPageProps {
  children: React.ReactNode
}

export default function MusicLayoutPage({ children }: MusicLayoutPageProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false) // New state for search bar visibility

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible)
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeContent, setActiveContent] = useState<string | null>(null)

  const handleToggleContent = (content: string) => {
    setActiveContent(activeContent === content ? null : content)
  }

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsSearchBarVisible(false)
  }

  const yearOptions = Array.from(
    new Set(recordLabelsData.flatMap((label) => label.founding_year)),
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
    new Set(recordLabelsData.flatMap((label) => label.genres)),
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
    new Set(recordLabelsData.flatMap((label) => label.country)),
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
    <section className="mt-[var(--headerHeight)]">
      <div className="">
        <div className="flex h-[--musicTabsHeight] w-full items-center justify-center align-middle">
          <MusicTabs />
        </div>
        <div className="flex">
          <Sidebar
            id="music-sidebar"
            variant="musicgrid"
            className={`sidebar ${
              isSidebarOpen
                ? 'sidebar-open overflow-y-auto'
                : 'hidden-sidebar w-[68px]'
            }`}
          >
            <div
              className={`flex border-b border-muted py-2 ${
                isSidebarOpen ? 'flex-row-reverse' : 'justify-center'
              }`}
            >
              <MusicSidebarMenuBurger
                isOpen={isSidebarOpen}
                handleSidebarToggle={handleSidebarClick}
                setIsOpen={setIsSidebarOpen}
              />
            </div>
            <div className="shrink-0 pt-2">
              <Link
                href="/music"
                onClick={() => handleToggleContent('home')}
                className={`cursor-pointer items-center text-xs text-texthigh hover:bg-cyan-500/20 hover:text-foreground dark:hover:bg-purple-500/20 md:text-sm ${
                  activeContent === 'home' ? '' : ''
                }`}
              >
                <div
                  onClick={handleSidebarClick}
                  className={` ${
                    isSidebarOpen
                      ? 'hidden'
                      : 'flex justify-center py-2.5 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                  }`}
                >
                  <Icon name="home" className="h-5 w-5" />
                </div>
                <div
                  className={` ${
                    isSidebarOpen
                      ? 'flex items-center gap-2 py-2 pl-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                      : 'hidden '
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
                className="cursor-pointer items-center text-xs text-texthigh hover:text-foreground md:text-sm"
              >
                <div
                  onClick={handleSidebarClick}
                  className={` ${
                    isSidebarOpen
                      ? 'hidden'
                      : 'flex justify-center py-2.5 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                  }`}
                >
                  <Icon name="search" className="h-5 w-5" />
                </div>

                {isSearchBarVisible ? (
                  <div
                    className={`items-center ${
                      isSidebarOpen ? 'px-4' : 'hidden'
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
                        ? 'flex items-center gap-2 py-2 pl-4 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20 '
                        : 'hidden'
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
            <div className="flex h-full min-h-full grow">
              <div
                id="music-sidebar-menu-triggers"
                className="middle-sidebar overflow-y-auto border-muted"
              >
                <div
                  onClick={() => handleToggleContent('fresh-frequencies')}
                  className={`cursor-pointer items-center text-xs text-texthigh hover:text-foreground md:text-sm ${
                    activeContent === 'fresh-frenquencies'
                      ? 'bg-cyan-300 dark:bg-purple-800/50 '
                      : ''
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={` ${
                      isSidebarOpen
                        ? 'hidden'
                        : 'flex justify-center p-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                    }`}
                  >
                    <Icon name="rocket" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? 'flex items-center gap-2 px-4 py-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                        : 'hidden '
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
                  onClick={() => handleToggleContent('genre')}
                  className={`cursor-pointer items-center text-xs text-texthigh hover:text-foreground md:text-sm ${
                    activeContent === 'genre'
                      ? 'bg-cyan-300 dark:bg-purple-800/50 '
                      : ''
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={` ${
                      isSidebarOpen
                        ? 'hidden'
                        : 'flex justify-center p-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                    }`}
                  >
                    <Icon name="flower" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? 'flex items-center gap-2 px-4 py-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                        : 'hidden '
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
                  onClick={() => handleToggleContent('country')}
                  className={`cursor-pointer items-center text-xs text-texthigh hover:text-foreground md:text-sm ${
                    activeContent === 'country'
                      ? 'bg-cyan-300 dark:bg-purple-800/50 '
                      : ''
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={`${
                      isSidebarOpen
                        ? 'hidden'
                        : 'flex justify-center p-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                    }`}
                  >
                    <Icon name="globe" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? 'flex items-center gap-2 px-4 py-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                        : 'hidden '
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
                  onClick={() => handleToggleContent('year')}
                  className={`cursor-pointer items-center text-xs text-texthigh hover:text-foreground md:text-sm ${
                    activeContent === 'year'
                      ? 'bg-cyan-300 dark:bg-purple-800/50 '
                      : ''
                  }`}
                >
                  <div
                    onClick={handleSidebarClick}
                    className={`${
                      isSidebarOpen
                        ? 'hidden'
                        : 'flex justify-center p-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                    }`}
                  >
                    <Icon name="list" className="h-5 w-5" />
                  </div>
                  <div
                    className={` ${
                      isSidebarOpen
                        ? 'flex items-center gap-2 px-4 py-2 hover:bg-cyan-500/20 dark:hover:bg-purple-500/20'
                        : 'hidden '
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
                  isSidebarOpen ? '' : 'hidden'
                }`}
              >
                {activeContent === 'genre' && (
                  <div className="w-48">
                    {genreOptions
                      .sort((a, b) => a.localeCompare(b))
                      .map((genre) => (
                        <div
                          key={genre}
                          className={`cursor-pointer border-b border-muted py-2 pl-1.5 text-xs font-normal hover:bg-muted/20 md:text-sm ${
                            genre === selectedGenre
                              ? 'bg-muted text-texthigh'
                              : 'text-textlow'
                          }`}
                          onClick={() => handleGenreSelection(genre)}
                        >
                          {genre}
                        </div>
                      ))}
                  </div>
                )}
                <div>
                  {activeContent === 'country' && (
                    <div className="min-w-[200px] ">
                      {countryOptions
                        .sort((a, b) => a.localeCompare(b))
                        .map((country) => (
                          <div
                            key={country}
                            className={`cursor-pointer border-b border-muted py-2 pl-1.5 text-xs font-normal hover:bg-muted/20 md:text-sm ${
                              country === selectedCountry
                                ? 'bg-muted text-texthigh'
                                : 'text-textlow'
                            }`}
                            onClick={() => handleCountrySelection(country)}
                          >
                            {country}
                          </div>
                        ))}
                    </div>
                  )}

                  {activeContent === 'year' && (
                    <div className="scrollable-container min-w-[200px] ">
                      {yearOptions
                        .sort((a, b) => b.localeCompare(a))
                        .map((year) => (
                          <div
                            key={year}
                            className={`cursor-pointer border-b border-muted py-2 pl-1.5 text-xs font-normal hover:bg-muted/20 md:text-sm ${
                              year === selectedYear
                                ? 'bg-muted text-texthigh'
                                : 'text-textlow'
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
            <main className="mx-auto grow border-b border-t border-muted">
              <MusicOptionsBanner
                selectedGenre={selectedGenre}
                selectedYear={selectedYear}
                selectedCountry={selectedCountry}
              />
              {children}
            </main>
          </MusicProvider>
        </div>
      </div>
    </section>
  )
}
