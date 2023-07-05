"use client";
import '@styles/globals.css';

import React from 'react';
import { useEffect, useRef } from 'react';

import './searchbox.css';
import { Button } from '@/components/ui/button';


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
              className="m-h-[500px] z-10000 fixed bottom-0 top-0 right-2 left-2 my-auto mx-auto bg-accent1 rounded-lg border  border-colortheme md:max-w-2xl md:top-1/4 md:bottom-auto max-w-[calc(100%-8px)] max-h-[calc(100%-24px)]"
            >
              <div className="flex flex-none items-center w-full border-b border-accent2">
                <input
                  id="search-input"
                  className="p-4 w-full outline-none bg-transparent text-texthigh"
                  type="search" 
                  aria-label="Search"
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
                  className="text-xs after:content-['close'] md:after:content-['Esc'] p-4 mr-4 rounded-[4px] h-[20px] font-medium hover:bg-accent1 hover:text-texthigh text-textlow"
                  onClick={closeSearch}
                ></Button>
              </div>
              <div
              data-label-cards-container
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
                <template data-label-template>
    <div class="card">
      <div class="header" data-header></div>
      <div class="body" data-body></div>
    </div>
  </template>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default SearchBox;