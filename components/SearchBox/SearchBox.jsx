"use client";
import React from 'react';
import '@styles/globals.css';
import './searchbox.css';
import { Button } from '@components/ui/button';
import { useEffect, useRef } from 'react';

// const SearchBox = ({ closeSearch}) => {


//   return (
    // <div className='absolute bg-red-600 left-0 top-0 bottom-0 w-full h-full'>
    // <div id="searchOverlay" className="transition-shadow z-40"></div>
    //   <div className='bottom-0 top-0 z-50 right-2 left-2 my-auto mx-auto md:bottom-auto'>
    //   <div className='m-h-[500px] z-50 flex flex-none items-center border-b border-accent1'>
    //   <input 
    //   id='globalsearch'
    //   className="p-4 w-full outline-none bg-inherit" 
    //   type="search" 
    //   placeholder="Search"
    //   role='dialog'
    //   />
    //   <Button
    //   variant="outline"
    //   className="text-xs after:content-['close'] md:after:content-['Esc'] px-1"
    //   aria-label="Cancel">
    //   </Button>
    //   <div 
    //   role='listbox'
    //   aria-label='Suggestions'
    //   className='overflow-y-auto p-2 flex-1 max-h-[400px]'></div>
    //   </div>
    //   </div>

    //   <span className="closebtn" onClick={closeSearch} title="Close Overlay">
    //     x
    //   </span>
    //   {/* Additional search functionality */}
    // </div>


    const SearchBox = ({ closeSearch }) => {
      const searchBoxRef = useRef(null);
    
      useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            closeSearch();
          }
        };
    
        const handleClickOutside = (event) => {
          if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            closeSearch();
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('click', handleClickOutside);
        };
      }, [closeSearch]);
    
      return (
        <div>
          <div className="z-9999 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              ref={searchBoxRef}
              id="search-box"
              className="m-h-[500px] z-10000 fixed bottom-0 top-0 right-2 left-2 my-auto mx-auto bg-accent1 rounded-lg border border-accent-3 md:max-w-2xl md:top-1/4 md:bottom-auto max-w-[calc(100%-8px)] max-h-[calc(100%-24px)]"
            >
              <div className="flex flex-none items-center w-full border-b border-accent2">
                <input
                  id="search-input"
                  className="p-4 w-full outline-none bg-inherit text-texthigh"
                  type="text"
                  placeholder="Search"
                  role="dialog"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-expanded="true"
                />
                <Button
                  id="cancel-button"
                  variant="outline"
                  aria-label="Cancel"
                  type="button"
                  tabindex="-1"
                  className="text-xs after:content-['close'] md:after:content-['Esc'] px-1 mr-2 rounded-[4px] h-[20px] font-medium hover:bg-accent1 hover:text-texthigh text-textlow"
                  onClick={closeSearch}
                ></Button>
              </div>
              <div
                id="suggestions-container"
                role="listbox"
                aria-label="Suggestions"
                className="overflow-y-auto p-2 flex-1 max-h-[400px]"
              >
                <div cmdk-list-sizer>
                  <div
                   className='text-textlow text-sm text-center py-4'
                    role="presentation">
                      No results found for <span className='text-texthigh'></span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default SearchBox;