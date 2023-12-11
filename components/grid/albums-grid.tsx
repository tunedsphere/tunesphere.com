"use client";

import "@/styles/globals.css";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { albums } from "@/public/albumsData";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { slugify } from "@/lib/utils";

interface AlbumsGridProps {
  selectedGenre: string | null; // Define the type of selectedGenre
  selectedYear: string | null; // Define the type of selectedYear
  selectedCountry: string | null;
}

export function AlbumsGrid({
  selectedYear,
  selectedCountry,
  selectedGenre,
}: AlbumsGridProps) {
  const [selectedAlbum, setselectedAlbum] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const expandedLabelRef = useRef(null);

  const handleLabelClick = (labelIndex: number) => {
    setselectedAlbum((prevselectedAlbum) =>
      prevselectedAlbum === labelIndex.toString() ? null : labelIndex.toString()
    );
  };
  const yearOptions = Array.from(
    new Set(albums.flatMap((album) => album.release_date))
  );

  // Filter and sort the record albums based on selected filters
  const sortedAndFilteredAlbums = albums
    .filter((album) => {
      if (
        (selectedGenre === null || album.genre.includes(selectedGenre)) &&
        (selectedYear === null || album.release_date.includes(selectedYear)) &&
        (selectedCountry === null || album.country.includes(selectedCountry))
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
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
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setselectedAlbum(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [selectedAlbum]);
  const initialColumnWidth = 200; // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth);

  const handleResize = (e: React.SyntheticEvent) => {
    setColumnWidth((e.target as HTMLDivElement).offsetWidth);
  };

  return (
    <>
      <div
        id="albums-grid"
        className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted pl-4 pt-2 pb-12 pr-4 @container"
      >
        <div className="grid grid-flow-row-dense gap-4 grid-cols-2 @sm:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 @5xl:grid-cols-5 @6xl:grid-cols-6 @7xl:grid-cols-7 @8xl:grid-cols-8 @9xl:grid-cols-9">
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
                  className="my-4 cursor-pointer border border-muted aspect-square rounded-md"
                ></Image>
                <h1 className="cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-base">
                  {album.title}
                </h1>
                <p className="cursor-pointer text-sm text-textlow hover:text-theme">
                  {album.artist}
                </p>
                {String(selectedAlbum) === String(index) && (
                  <div className="arrow-up absolute top-[96%] left-0 right-0 flex justify-center z-100 text-muted">
                    <Icon name="chevron-up" className="h-10 w-10" />
                  </div>
                )}
                {String(selectedAlbum) === String(index) && (
                  <div className="arrow-up absolute top-[98%] left-0 right-0 flex justify-center z-100 text-gray-100 dark:text-gray-900/50">
                    <Icon name="chevron-up" className="h-10 w-10" />
                  </div>
                )}
              </div>
              {String(selectedAlbum) === String(index) && (
                <div
                  ref={expandedLabelRef}
                  className="-mx-4 px-4 col-span-full border-spacing-2 border-y-2 border-muted bg-gray-100 dark:bg-gray-900/50 py-8 @container @xs:block"
                >
                  <div className="@container grid grid-rows-[min-content_1fr] gap-4 grid-cols-2 @xs:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-8 @6xl:grid-cols-6 @7xl:grid-cols-7 @8xl:grid-cols-8 @9xl:grid-cols-9">
                    <div className="@md:col-span-1 @xl:row-span-2 @lg:row-span-2 @lg:col-span-2 @6xl:col-span-2">
                      <Image
                        width={500}
                        height={500}
                        src={album.image}
                        alt={album.title}
                        className="cursor-pointer border border-muted aspect-square rounded-md"
                      ></Image>
                    </div>
                    <div className="col-start-2 @lg:col-start-3 col-span-3 @6xl:pl-4 @6xl:col-span-4 @7xl:col-span-5 @8xl:col-span-6 @9xl:col-span-7">
                      <Link href={`label/${album.id}`}>
                        <h3 className="cursor-pointer text-3xl font-semibold ">
                          {album.title}
                        </h3>
                      </Link>
                      <Link href={`artists/${slugify(album.artist)}`}>
                        <div
                          className={cn(
                            "group transition-colors flex cursor-pointer relative",
                            { hovered: isHovered }
                          )}
                        >
                          <h2
                            className="text-3xl hover:text-foreground/80 text-cyan-400 dark:text-violet-500"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            {album.artist}{" "}
                            <span
                              className={cn(
                                "pl-4 arrow inline-block opacity-10 transition-opacity duration-300 ease-in-out",
                                { " opacity-100": isHovered }
                              )}
                            >
                              &gt;
                            </span>
                          </h2>
                        </div>
                      </Link>
                      <div className="flex text-sm">
                        <p className="text-textlow">{album.release_date}</p>
                        <span className="mx-2"> - </span>
                        <p className="text-textlow">{album.genre}</p>
                      </div>
                    </div>
                    <div className="@lg:col-start-3 col-span-full">
                      <div className="@6xl:grid @6xl:grid-cols-2 px-2 @6xl:px-6 @6xl:mr-4 grid-flow-col">
                        {album.tracklist.map((track, index) => (
                          <div
                            key={index}
                            className={`flex justify-between text-base text-texthigh border-b py-2 border-muted ${
                              index < Math.ceil(album.tracklist.length / 2)
                                ? "@6xl:col-span-1 @6xl:col-start-1 @6xl:mr-4"
                                : "@6xl:col-span-1 @6xl:col-start-2 @6xl:ml-4"
                            }`}
                          >
                            <span>
                              {track.track}{" "}
                              <span className="text-sm mx-1"> - </span>{" "}
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
  );
}
