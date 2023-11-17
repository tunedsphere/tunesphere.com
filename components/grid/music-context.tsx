"use client"
import React, { createContext, useContext, ReactNode } from "react";

interface MusicContextProps {
  selectedYear: string | null
  selectedCountry: string | null
  selectedGenre: string | null
  children: ReactNode;
}

const MusicContext = createContext<Partial<MusicContextProps>>({});

export const useMusicContext = () => {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    throw new Error('MusicContext: No value provided');
  }

  return musicContext;
};

export const MusicProvider: React.FC<MusicContextProps> = ({
  selectedYear,
  selectedCountry,
  selectedGenre,
  children,
}: MusicContextProps) => {
  return (
    <MusicContext.Provider value={{ selectedYear, selectedCountry, selectedGenre }}>
      {children}
    </MusicContext.Provider>
  );
};