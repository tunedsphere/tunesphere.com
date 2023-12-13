"use client";
import "@/styles/globals.css";
import Image from "next/image";
import * as React from "react";

import { ArtistTabs } from "@/components/pagers/artist-tabs";

interface ArtistLayoutPageProps {
  children: React.ReactNode;
}

export default function ArtistLayoutPage({ children }: ArtistLayoutPageProps) {
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
          <ArtistTabs />
        </section>
        {children}
      </div>
    </>
  );
}
