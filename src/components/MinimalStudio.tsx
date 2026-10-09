import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Lang } from './MinimalNav';

interface MinimalStudioProps {
  lang: Lang;
}

export const MinimalStudio: React.FC<MinimalStudioProps> = ({ lang }) => {
  return (
    <section
      id="studio"
      className="relative w-full bg-[#050507] py-32 md:py-48 px-6 md:px-12 lg:px-20 text-[#FAF8F5] border-t border-white/[0.04]"
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Subtle section identifier */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.04] pb-8 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#FAF8F5]/40 block mb-3 font-normal">
              {lang === 'vi' ? 'TRUNG TÂM SẢN XUẤT' : 'PRODUCTION HEART'}
            </span>
            <h2 className="text-[clamp(2.5rem,6.5vw,6.5rem)] font-light tracking-[-0.01em] uppercase text-[#FAF8F5] leading-none select-none">
              SPARK <span className="font-medium">STUDIO</span><span className="text-[#8B5CF6]">.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#8B5CF6] block font-medium">
              RECORDING · PRODUCTION · MEDIA
            </span>
            <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light tracking-[0.04em] max-w-sm">
              {lang === 'vi'
                ? 'Thu âm · Sản xuất âm nhạc · Mix & Master · MV & Media sáng tạo tại trung tâm Sài Gòn.'
                : 'Recording · Music Production · Mix & Master · Music Video & Creative Media in central Saigon.'}
            </p>
          </div>
        </div>

        {/* Primary Dominant Studio Photography */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[21/9] sm:aspect-[16/9] lg:aspect-[2.3/1] w-full overflow-hidden rounded-md bg-[#0a0a0f] mb-12 lg:mb-16 group"
        >
          <ImageWithFallback
            src={ASSETS.studioMain}
            alt="Spark Records Studio Control Room"
            fallbackLabel="MAIN CONTROL SUITE"
            className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[10.5px] tracking-[0.24em] uppercase text-[#FAF8F5]/60 font-light">
            ACOUSTIC CONTROL ROOM · CONCERT-GRADE TRACKING
          </div>
        </motion.div>

        {/* Dual Secondary Visual Frames: Vocal Chamber & Cinema Suite */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#0a0a0f] group"
          >
            <ImageWithFallback
              src={ASSETS.studioVocalBooth}
              alt="Spark Vocal Chamber"
              fallbackLabel="VOCAL CHAMBER"
              className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.24em] uppercase text-[#FAF8F5]/60 font-light">
              ISOLATED VOCAL CHAMBER · TUBE MICROPHONE CHAIN
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.12, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#0a0a0f] group"
          >
            <ImageWithFallback
              src={ASSETS.projectNeon}
              alt="Spark Media & Cinema Suite"
              fallbackLabel="MEDIA CINEMA LAB"
              className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.24em] uppercase text-[#FAF8F5]/60 font-light">
              CINEMA MEDIA LAB · 4K/8K VISUAL DIRECTION
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
