import React from 'react';
import ArtistsGrid from '@/components/Artists/ArtistsGrid';


const Gridpage = () => {
  return (

    <main>
          <div className='left-gradient'> </div>

          <h1 className="py-8 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-colortheme from-sky-400">Discover Artists</h1>
            <ArtistsGrid/>
 
    </main>
     )
}

export default Gridpage;