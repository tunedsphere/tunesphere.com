"use client";
import { recordLabels } from '@public/data.js';
import "@styles/globals.css";
import React, { useState, useEffect, useRef } from 'react';
import { SelectGenre, SelectYear, SelectCountry } from '@components/ui';
import Link from 'next/link';
import { Button } from '@ui/button';
import Image from 'next/image';

const LabelsGrid = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const expandedLabelRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
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

  const handleLabelClick = (labelIndex) => {
    setSelectedLabel((prevSelectedLabel) => (prevSelectedLabel === labelIndex ? null : labelIndex));
  };

  const handleSortByYear = () => {
    setSortOrder('year');
  };

  const handleSortAlphabetically = () => {
    setSortOrder('alphabetical');
  };

  const sortLabels = (labels) => {
    if (sortOrder === 'year') {
      return labels.sort((a, b) => a.founding_year - b.founding_year);
    } else if (sortOrder === 'alphabetical') {
      return labels.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return labels;
    }
  };

  const filteredLabels = recordLabels.filter((label) => {
    if (selectedGenre && label.genres.includes(selectedGenre)) {
      return false;
    }
    if (selectedYear && label.founding_year !== selectedYear) {
      return false;
    }
    if (selectedCountry && label.country !== selectedCountry) {
      return false;
    }
    return true;
  });

  const sortedAndFilteredLabels = sortLabels(filteredLabels);

  return (
    <section>
      <div className="py-8 flex justify-between gap-4">
        <div className='flex flex-row'>
          <SelectGenre
            selectedGenre={selectedGenre}
            onGenreChange={(genre) => setSelectedGenre(genre)}
          />
          <SelectYear
            selectedYear={selectedYear}
            onYearChange={(year) => setSelectedYear(year)}
          />
          <SelectCountry
            selectedCountry={selectedCountry}
            onCountryChange={(country) => setSelectedCountry(country)}
          />
        </div>
        <div className='flex flex-row-reverse right-0'>
          <Button variant="outline" className="" onClick={handleSortByYear}>By Year</Button>
          <Button variant="outline" className="" onClick={handleSortAlphabetically}>A/Z</Button>
        </div>
      </div>
      <div className='scrollable-container @container overflow-y-scroll'>
        <div className="grid grid-flow-row-dense grid-cols-2 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9 @5xl:grid-cols-10 @6xl:grid-cols-12 gap-4">
          {sortedAndFilteredLabels.map((label, index) => (
            <React.Fragment key={index}>
              <div
                key={label.id}
                className={`cursor-pointer rounded-lg shadow-md items-center text-center justify-center ${
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
                          responsive
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
    </section>
  );
};

export default LabelsGrid;