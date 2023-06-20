"use client";
import { useState } from 'react';

const Sidebar = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-200 h-screen p-4">
      <div className="mb-4">
        <label htmlFor="genre">Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="w-full"
        >
          {/* Genre options */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full"
        >
          {/* Year options */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="w-full"
        >
          {/* Country options */}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;