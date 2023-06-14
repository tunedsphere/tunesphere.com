"use client"
import '@styles/globals.css';
import Link from 'next/link';
import { genres } from '../constants/genres.js';
import Image from 'next/image';
import planet2 from '@public/bghome/planet2.png';
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
    className='-z-10 absolute left-0 top-0 w-1/3'>

    </Image>
    </div>
    </div>
  
    <main className="mt-8 flex flex-col items-center justify-between px-4 md:px-8 mx-auto">

<div className="py-12" >
<h1 className="font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center"><span className="justify-center text-transparent bg-clip-text bg-gradient-to-r to-colortheme from-orange">A Psychedelic </span> Dedicated Platform</h1>

<p className="py-4 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">Explore the musical realm of Psychedelic Art, with Music, Art, Decorations and Festivals</p>
</div>

      <div className='left-gradient -z-10'> </div>
      <div className='right-gradient -z-10'> </div>

        <div className='grid 2xl:grid-cols-4 py-16 ext-center 2xl:text-left text-center'>
        
        <Link href="/labels" passHref>
        <div
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
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
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
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
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30  group-hover:translate-x-1 motion-reduce:transform-none"
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
      <h3 href="/genres" id="home-genre-list" className="decoration-colortheme hover:underline underline-offset-4 cursor-pointer py-4 font-extrabold text-gray-900 md:text-4xl text-center"><span className="justify-center text-transparent bg-clip-text bg-gradient-to-r to-orange from-texthigh">Genre List</span></h3>
      <p className="text-lg font-normal text-textlow lg:text-xl text-center">Explore the Variaty of energies and sounds through different musical styles</p>
      </div>
          <div className='flex relative'>
               
          <div  className='bg-gradient-to-r to-colortheme2 from-colortheme -z-10 -inset-1 absolute rounded-lg blur'></div>
          <div className={`grid lg:grid-cols-6 text-2xl font-semibold bg-black p-8`}>
  {genres.map((item, index) => (
    <div  href={item.href} key={`genre-${index}`} className="cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30  group-hover:translate-x-1 motion-reduce:transform-none text-texthigh p-2" index={index + 1}>
     {' '} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              
            </span>{item.title}</div>
  ))}
      
  </div>
</div>

 

    </main>
   

   
    </section>
    
  )
}
