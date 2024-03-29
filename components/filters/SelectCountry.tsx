"use client";
import '@styles/globals.css';
import React from 'react';
import { recordLabelsData } from '@/public/recordLabelsData';


interface SelectCountryProps {
  selectedCountry: string;
  onCountryChange: (newCountry: string) => void;
}

export default function SelectCountry({ selectedCountry, onCountryChange }: SelectCountryProps) {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(e.target.value);
  };
  return (
    <div className='flex relative'>
    <div className='-z-10 -inset-1 absolute rounded-lg blur opacity-50 bg-colortheme'></div>
    <select
      className="space-x-5 cursor-pointer font-bold h-10 bg-background items-center justify-between rounded-md border border-input px-3 py-2 ring-offset-background focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      value={selectedCountry || ''}
      onChange={handleCountryChange}
    >
      <option className='bg-accent1' value="">Country</option>
      {Array.from(new Set(recordLabelsData.flatMap((recordLabel) => recordLabel.country))).map((country) => (
        <option className='bg-accent1 font-normal' key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
    
    </div>
    
  );
};
