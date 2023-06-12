"use client";
import '@styles/globals.css';
import React from 'react';
import { recordLabels } from '@public/data.js';

const SelectGenre = ({ selectedGenre, onGenreChange }) => {
  const handleGenreChange = (e) => {
    onGenreChange(e.target.value);
  };

  return (
    <div className='flex relative'>
    <div className='-z-10 -inset-1 absolute rounded-lg blur opacity-50 bg-colortheme'></div>
    <select
      className="h-10 items-center text-colortheme justify-between rounded-md border font-bold bg-background px-3 py-2 ring-offset-background focus:outline-none focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      value={selectedGenre || ''}
      onChange={handleGenreChange}
    >
      <option className='bg-accent1 text-colortheme font-normal' value="">Genre</option>
      
      {Array.from(new Set(recordLabels.flatMap((recordLabel) => recordLabel.genres))).map((genre) => (
        <option className="bg-accent1 font-normal divide-y divide-y-reverse" key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
    </div>
  );
};

export default SelectGenre;