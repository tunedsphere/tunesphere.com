"use client"

import "@styles/globals.css"

import React, { useEffect, useRef, useState } from "react"
import { Icons } from "@components/icons"

import { Button } from "@/components/ui/button"

export default function SearchBox({}) {
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false)
  const searchBoxRef = useRef(null)

  const handleSearchTriggerClick = () => {
    setSearchBoxVisible(!isSearchBoxVisible)
  }
  const closeSearch = () => {
    setSearchBoxVisible(false)
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSearch()
      }
    }

    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        closeSearch()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [closeSearch])

  return (
    <>
      <Button
        variant="nav"
        size="xs"
        className=""
        onClick={() => setSearchBoxVisible(!isSearchBoxVisible)}
      >
        <Icons.search className="search-trigger cursor-pointer object-contain" />
      </Button>
      {isSearchBoxVisible && (
        <div className="fixed inset-0 z-10000 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div
            ref={searchBoxRef}
            id="search-box"
            className="m-h-[500px] absolute bottom-0 left-2 right-2 top-0 z-40 mx-auto my-auto max-h-[calc(100%-24px)] max-w-[calc(100%-8px)] rounded-lg border border-theme bg-accent-1 md:bottom-auto md:top-1/4 md:max-w-2xl"
          >
            <div className="flex w-full flex-none items-center border-b border-accent-2">
              <input
                id="search-input"
                className="w-full bg-transparent p-4 text-texthigh outline-none"
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
                className="mr-4 h-[20px] rounded-[4px] p-4 text-xs font-medium text-textlow after:content-['close'] hover:bg-accent-1 hover:text-texthigh md:after:content-['Esc']"
                onClick={closeSearch}
              ></Button>
            </div>
            <div
              data-label-cards-container
              id="suggestions-container"
              role="listbox"
              aria-label="Suggestions"
              className="max-h-[400px] flex-1 overflow-y-auto p-2"
            >
              <div cmdk-list-sizer>
                <div
                  className="py-4 text-center text-sm text-textlow"
                  role="presentation"
                >
                  No results found for <span className="text-texthigh"></span>
                </div>
              </div>
              <template data-label-template>
                <div className="card">
                  <div className="header" data-header></div>
                  <div className="body" data-body></div>
                </div>
              </template>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
