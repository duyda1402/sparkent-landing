import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage, Lang } from '@/lib/LanguageContext';
import { useBookingModal } from '@/lib/BookingContext';
import { StudioEquipmentSpotlight } from './StudioEquipmentSpotlight';

interface MinimalEcosystemProps {
  lang?: Lang;
}

export const MinimalEcosystem: React.FC<MinimalEcosystemProps> = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBookingModal();

  const pillars = [
    {
      num: '01',
      id: 'academy',
      name: 'SPARK ACADEMY',
      stage: lang === 'vi' ? 'GIAI ĐOẠN 01 — HỌC HỎI & PHÁT TRIỂN' : 'STAGE 01 — LEARN & DEVELOP',
      tags: 'INSTRUMENTS · VOCAL · MUSIC PRODUCTION · MIXING & MASTERING',
      positioning: lang === 'vi'
        ? 'NỀN TẢNG VỮNG VÀNG. BẢN SẮC RIÊNG.'
        : 'A SOLID FOUNDATION. YOUR OWN IDENTITY.',
      desc: lang === 'vi'
        ? 'Không gian đào tạo âm nhạc dành cho mọi lứa tuổi — từ những bước đầu khám phá âm nhạc đến phát triển kỹ năng chuyên sâu. Kết hợp đào tạo bài bản, thực hành cùng hệ thống nhạc cụ và thiết bị studio cao cấp, Spark Academy đồng hành cùng bạn trên hành trình học hỏi, sáng tạo và phát triển chất riêng.'
        : 'A music education space for all ages — from the first steps of discovering music to developing advanced skills. Combining structured learning with hands-on practice using premium instruments and studio equipment, Spark Academy supports your journey to learn, create and develop your own sound.',
      img: ASSETS.studioAcoustic,
      ctaText: lang === 'vi' ? 'ĐẶT LỊCH SPARK ACADEMY →' : 'BOOK SPARK ACADEMY →',
      action: () => openBooking(),
    },
    {
      num: '02',
      id: 'studio',
      name: 'SPARK STUDIO',
      stage: lang === 'vi' ? 'GIAI ĐOẠN 02 — SÁNG TẠO & SẢN XUẤT' : 'STAGE 02 — CREATE & PRODUCE',
      tags: 'RECORDING · MUSIC PRODUCTION · MIXING & MASTERING · MEDIA',
      positioning: lang === 'vi'
        ? 'TỪ Ý TƯỞNG ĐẾN SẢN PHẨM ÂM NHẠC HOÀN CHỈNH.'
        : 'FROM AN IDEA TO A FINISHED MUSIC PRODUCTION.',
      desc: lang === 'vi'
        ? 'Không gian sản xuất âm nhạc dành cho nghệ sĩ, nhà sản xuất và thương hiệu. Spark Studio kết hợp đội ngũ chuyên môn với hệ thống thiết bị thu âm, xử lý tín hiệu analog và kiểm âm chuyên nghiệp, đồng hành cùng bạn từ bản thu đầu tiên đến sản phẩm âm nhạc hoàn chỉnh.'
        : 'A music production space for artists, producers and brands. Spark Studio brings together an expert team with professional recording equipment, analog signal processing and studio monitoring, supporting you from your first recording to a finished music production.',
      img: ASSETS.studioMain,
      ctaText: lang === 'vi' ? 'ĐẶT LỊCH PHÒNG THU ↗' : 'BOOK A RECORDING SESSION ↗',
      action: () => openBooking('recording'),
    },
    {
      num: '03',
      id: 'label',
      name: 'SPARK LABEL',
      stage: lang === 'vi' ? 'GIAI ĐOẠN 03 — PHÁT TRIỂN & PHÁT HÀNH' : 'STAGE 03 — DEVELOP & RELEASE',
      tags: lang === 'vi'
        ? 'ARTIST DEVELOPMENT · MUSIC RELEASES'
        : 'ARTIST DEVELOPMENT · MUSIC RELEASES',
      positioning: lang === 'vi'
        ? 'BẢN SẮC → ĐÀO TẠO → PHÁT HÀNH → SỰ NGHIỆP.'
        : 'IDENTITY → DEVELOPMENT → RELEASE → CAREER.',
      desc: lang === 'vi'
        ? 'Bệ phóng dành cho nghệ sĩ trẻ dám bước xa hơn: định hình phong cách, chiến lược phát hành nhạc số toàn cầu và xây dựng sự nghiệp âm nhạc dài lâu.'
        : 'The launchpad for artists ready to go further: defining unique sonic identity, managing worldwide releases, and building a sustainable music career.',
      img: ASSETS.artistLyra,
      ctaText: lang === 'vi' ? 'ĐẶT LỊCH THỬ GIỌNG ↗' : 'BOOK VOICE AUDITION ↗',
      action: () => openBooking('vocal'),
    },
  ];

  return (
    <section
      id="ecosystem"
      className="relative w-full bg-white py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-24 md:mb-36">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '03 / HỆ SINH THÁI SPARK' : '03 / THE SPARK ECOSYSTEM'}
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E5E5E5] pb-12">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-condensed font-extrabold text-[clamp(2.5rem,7vw,7.2rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
            >
              {lang === 'vi' ? (
                <>
                  HỆ SINH THÁI<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">SPARK.</span>
                </>
              ) : (
                <>
                  THE SPARK<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">ECOSYSTEM.</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-condensed text-xs md:text-sm tracking-[0.3em] uppercase text-[#666666] font-semibold max-w-md lg:text-right"
            >
              {lang === 'vi'
                ? 'HỌC HỎI → SÁNG TẠO → PHÁT TRIỂN → PHÁT HÀNH'
                : 'LEARN → CREATE → DEVELOP → RELEASE'}
            </motion.p>
          </div>
        </div>

        {/* 3 Pillars as LARGE EDITORIAL SECTIONS */}
        <div className="space-y-32 md:space-y-48">
          {pillars.map((pillar, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.div
                key={pillar.id}
                id={`${pillar.id}-detail`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Large Photography Frame */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#F6F6F4] border border-[#E5E5E5] group shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                    <ImageWithFallback
                      src={pillar.img}
                      alt={pillar.name}
                      fallbackLabel={pillar.name}
                      className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter contrast-[1.05]"
                    />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E5] text-xs font-condensed tracking-widest text-[#0A0A0A] uppercase font-bold">
                      {pillar.num}
                    </div>
                  </div>
                </div>

                {/* Editorial Content */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-6 md:space-y-8`}>
                  <div>
                    <span className="font-condensed text-[12px] md:text-[13px] tracking-[0.32em] uppercase text-[#7C3AED] block mb-3 font-bold">
                      {pillar.tags}
                    </span>
                    <h3 className="font-condensed text-4xl md:text-6xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] leading-[0.92]">
                      {pillar.name}
                    </h3>
                  </div>

                  <p className="font-condensed text-lg md:text-2xl font-bold tracking-[0.04em] text-[#0A0A0A] uppercase leading-snug">
                    {pillar.positioning}
                  </p>

                  <p className="text-sm md:text-base font-normal text-[#666666] leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={pillar.action}
                      className="inline-flex items-center gap-2 font-condensed text-xs tracking-[0.28em] uppercase text-[#0A0A0A] py-2 relative group font-bold"
                    >
                      <span className="group-hover:text-[#7C3AED] transition-colors duration-300">
                        {pillar.ctaText}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] group-hover:bg-[#7C3AED] transition-colors duration-300" />
                    </button>
                  </div>
                </div>
                {pillar.id === 'studio' && (
                  <StudioEquipmentSpotlight className="lg:col-span-12 lg:order-3" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
