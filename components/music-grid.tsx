"use client";

import "@styles/globals.css";

import * as React from "react";
import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';


import { recordLabels } from '@public/data.js';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Sidebar } from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import MusicSidebarMenuBurger from "@/components/menuburgers/music-sidebar-menu-burger";


const MusicGrid: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const expandedLabelRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);
  const [yearExpanded, setYearExpanded] = useState(false);
  const [countryExpanded, setCountryExpanded] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


const handleGenreToggle = () => {
  setGenreExpanded(!genreExpanded);
};

const handleYearToggle = () => {
  setYearExpanded(!yearExpanded);
};

const handleCountryToggle = () => {
  setCountryExpanded(!countryExpanded);
};
const handleLabelClick = (labelIndex) => {
  setSelectedLabel((prevSelectedLabel) => (prevSelectedLabel === labelIndex ? null : labelIndex));
};
const yearOptions = Array.from(
  new Set(
    recordLabels.flatMap((label) => label.founding_year)
  )
);
const handleYearSelection = (year) => {
  if (year === selectedYear) {
    // If the same year is selected, reset the filter
    setSelectedYear(null);
  } else {
    setSelectedYear(year);
  }
};

const genreOptions = Array.from(
  new Set(
    recordLabels.flatMap((label) => label.genres)
  )
);
const handleGenreSelection = (genre) => {
  if (genre === selectedGenre) {
    // If the same genre is selected, reset the filter
    setSelectedGenre(null);
  } else {
    setSelectedGenre(genre);
  }
};
const countryOptions = Array.from(
  new Set(
    recordLabels.flatMap((label) => label.country)
  )
);
const handleCountrySelection = (country) => {
  if (country === selectedCountry) {
    // If the same country is selected, reset the filter
    setSelectedCountry(null);
  } else {
    setSelectedCountry(country);
  }
};

