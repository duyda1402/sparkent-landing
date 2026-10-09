import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Lang } from '@/lib/LanguageContext';

interface SparkManifestoProps {
  lang?: Lang;
}

export const SparkManifesto: React.FC<SparkManifestoProps> = () => {
  const { lang } = useLanguage();

  const highlights = lang === 'vi' ? [
    { word: 'ÂM NHẠC', sub: 'TRỌNG TÂM SÁNG TẠO' },
    { word: 'CON NGƯỜI', sub: 'CỘNG ĐỒNG TRẺ' },
    { word: 'TÀI NĂNG', sub: 'ƯƠM MẦM & BỨT PHÁ' },
    { word: 'TƯƠNG LAI', sub: 'THẾ HỆ TIẾP THEO' },
  ] : [
    { word: 'MUSIC', sub: 'AT THE CORE' },
    { word: 'PEOPLE', sub: 'CREATIVE COMMUNITY' },
    { word: 'TALENT', sub: 'NURTURE & BREAKTHROUGH' },
    { word: 'FUTURE', sub: 'NEXT GENERATION' },
  ];

  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#F6F6F4] py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
    >
      <div className="max-w-[1720px] mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-8 font-bold"
        >
          {lang === 'vi' ? '04 / TUYÊN NGÔN HỆ SINH THÁI' : '04 / MANIFESTO & VISION'}
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-end">
          {/* Left Column: Monolithic headline */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-condensed font-extrabold text-[clamp(2.75rem,7.8vw,8.5rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
            >
              {lang === 'vi' ? (
                <>
                  KIẾN TẠO<br />
                  <span className="font-extrabold text-[#0A0A0A] inline-block pt-1">TỪ</span><br />
                  <span className="font-bold italic text-[#7C3AED] tracking-tight inline-block pt-1">ÂM NHẠC.</span>
                </>
              ) : (
                <>
                  BUILT<br />
                  <span className="font-extrabold text-[#0A0A0A] inline-block pt-1">AROUND</span><br />
                  <span className="font-bold italic text-[#7C3AED] tracking-tight inline-block pt-1">MUSIC.</span>
                </>
              )}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-12 max-w-xl space-y-4"
            >
              <p className="text-lg md:text-2xl text-[#0A0A0A] font-semibold leading-relaxed">
                {lang === 'vi'
                  ? 'Âm nhạc không chỉ là điều chúng tôi tạo ra.'
                  : 'Music is not just what we create.'}
              </p>
              <p className="text-base md:text-lg text-[#666666] font-normal leading-relaxed">
                {lang === 'vi'
                  ? 'Đó là nơi những người trẻ tài năng gặp gỡ, học hỏi, khai phóng tiềm năng và định hình tương lai âm nhạc.'
                  : 'It is where young talent connects, learns, unlocks creative ambition and shapes the future of sound.'}
              </p>
            </motion.div>
          </div>

          {/* Right Column: 4 Minimal Highlights */}
          <div className="lg:col-span-5 pb-2">
            <div className="grid grid-cols-2 gap-8 md:gap-12 border-t border-[#E5E5E5] pt-10">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.word}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 1 }}
                  className="space-y-1.5 group cursor-pointer"
                >
                  <span className="text-[11px] tracking-[0.28em] uppercase text-[#7C3AED] font-mono block font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-condensed text-2xl md:text-3xl font-extrabold tracking-[0.08em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors duration-300">
                    {item.word}
                  </h3>
                  <p className="font-condensed text-xs tracking-[0.24em] uppercase text-[#666666] font-semibold">
                    {item.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
