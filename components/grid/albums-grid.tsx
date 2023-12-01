"use client"

import "@/styles/globals.css"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { albums } from '@/public/albumsData';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons/icons"
import { Separator } from "../ui/separator"
import { slugify } from "@/lib/utils"

interface AlbumsGridProps {
  selectedGenre: string | null; // Define the type of selectedGenre
  selectedYear: string | null; // Define the type of selectedYear
  selectedCountry: string | null;
}

export function AlbumsGrid({
selectedYear, 
selectedCountry,
selectedGenre, }: AlbumsGridProps) {
    const [selectedAlbum, setselectedAlbum] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
  const expandedLabelRef = useRef(null)


  const handleLabelClick = (labelIndex: number) => {
    setselectedAlbum((prevselectedAlbum) =>
      prevselectedAlbum === labelIndex.toString() ? null : labelIndex.toString()
    );
  }
  const yearOptions = Array.from(
    new Set(albums.flatMap((album) => album.release_date))
  )

  // Filter and sort the record albums based on selected filters
  const sortedAndFilteredAlbums = albums
    .filter((album) => {
      if (
        (selectedGenre === null || album.genre.includes(selectedGenre)) &&
        (selectedYear === null || album.release_date.includes(selectedYear)) &&
        (selectedCountry === null || album.country.includes(selectedCountry))
      ) {
        return true
      }
      return false
    })
    .sort((a, b) => a.title.localeCompare(b.title))
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (
            selectedAlbum !== null &&
            event.target instanceof Element &&
            event.target.closest(".expanded-label-container")
          ) {
            // Inside the expanded label container, do nothing
            return;
          }
          
          setselectedAlbum(null);
        }
      
        const handleEscapeKey = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            setselectedAlbum(null);
          }
        }
      

    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("click", handleOutsideClick)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [selectedAlbum])
  const initialColumnWidth = 200 // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth)

  const handleResize = (e: React.SyntheticEvent) => {
    setColumnWidth((e.target as HTMLDivElement).offsetWidth);
  }

  return (
<>
            <div
              id="albums-grid"
              className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted pl-4 pt-2 pb-12 pr-8 sm:pl-12 @container"
            >
              <div className="grid grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9">
                {sortedAndFilteredAlbums.map((album, index) => (
                  <React.Fragment key={index}>
                    <div
                      key={album.id}
                      className={`relative cursor-pointer items-center ${
                        selectedAlbum === index.toString() ? "" : ""
                      }`}
                      onClick={() => handleLabelClick(index)}
                    >
                      <Image
                        width={400}
                        height={400}
                        src={album.image}
                        alt={album.title}
                        className="my-4 cursor-pointer border border-muted aspect-square">
                        </Image>
                      <h1 className="cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-base">
                        {album.title}
                      </h1>
                      <p className="cursor-pointer text-xs text-textlow hover:text-theme">
                        {album.genre}
                      </p>
                      {String(selectedAlbum) === String(index) && (
    <div
      className="arrow-up absolute top-[96%] left-0 right-0 flex justify-center z-100 text-muted"
    >
      <Icons.chevronUp className="h-10 w-10"></Icons.chevronUp>
      
    </div>

  )}
                 {String(selectedAlbum) === String(index) && (
    <div
      className="arrow-up absolute top-[98%] left-0 right-0 flex justify-center z-100 text-accent"
    >
      <Icons.chevronUp className="h-10 w-10"></Icons.chevronUp>
      
    </div>

  )}
                    </div>
                    {String(selectedAlbum) === String(index) && (
                      <div
                        ref={expandedLabelRef}
                        className="sm:-ml-12 -ml-4 -mr-12 col-span-full hidden border-spacing-2 border-y-2 border-muted bg-accent py-8 @container @xs:block"
                      >

<div className="flex-1 gap-4 px-12">
  <div className="flex items-center">
    <div className="flex justify-center border-r-2 border-muted">
      <Link href={`album/${album.id}`} className="">
        <Image
          src={album.image}
          width={380}
          height={380}
          alt={album.id}
          className="cursor-pointer object-contain"
        />
      </Link>
    </div>
    <section className="flex flex-col w-full pl-8">

      <Link href={`artists/${slugify(album.artist)}`}>
      <div className={cn('group transition-colors flex cursor-pointer relative', { 'hovered': isHovered })}>
    <h2
      className="text-2xl hover:text-foreground/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {album.artist}{" "}
      <span className={cn('pl-4 arrow inline-block opacity-10 transition-opacity duration-300 ease-in-out', { ' opacity-100': isHovered })}>
        &gt;
      </span>
    </h2>
  </div>
      </Link>

      <Link href={`label/${album.id}`}>
        <h3 className="cursor-pointer text-2xl font-semibold text-primary">
          {album.title}
        </h3>
      </Link>
      
      <div className="flex text-sm">
        <p className="text-textlow">
          {album.release_date}
        </p>
        <span className="mx-2"> - </span>
        <p className="text-textlow">
          {album.genre}
        </p>

    </div>
 
  
  <div className="grid grid-cols-2 mt-4">
    {album.tracklist.map((track, index) => (
      <div key={index} className="flex justify-between text-sm text-textlow border-b py-2 border-muted mr-8">
        <span >
          {track.track} <span className="text-xs px-1"> - </span> {track.title}
        </span>
        <span>
          {track.length}
        </span>
      </div>
    ))}
  </div>
</section>
</div>
</div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
  )
}
