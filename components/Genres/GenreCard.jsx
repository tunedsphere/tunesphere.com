'use client';
import '@styles/globals.css';
import '@components/Genres/genrecard.css';

const GenreCard = ({ imgUrl, title, description, notableAlbums}) => (
  <div
    className="@container  md:flex-row flex-col gap-4"
  >
      <div
    className="relative w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${imgUrl})` }}
  >
   
    <div className="w-full flex justify-between items-center max-w-[1600px] mx-auto p-4 text-white">
      <div className="font-mono text-justify md:ml-[62px] flex flex-col divide-y items-center py-8 ">
        <h4 className="max-w-[300x] genre-title font-mono px-8 cursor-pointer lg:text-[48px] text-[26px] text-primary-text hover:text-primary-hover">
          {title}
        </h4>
        <p className="bg-opacity-50 bg-accent0 mt-[16px] font-normal lg:text-[20px] text-[14px] text-primary-text px-8 py-8">
          {description}
        </p>
        {notableAlbums && notableAlbums.length > 0 ? (
            <div className="@container w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 py-8">
              {notableAlbums[0].albums.map((album, albumIndex) => (
                <div key={albumIndex} className="album-item">
                  <div className='album-image-container'>
                  <img src={album.imgUrl} alt={album.title} className="album-image" />
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

);

export default GenreCard;
