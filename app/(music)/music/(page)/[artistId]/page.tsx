"use client";
import "@/styles/globals.css";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";

import { albums } from "@/public/albumsData";

import { Icon } from "@/components/icon";

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Artist Page",
//   description: "Artist Discography",
// };
interface ArtistPageProps {
  params: {
    ArtistId: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const ArtistId = String(params.ArtistId);
  const [gridView, setGridView] = useState(true);

  const toggleGridMode = () => {
    setGridView(true); // Set to grid view
  };

  const toggleListMode = () => {
    setGridView(false); // Set to list view
  };

  return (
    <>
      <div className="flex justify-end  items-center max-w-6xl mx-auto bg-background px-8 font-bold py-2">
        <div className="flex align-middle mr-[160px]">
          <Button
            variant="ghost"
            className={`rounded-full transition-colors hover:bg-muted/50 hover:text-foreground/80 ${
              !gridView ? "" : "bg-muted/70"
            }`}
            onClick={toggleGridMode}
          >
            <Icon name="page-layout" className="h-4 w-4" aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            className={`ml-2 rounded-full hover:bg-muted/50 transition-colors hover:text-foreground/80 ${
              gridView ? "" : "bg-muted/70"
            }`}
            onClick={toggleListMode}
          >
            <Icon name="list" className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{
          backgroundImage: "/images/product-placeholder.webp",
        }}
      >
        <div className="container mx-auto max-w-6xl flex pb-24 backdrop-blur-sm bg-background px-8">
          <div className="flex-grow flex-wrap @container pr-12">
            {gridView ? (
              <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 justify-around">
                {albums.map((album) => (
                  <div className="flex flex-col gap-y-2">
                    <Link href="/albums">
                      <Image
                        key={`album.id_image`}
                        src={"/images/product-placeholder.webp"}
                        alt="album.title"
                        className="cursor-pointer aspect-square rounded-md"
                        width={300}
                        height={300}
                        loading="lazy"
                      />
                    </Link>
                    <p className="text-base text-left font-bold break-words">
                      Title
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              albums.map((album) => (
                <div className="-mx-4 px-4 pb-20">
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
                    <div className="col-start-2 @lg:col-start-3 col-span-3 @lg:col-span-5 @2xl:pl-4">
                      <Link href={`label/${album.id}`}>
                        <h3 className="cursor-pointer  text-3xl @2xl:text-6xl font-semibold ">
                          {album.title}
                        </h3>
                      </Link>
                      <div className="flex text-sm">
                        <p className="text-textlow">{album.release_date}</p>
                        <span className="mx-2"> - </span>
                        <p className="text-textlow">{album.genre}</p>
                      </div>
                    </div>
                    <div className="@lg:col-start-1 col-span-full">
                      <div className="grid-flow-col">
                        <div className="flex justify-between text-base text-textlow border-b py-2 mb-4 border-muted">
                          <div className="px-4">
                            <span className="">#</span>{" "}
                            <span className="mx-1"> Title</span>
                          </div>
                        </div>
                        {album.tracklist.map((track, index) => (
                          <div
                            key={index}
                            className="flex align-center items-center justify-between text-base text-texthigh py-2 border-muted cursor-pointer hover:bg-muted/50 rounded-md"
                          >
                            <div className="flex-start">
                              <span className="px-4">
                                {track.track}{" "}
                                <span className="text-sm mx-1"> - </span>{" "}
                              </span>
                            </div>
                            <div className="flex flex-col flex-start grow">
                              {track.title}

                              <span className="text-sm text-textlow">
                                Track Artists
                              </span>
                            </div>
                            <div className="flex flex-end">
                              <span className="px-4">{track.length}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="shrink-0 w-[120px] ml-auto flex flex-col gap-2">
            <Image
              key={`artist.id_image`}
              src={"/images/product-placeholder.webp"}
              alt="album.title"
              className="cursor-pointer aspect-square rounded-md"
              width={120}
              height={120}
              loading="lazy"
            />
            <p id="band-name-location" className="break-words flex flex-col">
              <span className="font-bold">ArtistNameistoooooooooooooooooo</span>
              <span className="text-sm">Country</span>
            </p>
            <Button className="w-full">Follow</Button>
          </div>
        </div>
      </div>
    </>
  );
}
