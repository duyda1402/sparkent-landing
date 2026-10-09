import React from 'react';
import { motion } from 'framer-motion';
import { Lang } from './EditorialNav';

interface EditorialStoryProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialStory: React.FC<EditorialStoryProps> = ({ lang }) => {
  const milestones = [
    {
      year: '2026',
      num: '01',
      titleVi: 'Thành lập Spark Entertainment',
      titleEn: 'Founding of Spark Entertainment',
      descVi: 'Khởi đầu với một niềm tin rằng âm nhạc, giáo dục và truyền thông nên được kết nối trong cùng một hệ sinh thái sáng tạo khép kín.',
      descEn: 'Born from the conviction that audiophile tracking, conservatory pedagogy, and cinematic media belong within one singular ecosystem.',
    },
    {
      year: '2026',
      num: '02',
      titleVi: 'Xây dựng Spark Monolith Studio',
      titleEn: 'Engineering Spark Monolith Studio',
      descVi: 'Đầu tư vào không gian sáng tạo chuẩn âm học phòng hòa nhạc, hệ thống kiểm âm tham chiếu và quy trình sản xuất âm thanh quốc tế.',
      descEn: 'Constructing Vietnam’s premier acoustic landmark with reference monitoring, tube signal chains, and uncompressed analog headroom.',
    },
    {
      year: '2026',
      num: '03',
      titleVi: 'Đồng hành cùng những nghệ sĩ đầu tiên',
      titleEn: 'Inaugural Artist Roster Development',
      descVi: 'Bắt đầu sản xuất âm nhạc, hình ảnh điện ảnh và phát hành album độc bản cho thế hệ nghệ sĩ trẻ tài năng.',
      descEn: 'Initiating end-to-end artist development, visual packaging, and worldwide digital releases for the vanguard.',
    },
    {
      year: '2026',
      num: '04',
      titleVi: 'Định hình hệ sinh thái giải trí khép kín',
      titleEn: 'The Integrated Ecosystem Unfolds',
      descVi: 'Kết nối Studio, Academy, Media và Label dưới một tầm nhìn nghệ thuật và thương mại thống nhất.',
      descEn: 'Uniting Studio, Academy, Media, and Label under a single uncompromising standard of luxury craftsmanship.',
    },
  ];

  return (
    <section
      id="story"
      className="relative w-full bg-[#040406] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              GENESIS & CHRONICLE // 08
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            CÂU CHUYỆN CỦA SPARK<br />
            <span className="font-extralight text-white/50">THE GENESIS OF EXCELLENCE</span>
          </h2>
        </div>

        <p className="max-w-md text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
          {lang === 'vi'
            ? 'Không dự báo viển vông, chúng tôi ghi lại những cột mốc thực tế kiến tạo nên nền tảng của Spark Entertainment từ năm 2026.'
            : 'Grounding our foundation in truthful 2026 milestones as we forge Vietnam’s most sophisticated entertainment platform.'}
        </p>
      </div>

      {/* 4 Chronological Editorial Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, idx) => (
          <motion.div
            key={m.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.1, duration: 1.0, ease: EXPO }}
            className="p-8 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 flex flex-col justify-between hover:border-spark-purple/40 hover:bg-[#0a0a10] transition-all duration-500"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
                <span className="text-xl md:text-2xl font-mono text-spark-purple font-light">
                  {m.year}
                </span>
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em]">
                  // {m.num}
                </span>
              </div>

              <h3 className="text-base font-light tracking-[0.12em] uppercase text-white mb-3 leading-snug">
                {lang === 'vi' ? m.titleVi : m.titleEn}
              </h3>

              <p className="text-xs font-light text-white/60 leading-relaxed font-sans">
                {lang === 'vi' ? m.descVi : m.descEn}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase">
              <span>FOUNDATION LOG</span>
              <span className="text-spark-purple">VERIFIED</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Authentic Closing Remark */}
      <div className="mt-20 text-center py-12 border-t border-b border-white/[0.06]">
        <p className="text-sm md:text-base font-light font-mono tracking-[0.3em] uppercase text-white/80">
          "The story has just begun."
        </p>
        <span className="text-[9px] font-mono tracking-[0.26em] text-spark-purple uppercase block mt-2">
          SPARK ENTERTAINMENT HEADQUARTERS // 2026
        </span>
      </div>
    </section>
  );
};
