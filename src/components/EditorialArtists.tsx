import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Disc, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTISTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Lang } from './EditorialNav';

interface EditorialArtistsProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialArtists: React.FC<EditorialArtistsProps> = ({ lang }) => {
  return (
    <section
      id="artists"
      className="relative w-full bg-[#050508] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              ARTIST ROSTER // 07
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            EXCLUSIVE<br />
            <span className="font-extralight text-white/50">LABEL TALENT</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
          <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
            {lang === 'vi'
              ? 'Mỗi nghệ sĩ tại Spark Label được đồng hành chiến lược toàn diện: từ sản xuất âm nhạc, định hình hình tượng đến phát hành quốc tế.'
              : 'Every artist developed under Spark receives comprehensive incubation: production, visual identity, and international positioning.'}
          </p>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black text-[9.5px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span>{lang === 'vi' ? 'ĐẶT LỊCH NGHỆ SĨ' : 'BOOK AN ARTIST'}</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Editorial Portrait Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {ARTISTS_DATA.map((artist, idx) => (
          <motion.div
            key={artist.slug}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.12, duration: 1.2, ease: EXPO }}
            className="group flex flex-col space-y-6"
          >
            <Link
              to={`/artists/${artist.slug}`}
              className="block relative overflow-hidden rounded-3xl border border-white/[0.08] hover:border-spark-purple/40 transition-all duration-700 aspect-[4/5] bg-black/40"
            >
              <ImageWithFallback
                src={artist.portrait}
                alt={artist.name}
                fallbackLabel={artist.name}
                className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/30 to-transparent opacity-80" />

              {/* Latest release badge */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[8.5px] font-mono tracking-[0.2em] text-white/90 uppercase">
                <Disc size={11} className="text-spark-purple animate-spin" style={{ animationDuration: '6s' }} />
                <span>LATEST: {artist.latestRelease.title}</span>
              </div>

              {/* Action pill on hover */}
              <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-[9px] font-mono tracking-[0.24em] uppercase font-medium group-hover:bg-spark-purple group-hover:text-white transition-all duration-300 shadow-xl">
                <span>VIEW PROFILE</span>
                <ArrowRight size={12} />
              </div>

              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[8.5px] font-mono tracking-[0.3em] uppercase text-spark-purple block mb-1">
                  {artist.genre}
                </span>
                <h3 className="text-2xl md:text-3xl font-light tracking-[0.16em] uppercase text-white">
                  {artist.name}
                </h3>
                <span className="text-[9px] font-mono text-white/50 tracking-[0.2em] uppercase mt-1 block">
                  {artist.role} // {artist.releasesCount}
                </span>
              </div>
            </Link>

            {/* Quick Bio snippet */}
            <p className="text-xs font-light text-white/60 leading-relaxed font-sans px-2">
              {artist.bio[0]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
