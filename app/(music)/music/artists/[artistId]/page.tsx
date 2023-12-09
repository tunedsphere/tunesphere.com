import Link from "next/link";
import React, { useEffect, useState } from "react";
import { type Metadata } from "next";
import { env } from "@/env.mjs";
import Image from "next/image";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Artist Page",
  description: "Artist Discography",
};
interface ArtistPageProps {
  params: {
    ArtistId: string;
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  return (
    <div
      id="artist-private-page"
      className="sm:music-grid music-grid-mobile scrollable-container grow overflow-y-scroll border-muted @container"
    >
      <section
        className="relative w-full h-[300px] bg-cover bg-center bg-muted"
        style={{
          backgroundImage: "/images/product-placeholder.webp",
        }}
      >
        <div className="flex px-4 md:px-6 h-full max-w-8xl mx-auto">
          <div className="flex space-y-2 py-4 text-left items-end">
            <Image
              alt="Artist Profile Picture"
              className="rounded-full"
              width={200}
              height={200}
              src="/images/product-placeholder.webp"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <h1 className="text-7xl font-bold tracking-tighter text-white ml-4 mb-8 py-4">
              Artist Name
            </h1>
          </div>
        </div>
      </section>
      <section className="container px-4 md:px-6 py-12 pl-4 pb-12 pr-8 sm:pl-12">
        <div className="mx-auto grid max-w-5xl divide-y divide-border rounded-lg border border-zinc-200 md:grid-cols-1 md:divide-x md:divide-y-0 dark:border-zinc-800">
          <div className="grid gap-1 p-8 md:p-10">
            <h2 className="text-xl font-bold">Biography</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              A brief description of the artist's background and musical style.
            </p>
          </div>
          <div className="grid gap-1 p-8 md:p-10">
            <h2 className="text-xl font-bold">Discography</h2>
            <ul className="list-none space-y-4 grid grid-cols-5 gap-4" />
          </div>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center py-12">
          <Link className="" href="#">
            <Icon
              name="facebook"
              className="inline-flex h-4 w-4 items-center justify-center rounded-md text-blue-500"
            />
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 ml-4"
            href="#"
          >
            Twitter
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700 disabled:pointer-events-none disabled:opacity-50 ml-4"
            href="#"
          >
            YouTube
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-pink-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-700 disabled:pointer-events-none disabled:opacity-50 ml-4"
            href="#"
          >
            Instagram
          </Link>
        </div>
      </section>
    </div>
  );
}
