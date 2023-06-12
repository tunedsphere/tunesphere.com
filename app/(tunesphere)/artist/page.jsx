"use client";

import React, { useState } from 'react';


const ArtistPage = () => {
  const [expandedAlbum, setExpandedAlbum] = useState(null);

  const handleAlbumClick = (albumId) => {
    setExpandedAlbum(albumId === expandedAlbum ? null : albumId);
  };

  const albums = [
    {
      id: 1,
      title: 'Album Title 1',
      releaseDate: 'Release Date 1',
      tracks: ['Track 1', 'Track 2', 'Track 3'],
      cover: '/album-cover-1.jpg',
    },
    {
      id: 2,
      title: 'Album Title 2',
      releaseDate: 'Release Date 2',
      tracks: ['Track 4', 'Track 5', 'Track 6'],
      cover: '/album-cover-2.jpg',
    },
  ];
  return (
    <div className="bg-gray-100">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="container mx-auto py-6 px-6">
          <h1 className="text-4xl font-bold text-white">Welcome to Artist Name</h1>
          <p className="text-lg text-white mt-2">Discover and support our music</p>
          <div className="mt-6">
            <button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-3 rounded-lg">
              Listen Now
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold text-gray-800">Artist Name</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto py-8 px-6">
        <div className="flex flex-wrap -mx-4">
          {/* Left column */}
          <div className="w-full md:w-2/3 px-4">
            {/* Discography section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Discography</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className={`bg-white rounded-lg p-4 shadow-md ${
                      expandedAlbum === album.id ? 'md:col-span-2' : ''
                    }`}
                    onClick={() => handleAlbumClick(album.id)}
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-auto rounded-lg"
                    />
                    <h3 className="text-xl font-semibold mt-2">{album.title}</h3>
                    <p className="text-gray-600">{album.releaseDate}</p>
                    {expandedAlbum === album.id && (
                      <ul className="mt-4">
                        {album.tracks.map((track, index) => (
                          <li key={index} className="text-gray-600">
                            {track}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
          {/* Right column */}
          <div className="w-full md:w-1/3 px-4">
            <section className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                venenatis lobortis mauris, ac pharetra ligula iaculis non. Nullam
                sit amet risus eget dolor ullamcorper consequat. Quisque tincidunt
                velit sit amet libero eleifend, id scelerisque turpis facilisis.
                Fusce consectetur tincidunt diam, sit amet efficitur arcu semper
                vel. Integer posuere, felis nec egestas venenatis, odio nunc
                lacinia velit, in laoreet dui felis at purus.
              </p>
            </section>
            <section className="bg-white rounded-lg p-4 shadow-md mt-8">
              <h2 className="text-2xl font-bold mb-4">Social Media</h2>
              <div className="flex mt-4">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 mr-4"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 mr-4"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Instagram
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ArtistPage;