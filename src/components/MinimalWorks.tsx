import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage, Lang } from '@/lib/LanguageContext';

interface MinimalWorksProps {
  lang?: Lang;
}

export const MinimalWorks: React.FC<MinimalWorksProps> = () => {
  const { lang } = useLanguage();
  // Hide City of Stars from the selected works UI; keep its data for later use.
  const selectedWorks = PROJECTS_DATA.filter((work) => work.slug !== 'city-of-stars');

  return (
    <section
      id="works"
      className="relative w-full bg-white py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '05 / DỰ ÁN NỔI BẬT' : '05 / SELECTED WORKS'}
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
                  DỰ ÁN<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">TIÊU BIỂU.</span>
                </>
              ) : (
                <>
                  SELECTED<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">WORKS.</span>
                </>
              )}
            </motion.h2>

            <span className="font-condensed text-xs tracking-[0.28em] uppercase text-[#666666] font-semibold">
              {lang === 'vi' ? 'LƯU TRỮ SÁNG TẠO · 2024–2026' : 'CURATED CREATIVE ARCHIVE · 2024–2026'}
            </span>
          </div>
        </div>

        {/* Editorial Spread Layout */}
        <div className="space-y-28 md:space-y-40">
          {selectedWorks.map((work, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.div
                key={work.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/projects/${work.slug}`} className="group block">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Dominant Image Spread (~75% visual dominance) */}
                    <div className={`lg:col-span-9 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#F6F6F4] border border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                        <ImageWithFallback
                          src={work.cover}
                          alt={work.title}
                          fallbackLabel={work.title}
                          className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] filter contrast-[1.04]"
                        />
                        <div className="absolute top-6 left-6 px-3 py-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E5] text-xs font-condensed tracking-widest text-[#0A0A0A] uppercase font-bold">
                          0{idx + 1}
                        </div>
                      </div>
                    </div>

                    {/* Editorial Project Metadata */}
                    <div className={`lg:col-span-3 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-4`}>
                      <span className="font-condensed text-[12px] tracking-[0.28em] uppercase text-[#7C3AED] font-bold block">
                        {work.cat} · {work.year}
                      </span>
                      <h3 className="font-condensed text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors duration-300 leading-[0.92]">
                        {work.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#666666] font-normal leading-relaxed line-clamp-3">
                        {work.desc}
                      </p>
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 font-condensed text-xs tracking-[0.26em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors duration-300 font-bold">
                          <span>{lang === 'vi' ? 'XEM DỰ ÁN' : 'VIEW PROJECT'}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
