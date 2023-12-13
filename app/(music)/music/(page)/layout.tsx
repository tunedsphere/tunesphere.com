"use client";
import "@/styles/globals.css";
import * as React from "react";
import { useState } from "react";

import { MusicTabs } from "@/components/pagers/music-tabs";

interface MusicLayoutPageProps {
  children: React.ReactNode;
}

export default function MusicLayoutPage({ children }: MusicLayoutPageProps) {
  const [selectedTab, setSelectedTab] = useState("Home");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <section className="mt-[var(--headerHeight)]">
      <div className="">
        <div className="relative mx-auto flex items-center justify-center">
          <div className="inset-x-0 mx-auto flex justify-center gap-2 overflow-x-hidden">
            <MusicTabs onTabChange={handleTabChange} />
          </div>
        </div>
        <main className="flex-1 border-t border-b border-muted @container">
          {children}
        </main>
      </div>
    </section>
  );
}
