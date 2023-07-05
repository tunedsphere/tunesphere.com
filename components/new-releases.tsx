"use client";
import '@styles/globals.css';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from '@components/icons';
import { recordLabels } from '@/public/data.js';
import { genres } from '@/constants/genres.js';

const NewReleasesSection: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // Update the number of items per page based on the screen size
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 20 * 16) {
      setItemsPerPage(2);
    } else if (screenWidth >= 24 * 16) {
      setItemsPerPage(3);
    } else if (screenWidth >= 28 * 16) {
      setItemsPerPage(4);
    } else if (screenWidth >= 32 * 16) {
      setItemsPerPage(5);
    } else if (screenWidth >= 36 * 16) {
      setItemsPerPage(6);
    } else if (screenWidth >= 42 * 16) {
      setItemsPerPage(7);
    } else if (screenWidth >= 48 * 16) {
      setItemsPerPage(8);
    } else if (screenWidth >= 56 * 16) {
      setItemsPerPage(9);
    } else {
      setItemsPerPage(2); // Fallback value
    }
  };

  // Add event listener to handle window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Call the resize handler initially
  useEffect(() => {
    handleResize();
  }, []);

  // Calculate start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, recordLabels.length);

  // Get the labels for the current page
  const currentLabels = recordLabels.slice(startIndex, endIndex);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // Function to handle previous page button click
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Function to handle next page button click
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    // Set the initially selected label to the first item in the list
    setSelectedLabel(recordLabels[0]);
  }, []);

  return (
    <section id='NewReleases'>
      <div className='py-12 '>
        <h3 className="py-4 font-extrabold md:text-4xl text-center">
          <span className="justify-center text-transparent bg-clip-text bg-colortheme3">NEW </span>
          <span className="justify-center text-transparent bg-clip-text bg-colortheme from-texthigh">RELEASES</span>
        </h3>
        <p className="text-lg font-normal text-textlow lg:text-xl text-center">The latest releases on TunedSphere</p>
      </div>
      <div className='relative bg-colortheme2 w-full inset-0'>
        <div className='bg-gradient-to-r to-colortheme2  from-colortheme -z-10 -inset-1 absolute rounded-lg blur'></div>
        <div className="flex text-sm divide-x justify-center overflow-x-auto">
          {/* Left arrow icon */}
          <div className='flex align-center items-center'>
            <Icons.chevronLeft className="text-texthigh p-2 cursor-pointer" />
          </div>
          {genres.map((item, index) => (
            <div className='flex align-center items-center' key={`genre-${index}`}>
              <a
                href={item.href}
                className="text-center cursor-pointer group rounded-lg border border-transparent transition-colors hover:underline underline-offset-4 decoration-colortheme group-hover:translate-x-1 hover:border-neutral-700 hover:bg-neutral-800/30 motion-reduce:transform-none text-texthigh p-2"
                style={{ float: 'left' }}
              >
                {item.title}
              </a>
              <Separator orientation="vertical" />
            </div>
          ))}
          {/* Right arrow icon */}
          <div className='flex align-center items-center'>
            <Icons.chevronRight className="text-texthigh p-2 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className='flex  max-w-[1600px]'> 
        <div className="p-6 border-accent4 border-2 grow scrollable-container @container overflow-y-scroll w-full">
            <div className='grid gap-2 p-4 py-12 grid-flow-col-dense @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9'>
          
            {selectedLabel && (
               <div className='row-span-2 col-span-2 top-0'>
                <img src={selectedLabel.image} alt={selectedLabel.name} className="object-contain object-center" />
                <h2 className="md:text-xl text-sm font-semibold mt-4">{selectedLabel.name}</h2>
                <p className="text-gray-600 mt-2">{selectedLabel.genres.join(', ')}</p>
                </div>

            )}
          
          {currentLabels.map((label) => (
            <div key={label.id} onClick={() => setSelectedLabel(label)} className="shadow-lg rounded-lg p-4 bg-accent1">
              <div className="aspect-w-1 aspect-h-1">
                <img src={label.image} alt={label.name} className="object-cover object-center w-full h-full" />
              </div>
              <h2 className="md:text-xl text-xs font-bold py-2">{label.name}</h2>
              <p className="text-gray-600 md:text-sm text-xs">{label.genres.join(', ')}</p>
            </div>
          ))}
          </div>
          </div>
        <div className="flex justify-center md:mt-4 md:gap-6 md:py-4 gap-2">
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 1}
            className="h-6 px-1 py-1 text-texthigh md:px-3 md:py-1 md:text-sm text-xs bg-accent2 hover:bg-accent3"
          >
            <Icons.chevronLeft /> {/* Replace Icons.Left with the appropriate icon component or SVG */}
          </Button>
          <div className="flex justify-center gap-2">
            {/* Display page numbers */}
            {Array.from(
              {
                length: Math.min(Math.ceil(recordLabels.length / itemsPerPage), 5), // Limit to 5 pages
              },
              (_, i) => i + 1 + Math.max(currentPage - 3, 0) // Adjust page numbers based on current page
            ).map((page) => (
              <Button
                variant="outline"
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`md:px-3 md:py-1 md:text-sm h-6 px-2 py-1 text-xs text-texthigh font-medium rounded-md hover:bg-accent3 hover:text-texthigh ${
                  page === currentPage ? 'bg-colortheme2 hover:bg-colortheme text-texthigh' : 'text-textlow'
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={endIndex >= recordLabels.length || Math.ceil(recordLabels.length / itemsPerPage) <= currentPage}
            className="h-6 px-1 py-1 md:px-3 md:py-1 md:text-sm text-xs text-texthigh bg-accent2 hover:bg-accent3"
          >
            <Icons.chevronRight className="text-xs" /> {/* Replace Icons.Right with the appropriate icon component or SVG */}
          </Button>
        </div>
     </div>
    </section>
  );
};

export default NewReleasesSection;