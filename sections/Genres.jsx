'use client';

import { genres } from '@/constants/genres.js';
import { GenreCard } from '@/components';

const Genres = () => (
  <section className="relative z-10">
    <div
      className="relative mx-auto flex flex-col"
    >    
      <div className="mt-[50px] flex flex-col gap-[30px] py-8">
        {genres.map((item, index) => (
          <GenreCard key={`genre-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </div>
  </section>
);

export default Genres;
