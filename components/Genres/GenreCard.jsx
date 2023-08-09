"use client"

import "@/styles/globals.css"
import "@/components/Genres/genrecard.css"

const GenreCard = ({ imgUrl, title, description, notableAlbums }) => (
  <div className="flex-col  gap-4 @container md:flex-row">
    <div
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between p-4 text-white">
        <div className="flex flex-col items-center divide-y py-8 text-justify font-mono md:ml-[62px] ">
          <h4 className="genre-title text-primary-text hover:text-primary-hover max-w-[300x] cursor-pointer px-8 font-mono text-[26px] lg:text-[48px]">
            {title}
          </h4>
          <p className="bg-accent-0 text-primary-text mt-[16px] bg-opacity-50 px-8 py-8 text-[14px] font-normal lg:text-[20px]">
            {description}
          </p>
          {notableAlbums && notableAlbums.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-4 py-8 @container sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              {notableAlbums[0].albums.map((album, albumIndex) => (
                <div key={albumIndex} className="album-item">
                  <div className="album-image-container">
                    <img
                      src={album.imgUrl}
                      alt={album.title}
                      className="album-image"
                    />
                  </div>
                  <h5 className="album-title">{album.title}</h5>
                  <p className="album-artist">{album.artist}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No notable albums available.</p>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default GenreCard
