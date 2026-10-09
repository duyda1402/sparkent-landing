import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Compass, ShieldCheck } from 'lucide-react';
import { ASSETS } from '@/lib/data';
import { Lang } from './EditorialNav';

interface EditorialHeroProps {
  lang: Lang;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialHero: React.FC<EditorialHeroProps> = ({ lang, videoRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#040406] text-white pt-32 md:pt-40 pb-12 px-6 md:px-12 lg:px-16"
    >
      {/* Background Manifesto Film with Editorial Flat Scrim */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <video
          ref={videoRef}
          src={ASSETS.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35"
        />
        {/* Editorial Gradients & Film Grain Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-black/70" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(139,92,255,0.2), transparent 75%)',
          }}
        />
      </motion.div>

      {/* Top Editorial Index Bar */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EXPO }}
        className="relative z-10 w-full flex flex-wrap items-center justify-between border-b border-white/[0.08] pb-6 gap-4 text-[9px] font-mono tracking-[0.28em] text-white/50 uppercase"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-spark-purple animate-ping" />
          <span className="text-white/80 font-medium">SPARK MANIFESTO // VOL. 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <span>01 STUDIO</span>
          <span className="text-white/20">/</span>
          <span>02 ACADEMY</span>
          <span className="text-white/20">/</span>
          <span>03 MEDIA</span>
          <span className="text-white/20">/</span>
          <span>04 LABEL</span>
        </div>
        <div className="flex items-center gap-2 text-spark-purple/90">
          <ShieldCheck size={11} />
          <span>SAIGON HEADQUARTERS</span>
        </div>
      </motion.div>

      {/* Main Center Typography Canvas */}
      <motion.div
        style={{ y: titleParallax, opacity: opacityFade }}
        className="relative z-10 my-auto py-12 md:py-16 max-w-full"
      >
        <div className="max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EXPO }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-3 py-1 rounded-full border border-spark-purple/40 bg-spark-purple/10 text-[9px] font-mono tracking-[0.3em] text-spark-purple uppercase">
              NEXT-GEN ENTERTAINMENT POWERHOUSE
            </span>
            <span className="text-[10px] text-white/30 tracking-[0.2em] font-mono hidden sm:inline">
              // NO REPETITION · MONOLITH CRAFT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: EXPO }}
            className="text-[clamp(2.8rem,7.5vw,7.8rem)] font-light tracking-[0.08em] uppercase text-white leading-[0.98] select-none"
          >
            IGNITE<br />
            <span className="font-extralight text-white/90">THE</span>{' '}
            <span
              className="font-normal italic"
              style={{
                textShadow: '0 0 50px rgba(139,92,255,0.4)',
                color: '#FAF8FF',
              }}
            >
              MOMENT
            </span>
            <span className="text-spark-purple">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: EXPO }}
            className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
          >
            <p className="md:col-span-7 text-sm md:text-base font-light text-white/70 leading-relaxed tracking-[0.04em]">
              {lang === 'vi'
                ? 'Spark Entertainment kết nối kỹ nghệ thu âm chuẩn phòng hòa nhạc, học viện nghệ thuật tinh hoa, điện ảnh thương mại và phát hành âm nhạc toàn cầu trong một thực thể giải trí thế hệ mới tại Việt Nam.'
                : lang === 'en'
                ? 'Spark Entertainment unites concert-grade acoustic engineering, an elite creative academy, cinematic visual production, and global label incubation under one singular creative roof.'
                : 'Spark Entertainmentは、ハイエンドレコーディング、最高峰のアカデミー、映画クオリティの映像制作、そして世界水準のレーベル発信を統合した総合エンターテインメント企業です。'}
            </p>

            <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-4 md:justify-end">
              <a
                href="#ecosystem"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black text-[10px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <span>{lang === 'vi' ? 'KHÁM PHÁ HỆ SINH THÁI' : 'EXPLORE ECOSYSTEM'}</span>
                <ArrowDownRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-white text-[10px] font-mono tracking-[0.22em] uppercase font-light hover:border-spark-purple/60 hover:bg-white/[0.08] transition-all duration-300 text-center"
              >
                {lang === 'vi' ? 'HỢP TÁC NGAY' : 'COMMISSION'}
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Editorial Meta Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 w-full pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-[8.5px] font-mono tracking-[0.22em] text-white/40 uppercase"
      >
        <div>
          <span className="block text-white/20 mb-1">ACOUSTIC ISOLATION</span>
          <span className="text-white/80 font-light">NC-15 / FLOATING CONCRETE</span>
        </div>
        <div>
          <span className="block text-white/20 mb-1">PRODUCTION PIPELINE</span>
          <span className="text-white/80 font-light">DOLBY ATMOS · 8K RAW</span>
        </div>
        <div>
          <span className="block text-white/20 mb-1">GLOBAL REACH</span>
          <span className="text-white/80 font-light">SPOTIFY · APPLE MUSIC · TIKTOK</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-white/20 mb-1">LATITUDE / LONGITUDE</span>
            <span className="text-white/80 font-light">10.7769° N, 106.7009° E</span>
          </div>
          <Compass size={14} className="text-spark-purple/70 hidden sm:block" />
        </div>
      </motion.div>
    </section>
  );
};
