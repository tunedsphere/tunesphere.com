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
import { ArtistTabs } from "@/components/pagers/artist-tabs";

interface ArtistLayoutPageProps {
  children: React.ReactNode;
  params: {
    ArtistId: string;
  };
  gridView: boolean;
  toggleGridMode: () => void;
  toggleListMode: () => void;
}

export default function ArtistLayoutPage({
  children,
  params,
}: ArtistLayoutPageProps) {
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
      <div
        id="artist-private-page"
        className="relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: 'url("/bggenre/milky-way.jpg")',
          backgroundRepeat: "repeat",
        }}
      >
        <section className="relative max-w-6xl mx-auto h-[260px]">
          {/* Background Image */}
          <Image
            src={"/bggenre/test-banner.jpg"}
            layout="fill"
            objectFit="cover"
            alt="Beautiful Forest"
          />
        </section>
        <section className="relative max-w-6xl mx-auto bg-background items-center align-middle border-b border-muted">
          <ArtistTabs ArtistId={ArtistId} />
        </section>
        {children}
      </div>
    </>
  );
}
