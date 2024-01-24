'use client'
import '@/styles/globals.css'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useState } from 'react'

import { albums } from '@/public/albumsData'

import { Icon } from '@/components/icon'

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Artist Page",
//   description: "Artist Discography",
// };
interface ArtistPageProps {
  params: {
    ArtistId: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const ArtistId = String(params.ArtistId)
  const [gridView, setGridView] = useState(true)

  const toggleGridMode = () => {
    setGridView(true) // Set to grid view
  }

  const toggleListMode = () => {
    setGridView(false) // Set to list view
  }

  return (
    <>
      <div className="mx-auto flex  max-w-6xl items-center justify-end bg-background px-8 py-2 font-bold">
        <div className="mr-[160px] flex align-middle">
          <Button
            variant="ghost"
            className={`rounded-full transition-colors hover:bg-muted/50 hover:text-foreground/80 ${
              !gridView ? '' : 'bg-muted/70'
            }`}
            onClick={toggleGridMode}
          >
            <Icon name="page-layout" className="h-4 w-4" aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            className={`ml-2 rounded-full transition-colors hover:bg-muted/50 hover:text-foreground/80 ${
              gridView ? '' : 'bg-muted/70'
            }`}
            onClick={toggleListMode}
          >
            <Icon name="list" className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div
        className="flex items-center justify-center"
        style={{
          backgroundImage: '/images/product-placeholder.webp',
        }}
      >
        <div className="container mx-auto flex max-w-6xl bg-background px-8 pb-24 backdrop-blur-sm">
          <div className="flex-grow flex-wrap pr-12 @container">
            {gridView ? (
              <div className="grid grid-flow-row-dense grid-cols-1 justify-around gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {albums.map((album) => (
                  <div className="flex flex-col gap-y-2">
                    <Link href="/albums">
                      <Image
                        key={`album.id_image`}
                        src={'/images/product-placeholder.webp'}
                        alt="album.title"
                        className="aspect-square cursor-pointer rounded-md"
                        width={300}
                        height={300}
                        loading="lazy"
                      />
                    </Link>
                    <p className="break-words text-left text-base font-bold">
                      Title
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              albums.map((album) => (
                <div className="-mx-4 px-4 pb-20">
                  <div className="grid grid-cols-2 grid-rows-[min-content_1fr] gap-4 @container @xs:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-8 @6xl:grid-cols-6 @7xl:grid-cols-7 @8xl:grid-cols-8 @9xl:grid-cols-9">
                    <div className="@md:col-span-1 @lg:col-span-2 @lg:row-span-2 @xl:row-span-2 @6xl:col-span-2">
                      <Image
                        width={500}
                        height={500}
                        src={album.image}
                        alt={album.title}
                        className="aspect-square cursor-pointer rounded-md border "
                      ></Image>
                    </div>
                    <div className="col-span-3 col-start-2 @lg:col-span-5 @lg:col-start-3 @2xl:pl-4">
                      <Link href={`label/${album.id}`}>
                        <h3 className="cursor-pointer  text-3xl font-semibold @2xl:text-6xl ">
                          {album.title}
                        </h3>
                      </Link>
                      <div className="flex text-sm">
                        <p className="text-textlow">{album.release_date}</p>
                        <span className="mx-2"> - </span>
                        <p className="text-textlow">{album.genre}</p>
                      </div>
                    </div>
                    <div className="col-span-full @lg:col-start-1">
                      <div className="grid-flow-col">
                        <div className="mb-4 flex justify-between border-b  py-2 text-base text-textlow">
                          <div className="px-4">
                            <span className="">#</span>{' '}
                            <span className="mx-1"> Title</span>
                          </div>
                        </div>
                        {album.tracklist.map((track, index) => (
                          <div
                            key={index}
                            className="align-center flex cursor-pointer items-center justify-between rounded-md  py-2 text-base text-texthigh hover:bg-muted/50"
                          >
                            <div className="flex-start">
                              <span className="px-4">
                                {track.track}{' '}
                                <span className="mx-1 text-sm"> - </span>{' '}
                              </span>
                            </div>
                            <div className="flex-start flex grow flex-col">
                              {track.title}

                              <span className="text-sm text-textlow">
                                Track Artists
                              </span>
                            </div>
                            <div className="flex-end flex">
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

          <div className="ml-auto flex w-[120px] shrink-0 flex-col gap-2">
            <Image
              key={`artist.id_image`}
              src={'/images/product-placeholder.webp'}
              alt="album.title"
              className="aspect-square cursor-pointer rounded-md"
              width={120}
              height={120}
              loading="lazy"
            />
            <p id="band-name-location" className="flex flex-col break-words">
              <span className="font-bold">ArtistNameistoooooooooooooooooo</span>
              <span className="text-sm">Country</span>
            </p>
            <Button className="w-full">Follow</Button>
          </div>
        </div>
      </div>
    </>
  )
}
