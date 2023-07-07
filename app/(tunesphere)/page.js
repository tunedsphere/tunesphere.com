"use client"
import '@styles/globals.css';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import planet2 from '@/public/bghome/planet2.png';
import NewReleasesSection from '@components/new-releases';



export default function MyApp() {


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
    className='-z-10 absolute left-0 top-0 md:w-1/3 w-2/5 block sm:hidden md:block'>

    </Image>
    </div>
    </div>
  
    <main className="mt-32 flex flex-col items-center justify-between px-4 md:px-8 mx-auto">

<div className="py-12 md:mt-12 mt-2" >
<h1 className="font-extrabold dark:text-white md:text-5xl lg:text-6xl text-center justify-center text-transparent bg-clip-text"><span className="text-texthigh">A </span><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600">Psychedelic </span><span className="text-transparent bg-clip-text bg-gradient-to-r to-yellow-400 from-red-600">Dedicated </span><span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-blue-700">Platform</span>  </h1>

<p className="py-4 text-lg font-normal text-textlow lg:text-xl text-center">Explore the musical realm of Psychedelic Art, with Music, Art, Decorations and Festivals</p>
</div>

      <div className='left-gradient -z-10'> </div>
      <div className='right-gradient -z-10'> </div>

        <div className='grid xl:grid-cols-4 py-16 2xl:text-left text-center text-textlow'>
        
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
    <div className='flex justify-center'>
    {/* <NewReleasesSection/>  */}
    </div>
    </main>
    </section>   
  )
}
