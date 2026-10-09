import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage, Lang } from '@/lib/LanguageContext';

interface SparkJournalProps {
  lang?: Lang;
}

export const SparkJournal: React.FC<SparkJournalProps> = () => {
  const { lang } = useLanguage();

  const journalEntries = [
    {
      id: '01',
      category: lang === 'vi' ? 'PHÁT HÀNH MỚI · 2026' : 'NEW RELEASE · 2026',
      title: 'MINH — SILENT SHADOWS',
      subtitle: lang === 'vi'
        ? 'Đĩa đơn R&B ghi âm qua chuẩn analog Neve tại Spark Studio.'
        : 'Lead R&B single captured through analog signal paths at Spark Studio.',
      image: ASSETS.artistMinh,
    },
    {
      id: '02',
      category: lang === 'vi' ? 'HẬU TRƯỜNG ÂM NHẠC · 2026' : 'BEHIND THE MUSIC · 2026',
      title: lang === 'vi' ? 'KIẾN TRÚC BUỒNG THU VOCAL' : 'THE VOCAL SUITE ARCHITECTURE',
      subtitle: lang === 'vi'
        ? 'Kỹ nghệ xử lý âm học và buồng thu âm chuẩn quốc tế.'
        : 'Acoustic treatment and vocal isolation principles behind the sound.',
      image: ASSETS.studioVocalBooth,
    },
    {
      id: '03',
      category: lang === 'vi' ? 'SPARK ACADEMY · 2026' : 'SPARK ACADEMY · 2026',
      title: lang === 'vi' ? 'PHÒNG THÍ NGHIỆM SẢN XUẤT ĐƯƠNG ĐẠI' : 'CONTEMPORARY PRODUCTION LAB',
      subtitle: lang === 'vi'
        ? 'Chương trình đào tạo thực chiến kết nối trực tiếp phòng thu.'
        : 'Intensive craft development directly linked to active commercial sessions.',
      image: ASSETS.studioAcoustic,
    },
    {
      id: '04',
      category: lang === 'vi' ? 'VĂN HÓA & SỰ KIỆN · 2025' : 'CULTURE & EVENTS · 2025',
      title: 'IGNITION SHOWCASE SAIGON',
      subtitle: lang === 'vi'
        ? 'Đêm diễn quy tụ cộng đồng nghệ sĩ độc lập thế hệ mới.'
        : 'Live sonic showcase uniting independent contemporary voices.',
      image: ASSETS.projectIgnition,
    },
  ];

  return (
    <section
      id="journal"
      className="relative w-full bg-white py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
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
            {lang === 'vi' ? '07 / TIN TỨC & BÀI VIẾT' : '07 / JOURNAL'}
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
                  TỪ<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">SPARK.</span>
                </>
              ) : (
                <>
                  FROM<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">SPARK.</span>
                </>
              )}
            </motion.h2>

            <span className="font-condensed text-xs tracking-[0.28em] uppercase text-[#666666] font-semibold">
              {lang === 'vi'
                ? 'CÂU CHUYỆN · PHÁT HÀNH · VĂN HÓA · ĐÀO TẠO'
                : 'STORIES · RELEASES · CULTURE · EDUCATION'}
            </span>
          </div>
        </div>

        {/* Editorial Journal List */}
        <div className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
          {journalEntries.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center group cursor-pointer"
            >
              {/* Category & Serial with YG-style condensed uppercase */}
              <div className="lg:col-span-3">
                <span className="font-condensed text-[12px] md:text-[13px] tracking-[0.28em] uppercase text-[#7C3AED] font-bold block mb-1">
                  {item.category}
                </span>
                <span className="text-xs text-[#8E8E93] font-mono tracking-widest font-semibold">
                  NO. 0{idx + 1}
                </span>
              </div>

              {/* Title & Short Editorial Context */}
              <div className="lg:col-span-6 space-y-1">
                <h3 className="font-condensed text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#666666] font-normal leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Thumbnail & Read Arrow */}
              <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-6">
                <div className="relative w-20 h-14 md:w-28 md:h-18 overflow-hidden rounded-sm bg-[#F6F6F4] border border-[#E5E5E5] flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    fallbackLabel={item.title}
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-sm tracking-[0.2em] text-[#0A0A0A] group-hover:text-[#7C3AED] group-hover:translate-x-1.5 transition-all duration-300 font-bold">
                  →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
