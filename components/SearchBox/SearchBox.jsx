"use client";
import React from 'react';
import '@styles/globals.css';
import './searchbox.css';

const SearchBox = ({ closeSearch}) => {


  return (
    <div id="searchOverlay" className="fixed top-0 left-0 w-full bg-red-500 items-center">
      <div className='relative z-9999 m-h-[500px] flex '>
      <input 
      id='input-search'
      className="bg-transparent dialogue-search input-search rounded-t-lg border-solid overflow-y-auto max-w-2xl mx-auto md\:left-1\/2 md\:top-1\/4 gap-[5px] shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5" 
      type="text" 
      placeholder="Search"
      role='dialog'
      />
      </div>

      <span className="closebtn" onClick={closeSearch} title="Close Overlay">
        x
      </span>
      {/* Additional search functionality */}
    </div>

  );
};

export default SearchBox;

