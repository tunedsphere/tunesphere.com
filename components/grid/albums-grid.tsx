'use client'

import '@/styles/globals.css'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { albums } from '@/public/albumsData'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'
import { slugify } from '@/lib/utils'
import { MusicOptionsBanner } from '../music-options-banner'
import { AlbumCoverCard } from '../cards/album-cover-card'
interface AlbumsGridProps {
  selectedGenre: string | null // Define the type of selectedGenre
  selectedYear: string | null // Define the type of selectedYear
  selectedCountry: string | null
}

export function AlbumsGrid({
  selectedYear,
  selectedCountry,
  selectedGenre,
}: AlbumsGridProps) {
  const [selectedAlbum, setselectedAlbum] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const expandedLabelRef = useRef(null)

  const handleLabelClick = (labelIndex: number) => {
    setselectedAlbum((prevselectedAlbum) =>
      prevselectedAlbum === labelIndex.toString()
        ? null
        : labelIndex.toString(),
    )
  }
  const yearOptions = Array.from(
    new Set(albums.flatMap((album) => album.release_date)),
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
        event.target.closest('.expanded-label-container')
      ) {
        // Inside the expanded label container, do nothing
        return
      }

      setselectedAlbum(null)
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setselectedAlbum(null)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [selectedAlbum])
  const initialColumnWidth = 200 // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth)

  const handleResize = (e: React.SyntheticEvent) => {
    setColumnWidth((e.target as HTMLDivElement).offsetWidth)
  }

  return (
    <>
      <div
        id="albums-grid"
        className="sm:music-grid music-grid-mobile scrollable-container grow overflow-y-scroll  @container"
      >
        <div className="my-4 grid grid-flow-row-dense grid-cols-2 gap-4 px-4 pb-12 @sm:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-5 @6xl:grid-cols-6 @7xl:grid-cols-7 @8xl:grid-cols-8 @9xl:grid-cols-9 md:px-12">
          {sortedAndFilteredAlbums.map((album, index) => (
            <React.Fragment key={index}>
              <AlbumCoverCard
                key={album.id}
                image={album.image}
                artist={album.artist}
                title={album.title}
                selectedAlbum={
                  selectedAlbum === index.toString() ? 'inset-y-2' : ''
                }
                onClick={() => handleLabelClick(index)}
              />

              {String(selectedAlbum) === String(index) && (
                <div
                  ref={expandedLabelRef}
                  className="col-span-full -mx-8 border-spacing-2 border-y-2  bg-gray-100 px-8 py-12 @container @xs:block dark:bg-gray-900/50 md:-mx-12 md:px-12"
                >
                  <div className="grid grid-cols-2 grid-rows-[min-content_1fr] gap-4 @xs:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-8 @6xl:grid-cols-6 @7xl:grid-cols-7 @8xl:grid-cols-8 @9xl:grid-cols-9">
                    <div className="mx-auto items-center align-middle @md:col-span-1 @lg:col-span-2 @lg:row-span-2 @xl:row-span-2 @6xl:col-span-2">
                      <Image
                        width={400}
                        height={400}
                        src={album.image}
                        alt={album.title}
                        className="aspect-square cursor-pointer rounded-md border  @9xl:w-[800px]"
                      ></Image>
                    </div>
                    <div className="col-span-3 col-start-2 @lg:col-start-3 @6xl:col-span-4 @6xl:pl-4 @7xl:col-span-5 @8xl:col-span-6 @9xl:col-span-7">
                      <h3 className="7xl:text-6xl 8xl:text-8xl cursor-pointer text-3xl font-semibold">
                        {album.title}
                      </h3>
                      <Link href={`${slugify(album.artist)}`}>
                        <div
                          className={cn(
                            'group relative flex cursor-pointer flex-wrap transition-colors',
                            { hovered: isHovered },
                          )}
                        >
                          <h2
                            className="7xl:text-6xl 8xl:text-8xl break-words text-3xl text-cyan-400 hover:text-foreground/80 dark:text-violet-500"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            {album.artist}{' '}
                            <span
                              className={cn(
                                'arrow inline-block pl-4 opacity-10 transition-opacity duration-300 ease-in-out',
                                { ' opacity-100': isHovered },
                              )}
                            >
                              &gt;
                            </span>
                          </h2>
                        </div>
                      </Link>
                      <div className="7xl:text-3xl 8xl:text-4xl flex text-sm">
                        <p className="text-textlow">{album.release_date}</p>
                        <span className="mx-2"> - </span>
                        <p className="text-textlow">{album.genre}</p>
                      </div>
                    </div>
                    <div className="col-span-full @lg:col-start-3">
                      <div className="6xl:gap-8 grid-flow-col px-2 @6xl:mr-4 @6xl:grid @6xl:grid-cols-2 @6xl:px-6">
                        {album.tracklist.map((track, index) => (
                          <div
                            key={index}
                            className={`7xl:text-3xl 8xl:text-4xl flex  justify-between border-b py-2 text-base text-texthigh ${
                              index < Math.ceil(album.tracklist.length / 2)
                                ? '@6xl:col-span-1 @6xl:col-start-1 @6xl:mr-4'
                                : '@6xl:col-span-1 @6xl:col-start-2 @6xl:ml-4'
                            }`}
                          >
                            <span>
                              {track.track}{' '}
                              <span className="7xl:text-3xl 8xl:text-4xl mx-1 text-sm">
                                {' '}
                                -{' '}
                              </span>{' '}
                              {track.title}
                            </span>
                            <span>{track.length}</span>
                          </div>
                        ))}
                      </div>
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
