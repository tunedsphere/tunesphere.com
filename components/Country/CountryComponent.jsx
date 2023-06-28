"use client";
import '@styles/globals.css';
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country } from 'country-state-city';
import countriesData from 'country-state-city/lib/assets/country.json';

const CountryComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const countries = countriesData;

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredCountries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Selected country:', selectedCountry);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
          Select Country
        </label>
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          id="country"
          name="country"
          value={selectedCountry}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select a country --</option>
          {searchTerm ? (
            searchResults.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))
          ) : (
            countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        Submit
      </button>
    </form>
  );
};
  
  export default CountryComponent;