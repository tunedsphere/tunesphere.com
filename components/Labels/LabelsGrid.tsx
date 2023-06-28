"use client";
import { recordLabels } from '@public/data.js';
import "@styles/globals.css";
import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@ui/button';
import Image from 'next/image';
import Sidebar from '@components/ui/sidebar';
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";

const LabelsGrid: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const expandedLabelRef = useRef(null);
  const {user,isSignedIn} = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);
  const [yearExpanded, setYearExpanded] = useState(false);
  const [countryExpanded, setCountryExpanded] = useState(false);


  const UserProfileImage = () => {
 
    if (!user) return null;
    return (
      <div className='flex justify-center items-center '>
    
      <img 
      src={user.profileImageUrl}
      className='my-6 flex-none h-20 w-20 border-4 border-white rounded-full' alt="Profile image" />
  
    </div>
    );
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


  return (<section className='min-h-[calc(100vh-[436px])]'>
    <div className='pt-32 h-[calc(100vh-[436px])] '>
      
    <div className='flex justify-center items-center '>
      <div className='flex py-8 justify-center border-accent4 border-b-1 border-t-2 w-3/4'>
      <Button className="mx-4" variant='outline'>Artists</Button>
      <Button className="mx-4" variant='outline'>Djs</Button>
      <Button className="mx-4" variant='outline'>Labels</Button></div>
      </div>
    <div className='flex h-[calc(100vh-[436px])]'> 
 <Sidebar>
 
    <div className='flex flex-col items-center p-2'>
    <UserProfileImage></UserProfileImage>
    </div>

    {/* // Sort the genreOptions */}
    <div className="@container">
  <div className="divide-y">
    <Collapsible>
      <CollapsibleTrigger onClick={handleGenreToggle} className="text-texthigh w-full py-6">
        <span className="float-left pl-6">Genres</span>
        <span className="float-right mr-4">{genreExpanded ? '-' : '+'}</span>
      </CollapsibleTrigger>
      {genreExpanded && (
        <CollapsibleContent className="pb-4 w-full">
          <div>
            {genreOptions
                .sort((a, b) => a.localeCompare(b)) // Sort the genreOptions array alphabetically
                .map((genre) => (
                <div
                  key={genre}
                  className={`py-4 bg-accent0 cursor-pointer pl-8 font-normal divide-y divide-y-reverse ${
                    genre === selectedGenre ? 'bg-accent1 text-texthigh' : ''
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
</div>

{/* // Sort the CountryOptions */}
<div className="@container">
  <div className="divide-y">
    <Collapsible>
      <CollapsibleTrigger onClick={handleCountryToggle} className="text-texthigh w-full py-6">
        <span className="float-left pl-6">Country</span>
        <span className="float-right mr-4">{countryExpanded ? '-' : '+'}</span>
      </CollapsibleTrigger>
      {countryExpanded && (
        <CollapsibleContent className="pb-4 w-full  ">
          <div>
            {countryOptions
              .sort((a, b) => a.localeCompare(b)) // Sort the genreOptions array in descending order
             .map((country) => (
              <div
                key={country}
                className={`py-4 bg-accent0 cursor-pointer pl-8 font-normal ${
                  country === selectedCountry ? 'bg-accent1 text-texthigh' : ''
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
</div>

{/* // Sort the YearOptions */}
            <div className="@container">
  <div className="divide-y">
    <Collapsible>
      <CollapsibleTrigger onClick={handleYearToggle} className="text-texthigh w-full py-6">
        <span className="float-left pl-6">Year</span>
        <span className="float-right mr-4">{yearExpanded ? '-' : '+'}</span>
      </CollapsibleTrigger>
      {yearExpanded && (
        <CollapsibleContent className="pb-4 w-full  ">
          <div>
            {yearOptions
              .sort((a, b) => b.localeCompare(a)) // Sort the genreOptions array in descending order
             .map((year) => (
              <div
                key={year}
                className={`py-4 bg-accent0 cursor-pointer pl-8 font-normal ${
                  year === selectedYear ? 'bg-accent1 text-texthigh' : ''
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
       style={{ height: 'calc(100vh - 248px)' }}
       className='p-6 border-accent4 border-2 grow scrollable-container @container overflow-y-scroll'>
        

       
        <div className='w-full bg-transparent border-colortheme border-b-2 p-6'>
       
        <h3 className='text-texthigh underline underline-offset-4 decoration-colortheme'>{selectedGenre ? `${selectedGenre} :` : 'ALL :'}</h3>
  <h5 className='text-textlow'>{selectedYear}</h5>
  <h5 className='text-textlow'>{selectedCountry}</h5>
</div>
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
                    <div className="col-span-2 items-center pl-6">
                      <Link href={`label/${label.id}`}>
                        <h3 className="text-texthigh text-lg underline font-bold hover:text-colortheme cursor-pointer">
                          {label.name}
                        </h3>
                      </Link>
                      <p className="text-textlow">Location: {label.location}</p>
                      <p className="text-textlow">Founding Year: {label.founding_year}</p>
                      <p className="text-textlow">Main Genre: {label.genre}</p>
                    </div>
                    <div className="@xs:col-span-3 w-5/6 pl-6">
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
      </section>
  );
};

export default LabelsGrid;