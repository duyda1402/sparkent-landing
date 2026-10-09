import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { useLanguage, Lang } from '@/lib/LanguageContext';
import { PILLARS, pillarPath } from '@/lib/pillars';
import { ImageWithFallback } from './ImageWithFallback';

const EASE = [0.16, 1, 0.3, 1] as const;

interface SparkIntroProps {
  lang?: Lang;
}

// Opens a pillar only after the pointer rests on it, so sweeping across rows does not flicker.
function useHoverIntent(onActivate: (index: number) => void, delay = 140) {
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return {
    enter: (index: number) => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => onActivate(index), delay);
    },
    leave: () => window.clearTimeout(timer.current),
    now: (index: number) => {
      window.clearTimeout(timer.current);
      onActivate(index);
    },
  };
}

const Eyebrow: React.FC<{ lang: Lang }> = ({ lang }) => (
  <motion.span
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
  >
    {lang === 'vi' ? '02 / GIỚI THIỆU' : '02 / INTRODUCTION'}
  </motion.span>
);

const IntroCopy: React.FC<{ lang: Lang; className?: string }> = ({ lang, className = '' }) => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
    className={`text-base md:text-xl text-[#555555] font-normal leading-relaxed ${className}`}
  >
    {lang === 'vi'
      ? 'Nơi thế hệ trẻ học hỏi, sáng tạo, phát triển tài năng và bước vào hành trình âm nhạc của riêng mình.'
      : 'A place where the next generation learns, creates, develops and builds their own path in music.'}
  </motion.p>
);

