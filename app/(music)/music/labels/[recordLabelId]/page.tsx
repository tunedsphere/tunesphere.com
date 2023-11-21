
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { recordLabelsData } from '@/public/recordLabelsData';
import { type Metadata } from "next"
import { notFound } from 'next/navigation';
import { env } from "@/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "RecordLabel Page",
  description: "RecordLabel Discography",
}

interface RecordLabelPageProps {
  params: {
    recordLabelId: string;
  };
}

export default async function RecordLabelPage({
  params,
}: RecordLabelPageProps) {
  const recordLabelId = params.recordLabelId;
  const recordLabel = recordLabelsData.find((label) => label.id === recordLabelId);

  if (!recordLabel) {
    notFound();
    return null; // Return early to prevent further execution
  }


  return (
<>
<div
        id="recordLabel-page"
        className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted pl-4 pt-2 pb-12 pr-8 @container sm:pl-12"
      >
          <section
            className="w-full h-[500px] py-12 md:py-24 lg:py-32 bg-cover bg-center bg-slate-600"
            style={{
              backgroundImage: "/images/product-placeholder.webp",
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-8 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">{recordLabel.name}</h1>
                <img
                  alt="RecordLabel Profile Picture"
                  className="rounded-full"
                  height="200"
                  src={recordLabel.image}
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-4 px-4 md:px-6 py-12">
            <div className="mx-auto grid max-w-5xl rounded-lg border border-muted md:grid-cols-1">
              <div className="grid gap-1 p-8 md:p-10">
                <h2 className="text-xl font-bold">Biography</h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {recordLabel.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl rounded-lg border border-muted md:grid-cols-1">
              <div className="grid p-8 md:p-10">
                <h2 className="text-xl font-bold">Discography</h2>
              </div>
              <div>
              <ul className="list-none grid grid-cols-5 gap-2 py-4">
  {recordLabel.discography.map((item: { title: string; release_date: string; artists: string[] }, index: number) => (
    <li key={index} className="flex flex-col items-center space-y-4">
      {/* Rest of your code */}
    </li>
  ))}
</ul>

              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center py-12">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                href="#"
              >
                Facebook
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
</>
  )
}