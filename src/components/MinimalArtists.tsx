import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ARTISTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage, Lang } from '@/lib/LanguageContext';

interface MinimalArtistsProps {
  lang?: Lang;
}

export const MinimalArtists: React.FC<MinimalArtistsProps> = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="artists"
      className="relative w-full bg-[#F6F6F4] py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '06 / NGHỆ SĨ' : '06 / ARTISTS'}
          </motion.span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5E5] pb-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-condensed font-extrabold text-[clamp(2.5rem,7vw,7.2rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
            >
              {lang === 'vi' ? (
                <>
                  NGHỆ SĨ<span className="text-[#7C3AED]">.</span>
                </>
              ) : (
                <>
                  THE<br />
                  <span className="font-extrabold text-[#0A0A0A] inline-block pt-1">ARTISTS</span><span className="text-[#7C3AED]">.</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-condensed text-xs md:text-sm tracking-[0.28em] uppercase text-[#666666] font-semibold max-w-md md:text-right"
            >
              {lang === 'vi'
                ? 'THẾ HỆ ÂM NHẠC TIẾP THEO. TIẾNG NÓI MỚI · TÀI NĂNG MỚI.'
                : 'THE NEXT GENERATION OF MUSIC. NEW VOICES · NEW SOUND.'}
            </motion.p>
          </div>
        </div>

        {/* Selected Artists with Large Editorial Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 2xl:gap-32">
          {ARTISTS_DATA.map((artist, idx) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.14, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/artists/${artist.slug}`} className="group block">
                {/* Large Editorial Portrait on white canvas */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-white border border-[#E5E5E5] shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
                  <ImageWithFallback
                    src={artist.portrait}
                    alt={artist.name}
                    fallbackLabel={artist.name}
                    className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter contrast-[1.05]"
                  />
                  <div className="absolute top-6 left-6 px-3 py-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E5] text-xs font-condensed tracking-widest text-[#0A0A0A] uppercase font-bold">
                    0{idx + 1}
                  </div>
                </div>

                {/* Minimal Editorial Artist Info with YG condensed punch */}
                <div className="mt-8 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-condensed text-3xl md:text-5xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors duration-300 leading-none">
                      {artist.name}
                    </h3>
                    <p className="mt-2 font-condensed text-xs md:text-sm tracking-[0.26em] uppercase text-[#666666] font-semibold">
                      {artist.role} · {artist.genre}
                    </p>
                  </div>

                  <span className="font-condensed text-xs tracking-[0.26em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all duration-300 font-bold">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
