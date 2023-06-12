import '@styles/globals.css';
import Link from 'next/link';

export default function MyApp() {
  return (     
    <main className="flex flex-col items-center justify-between px-4 md:px-8 mx-auto">
            {/* <div className='bg-transparent'>
        <img
        src="/bggenre/home3.jpg"
        className='-z-10 fixed w-full h-full object-cover left-0'
        >
        </img>

      </div> */}


<h3 className="py-8 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center"><span className="justify-center text-transparent bg-clip-text bg-gradient-to-r to-colortheme from-sky-400">A Psychedelic </span> Dedicated Platform</h3>

<p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

      <div className='left-gradient'> </div>
      <div className='right-gradient'> </div>

      <div className="py-16 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        
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



    </main>
    
  )
}