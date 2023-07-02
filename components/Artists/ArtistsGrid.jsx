"use client";// Assuming data.js file is in the same directory
import "@styles/globals.css";

import React, { useState } from 'react';
import Link from 'next/link';

import  { recordLabels } from '@/public/data.js';
import SelectGenre from '@/components/ui/SelectGenre';
import SelectYear from '@/components/ui/SelectYear';
import SelectCountry from '@/components/ui/SelectCountry';
import { Button } from '@/components/ui/button';


const ArtistsGrid = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [numColumns, setNumColumns] = useState(10); // Number of columns in the grid

  const handleItemClick = (label) => {
    setSelectedItem(label);
  };

  const filterByGenre = (label) => {
    if (!selectedGenre) return true;
    return label.genres.includes(selectedGenre);
  };

  const filterByYear = (label) => {
    if (!selectedYear) return true;
    return label.founding_year.includes(selectedYear);
  };

  const filterByCountry = (label) => {
    if (!selectedCountry) return true;
    return label.country.includes(selectedCountry);
  };

  const renderItems = () => {
    const filteredItems = recordLabels.filter(
      (label) => filterByGenre(label) && filterByYear(label) && filterByCountry(label)
    );
  

    const selectedIndex = filteredItems.indexOf(selectedItem);
    const selectedRow = Math.floor(selectedIndex / numColumns) + 1;
    const expandedGridRow = selectedRow + 1;

    const gridItems = filteredItems.map((label, index) => {

      return (
        <div className=''>
          <div
            key={label.id}
            className={`cursor-pointer rounded-lg shadow-md items-center text-center justify-center ${
              selectedItem === label ? ' grid-items rounded-lg shadow-md text-center' : ''
            }`}
            onClick={() => handleItemClick(label)}    
          >

              <img
                src={label.image}
                alt={label.name}
                className=" border-4 rounded-full my-4 cursor-pointer"
              />

              <h3 className="text-xl font-bold mb-2 text-texthigh hover:text-colortheme cursor-pointer">
                {label.name}
              </h3>
              <p className="text-textlow hover:text-colortheme cursor-pointer">
                {label.genres.join(', ')}
              </p>
           
          </div>
        </div>
   
      );
    });

    if (selectedItem) {
      gridItems.splice(
        selectedIndex + 1,
        0,
        <div
          key="expanded"
          className={`p-4 bg-accent0 py-8 border-t-2 border-b-2 border-spacing-2 @container ${selectedItem ? 'hidden @xs:block' : ''}`}
          id="expanded"
          style={{ gridColumn: '1 / -1', gridRow: expandedGridRow }}
        >
          <div className='gap-4 grid @xs:grid-rows-1 @xs:grid-cols-2 @md:grid-rows-1 @md:grid-cols-3 @2xl:grid-flow-col @2xl:grid-rows-2 @3xl:grid-rows-3 '>
          <div className='  -z-10 -inset-1.5 absolute rounded-lg blur opacity-50 bg-gradient-to-r from-colortheme to-bg-background'></div>
            <div className="@xs:row-start-1 @xs:row-end-1 @2xl:row-span-3 pr-8 border-r-2 border-accent5">
              <Link   href={`label/${selectedItem.id}`}>
                <img
                  src={selectedItem.image}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <div className="col-span-2 items-center pl-6">
              <Link   href={`label/${selectedItem.id}`}>
                <h3 className="text-texthigh text-lg underline font-bold hover:text-colortheme cursor-pointer">
                  {selectedItem.name}
                </h3>
              </Link>
              <p className="text-textlow">
                Location: {selectedItem.location}
              </p>
              <p className="text-textlow">
                Founding Year: {selectedItem.founding_year}
              </p>
              <p className="text-textlow">
                Main Genre: {selectedItem.genre}
              </p>
            </div>
            <div className="@xs:col-span-3 w-5/6 pl-6">
            
              <p><strong className="text-lg underline text-texthigh">Description:</strong></p>
                <p className='text-textlow'>{selectedItem.description}</p>
                
            
            </div>
          </div>
          </div>
      
                  
                );
              }

              return gridItems;
            };


            return (


              
              <div className="py-8 max-w-[1600px] mx-auto p-4">
      
                  <aside className='w-72 fixed overflow-y-auto lg\:\[--scroll-mt\:6\.3125rem\] '>

                  <nav className="relative pr-6  table">
                    <SelectGenre
                      className="sticky top-0 "
                      selectedGenre={selectedGenre}
                      onGenreChange={(genre) => setSelectedGenre(genre)}
                    />
                    <SelectYear
                      className="sticky top-0"
                      selectedYear={selectedYear}
                      onYearChange={(year) => setSelectedYear(year)}
                    />
                    <SelectCountry
                      className="sticky top-0"
                      selectedCountry={selectedCountry}
                      onCountryChange={(country) => setSelectedCountry(country)}
                    />
                    <Button variant="outline" > By Year</Button>
                  </nav>
                  </aside>
                  <div className={`@container @grid @grid-row pl-72`}>
                  <div className='grid grid-cols-2 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9 @5xl:grid-cols-10 gap-4'>
                    {renderItems()}
                    
                    </div>
                  </div>
               
              </div>
  );
};

export default ArtistsGrid;