// Filter and sort the record labels based on selected filters
const sortedAndFilteredLabels = recordLabels
  .filter((label) => {
    if (
      (selectedGenre === null || label.genres.includes(selectedGenre)) &&
      (selectedYear === null || label.founding_year.includes(selectedYear))&&
      (selectedCountry === null || label.country.includes(selectedCountry))
    ) {
      return true;
    }
    return false;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const handleOutsideClick =  (event) => {
      if (selectedLabel !== null && !event.target.closest('.expanded-label-container')) {
        setSelectedLabel(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setSelectedLabel(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedLabel]);
  const initialColumnWidth = 200; // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth);

  const handleResize = (e) => {
    setColumnWidth(e.target.offsetWidth);
  };

  return (
  <section className='mt-[var(--headerHeight)]'>
    <div className=''>
    <div className=" mx-auto relative w-full flex justify-center items-center">

        <div className="flex justify center py-8 px-4 mx-auto right-0 left-0 gap-2 md:gap-6">
          <Button className="text-texthigh px-1 sm:px-4" variant="outline">Albums</Button>
          <Button className="text-texthigh px-1 sm:px-4" variant="outline">Artists</Button>
          <Button className="text-texthigh px-1 sm:px-4" variant="outline">Djs</Button>
          <Button className="text-texthigh px-1 sm:px-4" variant="outline">Labels</Button>
        </div>
      </div>
    <div className='flex'> 

 <Sidebar variant="musicgrid" className={`sidebar  ${isSidebarOpen ? "sidebar-open xl:w-64 w-52" : "hidden-sidebar w-[68px] xl:w-24"}`}>
  <div className={`flex py-2 border-b border-accent4 ${isSidebarOpen ? "flex-row-reverse" : "justify-center"}`}>
 <MusicSidebarMenuBurger
              isOpen={isSidebarOpen}
              handleSidebarToggle={handleSidebarClick}
              setIsOpen={setIsSidebarOpen}
            />
</div>
    {/* // Sort the genreOptions */}
    <div className="middle-sidebar py-2">

{/* // Sort the CountryOptions */}
    <div className="@container">
    <Collapsible>
      <CollapsibleTrigger onClick={handleGenreToggle}  className={`text-texthigh justify-center items-center w-full flex text-xl py-2${
        genreExpanded ? '' : '' // Apply the bg-accent1 class when yearExpanded is true
      }`}
    ><div onClick={handleSidebarClick} className={`w-full justify-center ${isSidebarOpen ? "hidden" : "flex "}`}><Icons.flower/></div>
    
    <div className={`items-center ${isSidebarOpen ? "py-4 px-4 w-full" : "hidden "}`}>
  <div className="flex align-center items-center">
    <span className="mr-2"><Icons.flower/></span>
    <span>Genres</span>
    <div className="w-full">
    <span className="float-right">{genreExpanded ? '-' : '+'}</span></div>
  </div>
</div>

      </CollapsibleTrigger>
      {genreExpanded && (
        <CollapsibleContent className={`${isSidebarOpen ? "w-full" : "hidden"}`}>
          <div>
            {genreOptions
                .sort((a, b) => a.localeCompare(b)) // Sort the genreOptions array alphabetically
                .map((genre) => (
                <div
                  key={genre}
                  className={`cursor-pointer py-2 pl-8 font-normal text-lg ${
                    genre === selectedGenre ? ' text-texthigh' : ''
                  }`}
                  onClick={() => handleGenreSelection(genre)}
                >
                  {genre}
                </div>
              ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
</div>

{/* // Sort the CountryOptions */}
<div className="@container">
    <Collapsible>
    <CollapsibleTrigger onClick={handleCountryToggle}  className={`text-texthigh justify-center items-center w-full flex py-2 text-xl ${
        genreExpanded ? '' : '' // Apply the bg-accent1 class when yearExpanded is true
      }`}
    ><div onClick={handleSidebarClick} className={`w-full justify-center py-2 ${isSidebarOpen ? "hidden" : "flex"}`}
><Icons.globe/></div>
    
    <div className={`items-center ${isSidebarOpen ? "py-4 px-4 w-full" : "hidden "}`}>
  <div className="flex align-center items-center">
    <span className="mr-2"><Icons.globe/></span>
    <span>Countries</span>
    <div className="w-full">
    <span className="float-right">{genreExpanded ? '-' : '+'}</span></div>
  </div>
</div>
      </CollapsibleTrigger>
      {countryExpanded && (
        <CollapsibleContent className={`${isSidebarOpen ? "w-full" : "hidden"}`}>
          <div>
            {countryOptions
              .sort((a, b) => a.localeCompare(b)) // Sort the countryOptions array in descending order
             .map((country) => (
              <div
                key={country}
                className={`cursor-pointer py-2 pl-8 font-normal text-lg ${
                  country === selectedCountry ? 'text-texthigh' : ''
                }`}
                onClick={() => handleCountrySelection(country)}
              >
                {country}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  </div>

{/* // Sort the YearOptions */} 
  <div className="@container">
    <Collapsible>
    <CollapsibleTrigger onClick={handleYearToggle}  className={`text-texthigh items-center justify-center content-center text-center w-full flex py-2 text-xl ${
        genreExpanded ? '' : '' // Apply the bg-accent1 class when yearExpanded is true
      }`}
    ><div onClick={handleSidebarClick} className={`w-full ${isSidebarOpen ? "hidden" : "flex justify-center"}`}
><Icons.listMusic/></div>
    
    <div className={`items-center ${isSidebarOpen ? "py-4 px-4 w-full" : "hidden"}`}>
  <div className="flex align-center items-center">
    <span className="mr-2"><Icons.listMusic/></span>
    <span>Year</span>
    <div className="w-full">
    <span className="float-right">{genreExpanded ? '-' : '+'}</span></div>
  </div>
</div>
      </CollapsibleTrigger>
      {yearExpanded && (
        <CollapsibleContent className={`${isSidebarOpen ? "w-full" : "hidden"}`}>
          <div>
            {yearOptions
              .sort((a, b) => b.localeCompare(a)) // Sort the yearOptions array in descending order
             .map((year) => (
              <div
                key={year}
                className={`cursor-pointer py-2 pl-8 font-normal text-lg ${
                  year === selectedYear ? 'text-texthigh' : ''
                }`}
                onClick={() => handleYearSelection(year)}
              >
                {year}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  </div>


</div>

</Sidebar>
      <div 
      id="GridMusicView"
       className='border-accent4 border-2 grow @container'>
        <div id="MusicGridBanner" className='sm:min-h-[--music-grid-banner-height] min-h-[--music-grid-banner-height-mobile] min-w-[calc(100vw - 68px)] relative w-full bg-transparent z-10 flex justify-center sm:ml-12 ml-4 border-accent4 border-b-2'> 
        <div className="absolute inset-x-0 bottom-2 items-center w-full ">
        <h3 className='font-semibold text-texthigh md:text-5xl sm:text-3xl text-xl'>{selectedGenre ? `${selectedGenre} ` : 'ALL Genres'}</h3>
        <div className="flex gap-1">
        <h5 className="text-textlow md:text-3xl sm:text-xl text-base">{selectedCountry ? `${selectedCountry}, ` : ""}</h5><h5 className="text-textlow ">{selectedYear}</h5></div></div>

</div>
<div 
      id="GridMusicView"
       className='-z-10 sm:music-grid music-grid-mobile sm:pl-12 p-4 border-accent4 grow scrollable-container @container overflow-y-scroll'>
        <div className="grid grid-flow-row-dense grid-cols-2 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9 @5xl:grid-cols-10 @6xl:grid-cols-12 7xl:grid-cols-13 8xl:grid-cols-14 gap-4">

        {sortedAndFilteredLabels.map((label, index) => (
            <React.Fragment key={index}>
              <div
                key={label.id}
                className={`cursor-pointer items-center text-center justify-center ${
                  selectedLabel === index ? '' : ''
                }`}
                onClick={() => handleLabelClick(index)}
              >
                <img
                  src={label.image}
                  alt={label.name}
                  className="border-4 rounded-full my-4 cursor-pointer"
                />
                <h3 className="text-xl font-bold mb-2 text-texthigh hover:text-colortheme cursor-pointer">
                  {label.name}
                </h3>
                <p className="text-textlow hover:text-colortheme cursor-pointer">
                  {label.genres.join(', ')}
                </p>
              </div>
              {selectedLabel === index && (
                <div
                  ref={expandedLabelRef}
                  className="col-span-full mt-4 bg-accent0 py-8 border-t-2 border-b-2 border-spacing-2 hidden @xs:block  @container"
                >
                  <div className='-z-10 -inset-1.5 absolute rounded-lg blur opacity-50 bg-gradient-to-r from-colortheme to-bg-background'></div>
                  <div className='gap-4 grid @xs:grid-rows-1 @xs:grid-cols-2 @md:grid-rows-1 @md:grid-cols-3 @2xl:grid-flow-col @2xl:grid-rows-2 @3xl:grid-rows-2'>
                    <div className=" @xs:row-start-1 @xs:row-end-1 @2xl:row-span-3 @3xl:row-span-2 flex justify-center pr-8 border-r-2 border-accent5">
                      <Link href={`label/${label.id}`} className=''>
                        <Image
                          src={label.image}
                          width={380}
                          height={380}
                          alt={label.id}
                          className="cursor-pointer object-contain"
                        />
                      </Link>
                    </div>
                    <div className="col-span-2 items-center">
                      <Link href={`label/${label.id}`}>
                        <h3 className="text-texthigh text-lg underline font-bold hover:text-colortheme cursor-pointer">
                          {label.name}
                        </h3>
                      </Link>
                      <p className="text-textlow">Location: {label.location}</p>
                      <p className="text-textlow">Founding Year: {label.founding_year}</p>
                      <p className="text-textlow">Main Genre: {label.genre}</p>
                    </div>
                    <div className="@xs:col-span-3 w-5/6">
                      <p><strong className="text-lg underline text-texthigh">Description:</strong></p>
                      <p className='text-textlow'>{label.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      </div>
      </div>
      </div>
      </section>
  );
};

export default MusicGrid;