// Option A: headline left, pillar accordion right (closest to the previous layout)
const IntroAccordion: React.FC = () => {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const intent = useHoverIntent(setActive);

  return (
    <section
      id="intro"
      className="relative w-full bg-[#F6F6F4] py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Typography Statement */}
          <div className="lg:col-span-7">
            <Eyebrow lang={lang} />

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="font-condensed font-extrabold text-[clamp(2.5rem,7vw,7.4rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
            >
              SPARK<br />
              <span className="font-extrabold text-[#0A0A0A] inline-block pt-1">{lang === 'vi' ? 'LÀ MỘT HỆ SINH THÁI' : 'IS A MUSIC'}</span><br />
              <span className="font-bold italic text-[#7C3AED] tracking-tight inline-block pt-1 pb-1.5">{lang === 'vi' ? 'ÂM NHẠC THẾ HỆ MỚI.' : 'ECOSYSTEM.'}</span>
            </motion.h2>

            <IntroCopy lang={lang} className="mt-8 md:mt-12 max-w-2xl" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                to={pillarPath('learn')}
                className="inline-flex items-center gap-2.5 min-h-[48px] px-8 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] active:scale-[0.98] text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300"
              >
                {lang === 'vi' ? 'KHÁM PHÁ HÀNH TRÌNH' : 'EXPLORE THE JOURNEY'}
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </Link>
              <span className="font-condensed text-xs tracking-[0.24em] uppercase font-semibold text-[#666666]">
                {lang === 'vi' ? '4 CHẶNG, 1 HÀNH TRÌNH' : '4 STAGES, 1 JOURNEY'}
              </span>
            </motion.div>
          </div>

          {/* Right Column: Pillar accordion, each row links to its sub-page */}
          <div className="lg:col-span-5 pt-4 lg:pt-16">
            <nav
              aria-label={lang === 'vi' ? 'Bốn chặng của hệ sinh thái Spark' : 'The four stages of the Spark ecosystem'}
              className="border-t border-[#E5E5E5]"
            >
              {PILLARS.map((pillar, idx) => {
                const open = idx === active;
                return (
                  <motion.div
                    key={pillar.slug}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 1 }}
                  >
                    <Link
                      to={pillarPath(pillar.slug)}
                      onMouseEnter={() => intent.enter(idx)}
                      onMouseLeave={intent.leave}
                      onFocus={() => intent.now(idx)}
                      className="group block py-6 md:py-8 border-b border-[#E5E5E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <span
                          className={`w-7 shrink-0 font-condensed text-[13px] font-bold tracking-[0.2em] transition-colors duration-300 ${
                            open ? 'text-[#7C3AED]' : 'text-[#666666]'
                          }`}
                        >
                          {pillar.num}
                        </span>
                        <span
                          className={`flex-1 min-w-0 font-condensed text-2xl md:text-4xl font-extrabold tracking-[0.08em] uppercase transition-colors duration-300 group-hover:text-[#7C3AED] ${
                            open ? 'text-[#7C3AED]' : 'text-[#0A0A0A]'
                          }`}
                        >
                          {pillar.word}
                        </span>
                        <span
                          className={`hidden sm:block text-right font-condensed text-[12px] tracking-[0.28em] uppercase font-bold transition-colors duration-300 ${
                            open ? 'text-[#0A0A0A]' : 'text-[#666666]'
                          }`}
                        >
                          {lang === 'vi' ? pillar.subVi : pillar.subEn}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                            open ? 'bg-[#7C3AED] border-[#7C3AED] text-white' : 'border-[#D4D4D4] text-[#0A0A0A]'
                          }`}
                        >
                          <ArrowRight
                            size={16}
                            strokeWidth={1.6}
                            className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'rotate-0' : '-rotate-45'}`}
                          />
                        </span>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="flex flex-wrap items-end gap-5 md:gap-6 pt-6 pl-11 md:pl-12">
                            <ImageWithFallback
                              src={pillar.image}
                              alt={lang === 'vi' ? pillar.imageAltVi : pillar.imageAltEn}
                              loading="lazy"
                              className="w-[168px] aspect-[4/3] shrink-0 bg-[#141416]"
                            />
                            <div className="flex-1 min-w-[200px]">
                              <p className="mb-3.5 max-w-[38ch] text-[15px] leading-relaxed text-[#555555]">
                                {lang === 'vi' ? pillar.summaryVi : pillar.summaryEn}
                              </p>
                              <span className="font-condensed text-xs font-bold tracking-[0.26em] uppercase text-[#7C3AED]">
                                {lang === 'vi' ? 'KHÁM PHÁ CHẶNG NÀY' : 'EXPLORE THIS STAGE'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

// Option B: full-width headline, four "doors" below; the active door widens and turns dark
const IntroDoors: React.FC = () => {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const intent = useHoverIntent(setActive);

  return (
    <section
      id="intro"
      className="relative w-full bg-[#F6F6F4] py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1720px] mx-auto">
        <Eyebrow lang={lang} />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="font-condensed font-extrabold text-[clamp(2.5rem,6.4vw,6.8rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none"
        >
          <span className="block">{lang === 'vi' ? 'SPARK LÀ MỘT HỆ SINH THÁI' : 'SPARK IS A MUSIC'}</span>
          <span className="block font-bold italic text-[#7C3AED] tracking-tight pt-1 pb-1.5">
            {lang === 'vi' ? 'ÂM NHẠC THẾ HỆ MỚI.' : 'ECOSYSTEM.'}
          </span>
        </motion.h2>

        <IntroCopy lang={lang} className="mt-8 max-w-[46ch]" />

        <nav
          aria-label={lang === 'vi' ? 'Bốn chặng của hệ sinh thái Spark' : 'The four stages of the Spark ecosystem'}
          className="mt-14 md:mt-[72px] flex flex-col lg:flex-row gap-3 lg:h-[560px]"
        >
          {PILLARS.map((pillar, idx) => {
            const open = idx === active;
            const sub = lang === 'vi' ? pillar.subVi : pillar.subEn;
            return (
              <Link
                key={pillar.slug}
                to={pillarPath(pillar.slug)}
                onMouseEnter={() => intent.enter(idx)}
                onMouseLeave={intent.leave}
                onFocus={() => intent.now(idx)}
                aria-label={`${pillar.word}: ${sub}`}
                style={{ flexGrow: open ? 2.8 : 1 }}
                className={`group relative block min-w-0 overflow-hidden border lg:basis-0 transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED] ${
                  open
                    ? 'bg-[#080808] border-[#080808] min-h-[520px] lg:min-h-0'
                    : 'bg-white border-[#E5E5E5] hover:border-[#0A0A0A] min-h-[150px] lg:min-h-0'
                }`}
              >
                {open ? (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                    className="h-full flex flex-col lg:min-w-[400px]"
                  >
                    <ImageWithFallback
                      src={pillar.image}
                      alt={lang === 'vi' ? pillar.imageAltVi : pillar.imageAltEn}
                      loading="lazy"
                      className="flex-1 min-h-[200px] w-full bg-[#141416]"
                    />
                    <div className="px-7 md:px-9 pt-7 pb-8 flex flex-col gap-4">
                      <div className="flex items-baseline justify-between gap-4 font-condensed font-bold text-[#A78BFA]">
                        <span className="text-[13px] tracking-[0.2em]">{pillar.num}</span>
                        <span className="text-xs tracking-[0.28em] uppercase">{sub}</span>
                      </div>
                      <span className="font-condensed font-extrabold text-white text-[clamp(56px,6vw,88px)] leading-[0.9] tracking-[-0.01em]">
                        {pillar.word}
                      </span>
                      <p className="max-w-[46ch] text-[15px] leading-relaxed text-[#B5B5B5]">
                        {lang === 'vi' ? pillar.summaryVi : pillar.summaryEn}
                      </p>
                      <span className="self-start inline-flex items-center gap-2.5 min-h-[44px] px-6 rounded-full bg-white text-[#0A0A0A] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-300 font-condensed text-xs font-bold tracking-[0.26em] uppercase">
                        {lang === 'vi' ? 'KHÁM PHÁ CHẶNG NÀY' : 'EXPLORE THIS STAGE'}
                        <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full p-6 lg:pt-7 flex flex-col justify-between gap-6">
                    <div className="flex items-center justify-between">
                      <span className="font-condensed text-[13px] font-bold tracking-[0.2em] text-[#666666]">{pillar.num}</span>
                      <span
                        aria-hidden="true"
                        className="w-9 h-9 rounded-full border border-[#D4D4D4] flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-[#0A0A0A] transition-colors duration-300"
                      >
                        <Plus size={14} strokeWidth={1.8} />
                      </span>
                    </div>
                    <div>
                      <span className="block font-condensed text-[40px] leading-none font-extrabold tracking-[0.03em] text-[#0A0A0A]">
                        {pillar.word}
                      </span>
                      <span className="block mt-2.5 font-condensed text-[11px] font-bold tracking-[0.24em] uppercase text-[#666666]">
                        {sub}
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export const SparkIntro: React.FC<SparkIntroProps> = () => {
  const [searchParams] = useSearchParams();
  // Temporary design comparison: /?intro=doors shows option B. Remove once a variant is chosen.
  const variant = searchParams.get('intro') === 'doors' ? 'doors' : 'accordion';

  return (
    <MotionConfig reducedMotion="user">
      {variant === 'doors' ? <IntroDoors /> : <IntroAccordion />}
    </MotionConfig>
  );
};
