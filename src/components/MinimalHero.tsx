import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '@/lib/data';
import { useLanguage, Lang } from '@/lib/LanguageContext';

interface MinimalHeroProps {
  lang?: Lang;
}

export const MinimalHero: React.FC<MinimalHeroProps> = () => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-white text-[#0A0A0A] pt-28 pb-20"
    >
      {/* Background Cinematic Manifesto Film - 100% Full Natural Visual Contrast & Vibrancy */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <video
          ref={videoRef}
          src={ASSETS.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-100"
        />
      </motion.div>

      {/* Atmospheric Subtle Purple Wave Accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2] opacity-[0.14]">
        <svg
          viewBox="0 0 1200 300"
          className="w-full max-w-5xl h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 150 Q 200 148 350 150 T 550 150 T 600 65 T 650 235 T 700 95 T 750 205 T 800 135 T 850 165 T 950 150 T 1150 150"
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Centerpiece Dominant Headline with localized subtle readability backing strictly behind text */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-[1440px] w-[82%] mx-auto px-4 md:px-8 text-center flex flex-col items-center"
      >
        {/* Brand Kicker / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/10 bg-white/95 backdrop-blur-md shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
          <span className="font-condensed text-[11px] tracking-[0.28em] uppercase text-[#0A0A0A] font-bold">
            SPARK ENTERTAINMENT · MUSIC ECOSYSTEM
          </span>
        </motion.div>

        {lang === 'vi' ? (
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-condensed font-extrabold uppercase select-none h-auto tracking-[-0.02em] w-full"
          >
            <span className="block text-[clamp(2.35rem,6.8vw,7.6rem)] leading-[1.04] text-[#F4F1E8] [text-shadow:_0_3px_12px_rgba(0,0,0,0.55),_0_1px_3px_rgba(0,0,0,0.7)]">
              CHÚNG TÔI <span className="font-extrabold text-[#F4F1E8]">TẠO RA</span>
            </span>
            <span className="inline-block text-[clamp(2.1rem,6.2vw,6.9rem)] leading-[1.05] pt-3 sm:pt-4 md:pt-5 font-bold italic text-[#8B5CF6] tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.6),_0_1px_3px_rgba(0,0,0,0.7)]">
              NHỮNG ĐIỀU CHUYỂN ĐỘNG.
            </span>
          </motion.h1>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-condensed font-extrabold uppercase select-none h-auto tracking-[-0.02em] w-full"
          >
            <span className="block text-[clamp(2.55rem,7.3vw,8.1rem)] leading-[1.02] text-[#F4F1E8] [text-shadow:_0_3px_12px_rgba(0,0,0,0.55),_0_1px_3px_rgba(0,0,0,0.7)]">
              WE <span className="font-extrabold text-[#F4F1E8]">CREATE</span>
            </span>
            <span className="inline-block text-[clamp(2.3rem,6.7vw,7.4rem)] leading-[1.04] pt-3 sm:pt-4 md:pt-5 font-bold italic text-[#8B5CF6] tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.6),_0_1px_3px_rgba(0,0,0,0.7)]">
              WHAT MOVES.
            </span>
          </motion.h1>
        )}

        {/* Supporting Line: Next Generation Music Ecosystem with wide tracking */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-11 font-condensed text-xs md:text-sm tracking-[0.32em] uppercase text-[#F4F1E8] font-bold max-w-xl bg-black/40 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/10 shadow-sm"
        >
          {lang === 'vi'
            ? 'MỘT HỆ SINH THÁI ÂM NHẠC DÀNH CHO THẾ HỆ TIẾP THEO.'
            : 'A MUSIC ECOSYSTEM FOR THE NEXT GENERATION.'}
        </motion.p>

        {/* Action CTAs in Black / White / Spark Purple system */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          {/* Primary Button: Black -> Hover Spark Purple */}
          <a
            href="#ecosystem"
            className="px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-lg hover:shadow-[#7C3AED]/25"
          >
            <span>{lang === 'vi' ? 'KHÁM PHÁ SPARK' : 'EXPLORE SPARK'}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          {/* Secondary Button: White background with black border -> Hover Black */}
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 relative group"
          >
            <span>{lang === 'vi' ? 'HỢP TÁC CÙNG SPARK' : 'WORK WITH SPARK'}</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
