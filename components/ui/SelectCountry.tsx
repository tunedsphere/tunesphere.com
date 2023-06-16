"use client";
import '@styles/globals.css';
import * as React from 'react';
import { recordLabels } from '@public/data.js';

interface SelectCountryProps {
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({ selectedCountry, onCountryChange }) => {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(e.target.value);
  };

  return (
    <div className='flex relative'>
      <div className='-z-10 -inset-1 absolute rounded-lg blur opacity-50 bg-colortheme'></div>
      <select
        className="space-x-5 cursor-pointer font-bold h-10 bg-background items-center justify-between rounded-md border border-input px-3 py-2 ring-offset-background focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option className='bg-accent1' value="">Country</option>
        {Array.from(new Set(recordLabels.flatMap((recordLabel) => recordLabel.country))).map((country) => (
          <option className='bg-accent1 font-normal' key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCountry;