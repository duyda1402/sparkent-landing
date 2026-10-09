import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Lang } from './MinimalNav';

interface MinimalAcademyProps {
  lang: Lang;
}

export const MinimalAcademy: React.FC<MinimalAcademyProps> = ({ lang }) => {
  return (
    <section
      id="academy"
      className="relative w-full bg-[#050507] py-32 md:py-48 px-6 md:px-12 lg:px-20 text-[#FAF8F5] border-t border-white/[0.04]"
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Subtle section label */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.04] pb-8 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#FAF8F5]/40 block mb-3 font-normal">
              {lang === 'vi' ? 'HỌC VIỆN SÁNG TẠO' : 'CONSERVATORY & PEDAGOGY'}
            </span>
            <h2 className="text-[clamp(2.5rem,6.5vw,6.5rem)] font-light tracking-[0.04em] uppercase text-[#FAF8F5] leading-none select-none">
              SPARK <span className="font-light italic text-[#FAF8F5]/90">ACADEMY.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#8B5CF6] block font-light">
              MUSIC EDUCATION + ARTIST DEVELOPMENT
            </span>
            <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light tracking-[0.04em] max-w-sm">
              {lang === 'vi'
                ? 'Không chỉ là lớp học thông thường—đây là nền tảng tôi luyện bản lĩnh sân khấu và tư duy nghệ sĩ độc bản.'
                : 'Not a traditional music school—an elite incubator forging unique sonic voices and stage presence.'}
            </p>
          </div>
        </div>

        {/* Large Editorial Visual Frame */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[21/9] sm:aspect-[16/9] lg:aspect-[2.3/1] w-full overflow-hidden rounded-md bg-[#0a0a0f] mb-16 lg:mb-24 group"
        >
          <ImageWithFallback
            src={ASSETS.studioAcoustic}
            alt="Spark Academy Grand Piano Suite"
            fallbackLabel="CONSERVATORY SUITE"
            className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[10.5px] tracking-[0.24em] uppercase text-[#FAF8F5]/60 font-light">
            CONCERT GRAND PIANO SUITE · MASTERCLASS RESIDENCY
          </div>
        </motion.div>

        {/* 2 Editorial Discipline Groups: PERFORMANCE and PRODUCTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Performance Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.06] pt-8"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#8B5CF6] font-normal">
                DISCIPLINE GROUP 01
              </span>
              <span className="text-sm tracking-[0.2em] uppercase text-[#FAF8F5]/40 font-light">
                PERFORMANCE
              </span>
            </div>

            <div className="space-y-8">
              <div className="group border-b border-white/[0.04] pb-6 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl md:text-3xl font-light tracking-[0.06em] uppercase text-[#FAF8F5] group-hover:text-white transition-colors">
                    PIANO
                  </h3>
                  <span className="text-xs tracking-[0.2em] text-[#FAF8F5]/40 uppercase font-light">
                    GRAND PIANO · HARMONY
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light leading-relaxed">
                  {lang === 'vi'
                    ? 'Kỹ thuật ngón hòa nhạc, thị tấu, cảm âm và hòa âm đương đại trên Grand Piano acoustic.'
                    : 'Concert finger dexterity, sight-reading, and contemporary jazz harmonic theory on grand pianos.'}
                </p>
              </div>

              <div className="group border-b border-white/[0.04] pb-6 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl md:text-3xl font-light tracking-[0.06em] uppercase text-[#FAF8F5] group-hover:text-white transition-colors">
                    VOCAL
                  </h3>
                  <span className="text-xs tracking-[0.2em] text-[#FAF8F5]/40 uppercase font-light">
                    ANATOMY · STUDIO DYNAMICS
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light leading-relaxed">
                  {lang === 'vi'
                    ? 'Giải phẫu giọng hát, kiểm soát hơi thở cơ hoành và làm chủ kỹ thuật thu âm micro.'
                    : 'Vocal anatomy, diaphragmatic breath control, and professional booth microphone technique.'}
                </p>
              </div>

              <div className="group border-b border-white/[0.04] pb-6 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl md:text-3xl font-light tracking-[0.06em] uppercase text-[#FAF8F5] group-hover:text-white transition-colors">
                    GUITAR
                  </h3>
                  <span className="text-xs tracking-[0.2em] text-[#FAF8F5]/40 uppercase font-light">
                    FINGERSTYLE · STUDIO TRACKING
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light leading-relaxed">
                  {lang === 'vi'
                    ? 'Fingerstyle, voicing hợp âm neo-soul và kỹ năng thu âm track guitar analog sạch.'
                    : 'Acoustic fingerstyle, neo-soul voicing, and pristine analog tracking methodology.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Production Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.12, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.06] pt-8"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#8B5CF6] font-normal">
                DISCIPLINE GROUP 02
              </span>
              <span className="text-sm tracking-[0.2em] uppercase text-[#FAF8F5]/40 font-light">
                PRODUCTION
              </span>
            </div>

            <div className="space-y-8">
              <div className="group border-b border-white/[0.04] pb-6 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl md:text-3xl font-light tracking-[0.06em] uppercase text-[#FAF8F5] group-hover:text-white transition-colors">
                    MUSIC PRODUCTION
                  </h3>
                  <span className="text-xs tracking-[0.2em] text-[#FAF8F5]/40 uppercase font-light">
                    DAW · BEAT CRAFT · SYNTH
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light leading-relaxed">
                  {lang === 'vi'
                    ? 'Quy trình sáng tác beat, phối khí trên Ableton/Logic và sử dụng hệ thống modular synth.'
                    : 'Beat composition pipeline, DAW arrangement, and hardware modular synthesizer workflows.'}
                </p>
              </div>

              <div className="group border-b border-white/[0.04] pb-6 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl md:text-3xl font-light tracking-[0.06em] uppercase text-[#FAF8F5] group-hover:text-white transition-colors">
                    MIX & MASTER
                  </h3>
                  <span className="text-xs tracking-[0.2em] text-[#FAF8F5]/40 uppercase font-light">
                    DOLBY ATMOS · LOUDNESS WAR
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-[#FAF8F5]/50 font-light leading-relaxed">
                  {lang === 'vi'
                    ? 'Cân bằng tần số, xử lý analog saturation và tối ưu âm lượng chuẩn Spotify & Apple Music.'
                    : 'Frequency balance, spatial imaging, and target streaming loudness optimization.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
