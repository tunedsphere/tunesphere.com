"use client"
import '@styles/globals.css';
import Link from 'next/link';
import { genres } from '../../constants/genres.js';
import Image from 'next/image';
import planet2 from '@public/bghome/planet2.png';
import React, { useState, useEffect } from 'react';
import { recordLabels } from '@public/data.js';
import { Button } from "@/components/ui/button";


export default function MyApp() {

  const elementsPerPage = 8; // Update the elementsPerPage to 8  

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end indexes for the current page
  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = Math.min(startIndex + elementsPerPage, recordLabels.length);

  // Get the labels for the current page
  const currentLabels = recordLabels.slice(startIndex, endIndex);
  const [selectedLabel, setSelectedLabel] = useState(null); // A

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
    <section>
      <div className='grid grid-cols-2'>
        <div className='w-1/2'>
    <Image
    src={planet2}
    placeholder="blur"
    width={500}
    height={500}
    alt="planet Home"
    className='-z-10 absolute left-0 top-0 w-1/3'>

    </Image>
    </div>
    </div>
  
    <main className="mt-32 flex flex-col items-center justify-between px-4 md:px-8 mx-auto">

<div className="py-12" >
<h1 className="font-extrabold dark:text-white md:text-5xl lg:text-6xl text-center justify-center text-transparent bg-clip-text"><span className="text-texthigh">A </span><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-600">Psychedelic </span><span className="text-transparent bg-clip-text bg-gradient-to-r to-yellow-500 from-red-700">Dedicated </span><span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-blue-600">Platform</span>  </h1>

<p className="py-4 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">Explore the musical realm of Psychedelic Art, with Music, Art, Decorations and Festivals</p>
</div>

      <div className='left-gradient -z-10'> </div>
      <div className='right-gradient -z-10'> </div>

        <div className='grid xl:grid-cols-4 py-16 ext-center 2xl:text-left text-center'>
        
        <Link href="/labels" passHref>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Labels{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          
          
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
            Search & Find the label thats suits your ears the most. 
          </p>
        </div>
        </Link>

        <Link href="/artists" passHref>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Artists & DJ{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
            Explore in depth of your favourite genre and find inspiring Artists
          </p>
        </div>
        </Link>
        <Link href="/festivals" passHref>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Festivals{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
            Instantly check where your favourite Artist will play. 
          </p>
        </div>
        </Link>
        <Link href="/labels" passHref>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30  group-hover:translate-x-1 motion-reduce:transform-none"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Most popular{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
            Visit the most Popular request
          </p>
        </div>
        </Link>

      </div>

      <div className='py-12 '>
      <h3 href="/genres" id="home-genre-list" className="cursor-pointer py-4 font-extrabold text-gray-900 md:text-4xl text-center"><span className="justify-center text-transparent bg-clip-text bg-gradient-to-r to-colortheme from-colortheme2">Genre List</span></h3>
      <p className="text-lg font-normal text-textlow lg:text-xl text-center">Explore the Variaty of energies and sounds through different musical styles</p>
      </div>

          <div className='flex relative justify-center'>
               
          <div  className='bg-gradient-to-r to-colortheme2 from-colortheme -z-10 -inset-1 absolute rounded-lg blur'></div>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 lg:text-xl text-xl font-semibold bg-black gap-4 p-8">
  {genres.map((item, index) => (
    <div  href={item.href} key={`genre-${index}`} className="text-center cursor-pointer group rounded-lg border border-transparent transition-colors hover:underline underline-offset-4 decoration-colortheme group-hover:translate-x-1 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 motion-reduce:transform-none text-texthigh p-2" index={index + 1}>{' '}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              
            </span>{item.title}</div>
  ))}
      
  </div>
</div>


<div className='py-12 '>
      <h3 href="/genres" id="home-genre-list" className="py-4 font-extrabold text-gray-900 md:text-4xl text-center"><span className="justify-center text-transparent bg-clip-text bg-orange">NEW </span><span className="justify-center text-transparent bg-clip-text bg-colortheme from-texthigh">RELEASES</span></h3>
      <p className="text-lg font-normal text-textlow lg:text-xl text-center">The latest releases on TunedSphere</p>
      </div>


      <div className="grid grid-cols-6 gap-2 p-4 max-w-[1600px]">
      <div className='row-span-2 col-span-2 top-0'>
  {selectedLabel && (
    <>
      <img src={selectedLabel.image} alt={selectedLabel.name} className="object-contain object-center" />
      <h2 className="md:text-xl text-sm font-semibold mt-4">{selectedLabel.name}</h2>
      <p className="text-gray-600 mt-2">{selectedLabel.genres.join(', ')}</p>
    </>
  )}
</div>
        {currentLabels.map((label) => (
          <div key={label.id} onClick={() => setSelectedLabel(label)} className="shadow-lg rounded-lg p-4 bg-purple1">
            <div className="aspect-w-1 aspect-h-1">
              <img src={label.image} alt={label.name} className="object-cover object-center w-full h-full" />
            </div>
            <h2 className="md:text-xl text-xs font-bold ">{label.name}</h2>
            <h2 className="md:text-xl text-xs text-textlow font-normal">{label.founding_year}</h2>
            <p className="text-gray-600 mt-2 md:text-sm text-xs">{label.genres.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-6 py-4">
        <Button
        variant="outline"
          onClick={previousPage}
          disabled={currentPage === 1}
          className="text-texthigh px-4 py-2 text-sm bg-accent2 hover:bg-accent3"
        
        >
          Previous
        </Button>
        <div className="flex justify-center gap-2">
        {/* Display page numbers */}
        {Array.from(
      {
        length: Math.min(Math.ceil(recordLabels.length / elementsPerPage), 10), // Limit to 10 pages
      },
      (_, i) => i + 1 + Math.max(currentPage - 5, 0) // Adjust page numbers based on current page
    ).map((page) => (
          <Button
          variant="outline"
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 text-sm text-texthigh font-medium rounded-md hover:bg-accent3 hover:text-texthigh ${
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
          disabled={endIndex >= recordLabels.length || Math.ceil(recordLabels.length / elementsPerPage) <= currentPage}
          className="px-4 py-2 text-sm text-texthigh bg-accent2 hover:bg-accent3"
        >
          Next
        </Button>
      </div>

   
 
      

    </main>
    </section>
    
  )
}
