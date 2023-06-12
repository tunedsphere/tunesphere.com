"use client";
import '@styles/globals.css';
import React from 'react';
import { recordLabels } from '@public/data.js';

const SelectYear = ({ selectedYear, onYearChange }) => {
  const handleYearChange = (e) => {
    onYearChange(e.target.value);
  };

  return (
    <div className='flex relative'>
    <div className='-z-10 -inset-1 absolute rounded-lg blur opacity-50 bg-colortheme'></div>
    <select
      className="space-x-5 cursor-pointer h-10 font-bold bg-background items-center justify-between text-primary rounded-md border border-input px-3 py-2  ring-offset-background focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      value={selectedYear || ''}
      onChange={handleYearChange}
    >
      <option className='bg-accent1' value="">Year</option>
      {Array.from(new Set(recordLabels.flatMap((recordLabel) => recordLabel.founding_year))).map((year) => (
        <option className='bg-accent1' key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
    
    </div>
    
  );
};

export default SelectYear;