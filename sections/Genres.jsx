'use client';

import { motion } from 'framer-motion';
import { genres } from '../constants/genres.js';
import { staggerContainer } from '../utils/motion';
import { GenreCard } from '@components';

const Genres = () => (
  <section className="relative z-10">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative mx-auto flex flex-col"
    >
      
      
      <div className="mt-[50px] flex flex-col gap-[30px] py-8">
        {genres.map((item, index) => (
          <GenreCard key={`genre-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Genres;
