"use client";
import "@/styles/globals.css";

import Link from "next/link";
import { type Metadata } from "next";
import { env } from "@/env.mjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { albums } from "@/public/albumsData";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { slugify } from "@/lib/utils";

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

export default function ArtistMerchPage({ params }: ArtistPageProps) {
  return (
    <div className="container mx-auto max-w-6xl flex pt-8 pb-24 backdrop-blur-sm bg-background px-8 min-h-[600px]">
      <div className="flex-grow flex-wrap @container pr-12">MERCH PLACE</div>
    </div>
  );
}
