import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Lang } from './MinimalNav';

interface MinimalLabelProps {
  lang: Lang;
}

export const MinimalLabel: React.FC<MinimalLabelProps> = ({ lang }) => {
  const releases = [
    {
      title: 'AETHEL - RESONANCE',
      type: 'ALBUM · 2026',
      artist: 'LYRA NGUYEN',
      art: ASSETS.artistLyra,
      slug: 'lyra-nguyen',
    },
    {
      title: 'MIDNIGHT TAPES',
      type: 'EP · 2026',
      artist: 'MINH VU',
      art: ASSETS.artistMinh,
      slug: 'minh-vu',
    },
  ];

  return (
    <section
      id="label"
      className="relative w-full bg-[#050507] py-32 md:py-48 px-6 md:px-12 lg:px-20 text-[#FAF8F5] border-t border-white/[0.04]"
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Subtle section label */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.04] pb-8 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#FAF8F5]/40 block mb-3 font-normal">
              {lang === 'vi' ? 'HÃNG ĐĨA & NGHỆ SĨ' : 'RECORD LABEL & TALENT'}
            </span>
            <h2 className="text-[clamp(2.5rem,6.5vw,6.5rem)] font-light tracking-[0.04em] uppercase text-[#FAF8F5] leading-none select-none">
              SPARK <span className="font-light italic text-[#FAF8F5]/90">LABEL.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#8B5CF6] block font-light">
              ARTIST DEVELOPMENT · MUSIC RELEASES
            </span>
            <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light tracking-[0.04em] max-w-sm">
              {lang === 'vi'
                ? 'Đồng hành chiến lược cùng thế hệ nghệ sĩ định hình bản sắc âm thanh đương đại.'
                : 'Strategic artist incubation and worldwide release curation for the modern sonic vanguard.'}
            </p>
          </div>
        </div>

        {/* Culture Statement */}
        <div className="mb-16 md:mb-24">
          <p className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.02em] uppercase text-[#FAF8F5] leading-snug max-w-4xl">
            WE DO NOT JUST RELEASE MUSIC.{' '}
            <span className="font-light italic text-[#FAF8F5]/70">
              WE BUILD ARTIST CAREERS FROM FIRST DEMO TO WORLD STAGES.
            </span>
          </p>
        </div>

        {/* Selected Label Releases / Artist Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 2xl:gap-24">
          {releases.map((rel, idx) => (
            <motion.div
              key={rel.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.12, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/artists/${rel.slug}`} className="group block">
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-[#0a0a0f]">
                  <ImageWithFallback
                    src={rel.art}
                    alt={rel.title}
                    fallbackLabel={rel.title}
                    className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] tracking-[0.24em] uppercase text-[#8B5CF6] block mb-1">
                        {rel.type}
                      </span>
                      <h3 className="text-xl md:text-2xl font-light tracking-[0.06em] uppercase text-[#FAF8F5] group-hover:text-white transition-colors">
                        {rel.title}
                      </h3>
                      <p className="mt-1 text-xs tracking-[0.2em] uppercase text-[#FAF8F5]/60 font-light">
                        {rel.artist}
                      </p>
                    </div>
                    <span className="text-xs tracking-[0.2em] text-[#FAF8F5]/40 group-hover:text-[#FAF8F5] group-hover:translate-x-1 transition-all duration-400">
                      DISCOGRAPHY →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
