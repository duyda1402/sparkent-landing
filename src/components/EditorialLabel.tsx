import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Lang } from './EditorialNav';

interface EditorialLabelProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialLabel: React.FC<EditorialLabelProps> = ({ lang }) => {
  const steps = [
    {
      code: '01',
      title: 'DISCOVER',
      titleVi: 'TÌM KIẾM TÀI NĂNG',
      descVi: 'Khám phá và tuyển chọn giọng hát tiềm năng qua cổng demo trực tuyến, thẩm định chuyên môn và creative scouting.',
      descEn: 'Scouting unrefined voices through digital demo submissions, physical acoustic auditions, and A&R field research.',
      tags: ['Demo Review', 'Audition Sessions', 'A&R Direction'],
    },
    {
      code: '02',
      title: 'DEVELOP',
      titleVi: 'ĐÀO TẠO NGHỆ SĨ TOÀN DIỆN',
      descVi: 'Huấn luyện thanh nhạc chuyên sâu, định hình phong cách thời trang, kỹ năng giải phóng hình thể và đào tạo truyền thông.',
      descEn: 'Anatomical vocal coaching, custom wardrobe styling, stage movement choreography, and international media coaching.',
      tags: ['Vocal Coaching', 'Styling', 'Stage Fluency'],
    },
    {
      code: '03',
      title: 'PRODUCE',
      titleVi: 'SẢN XUẤT ÂM NHẠC & HÌNH ẢNH',
      descVi: 'Thu âm tại Monolith Studio, hòa âm Dolby Atmos, phối khí bespoke và chỉ đạo MV điện ảnh chuẩn quốc tế.',
      descEn: 'Tracking at Monolith Studio A, Dolby Atmos spatial mixing, uncompressed mastering, and 4K cinema visuals.',
      tags: ['Tracking', 'Dolby Atmos', '4K MV Cinema'],
    },
    {
      code: '04',
      title: 'RELEASE',
      titleVi: 'PHÁT HÀNH TOÀN CẦU',
      descVi: 'Phân phối bản quyền toàn cầu trên Spotify, Apple Music, YouTube Music, TikTok Music với siêu dữ liệu số chuẩn xác.',
      descEn: 'Global distribution to Spotify, Apple Music, YouTube Music, and ByteDance platforms with verified metadata.',
      tags: ['Spotify Global', 'Apple Music', 'Lossless Audio'],
    },
    {
      code: '05',
      title: 'MARKET',
      titleVi: 'TIẾP THỊ & CHIẾN DỊCH QUẢNG BÁ',
      descVi: 'Xây dựng chiến dịch truyền thông đa kênh, playlist pitching quốc tế, phỏng vấn báo chí và visual teaser độc quyền.',
      descEn: 'Omni-channel marketing campaigns, global playlist pitching, high-fashion editorial press, and teaser rollouts.',
      tags: ['Playlist Pitching', 'Press PR', 'Digital Velocity'],
    },
    {
      code: '06',
      title: 'GROW',
      titleVi: 'PHÁT TRIỂN SỰ NGHIỆP LÂU DÀI',
      descVi: 'Hợp tác thương hiệu xa xỉ, lưu diễn hòa nhạc, festival quốc tế và chiến lược thương hiệu nghệ sĩ bền vững.',
      descEn: 'Luxury brand endorsements, headline touring, international festival curation, and enduring IP legacy strategy.',
      tags: ['Brand Endorsements', 'Concert Touring', 'Global Expansion'],
    },
  ];

  const platforms = [
    'Spotify', 'Apple Music', 'YouTube Music', 'TikTok Music',
    'Amazon Music', 'Deezer', 'QQ Music', 'LINE MUSIC'
  ];

  return (
    <section
      id="label"
      className="relative w-full bg-[#040406] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              ARTIST DEVELOPMENT ECOSYSTEM // 06
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            WE DON’T JUST RELEASE MUSIC.<br />
            <span className="font-extralight text-white/50">WE BUILD ARTISTS.</span>
          </h2>
          <p className="mt-4 text-xs font-mono text-spark-purple tracking-[0.2em] uppercase">
            {lang === 'vi' ? 'Không chỉ phát hành âm nhạc. Chúng tôi xây dựng sự nghiệp nghệ sĩ.' : 'Strategic incubation from inception to global arenas.'}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
          <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
            {lang === 'vi'
              ? 'Spark Label đồng hành toàn diện cùng nghệ sĩ: từ bản thu đầu tiên, kiến tạo hình ảnh nhận diện, chiến lược truyền thông đến phân phối toàn cầu.'
              : 'Accompanying artists through a rigorous 6-stage development continuum: audio perfection, aesthetic articulation, and long-term brand legacy.'}
          </p>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black text-[9.5px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span>{lang === 'vi' ? 'GỬI BẢN DEMO' : 'SUBMIT YOUR DEMO'}</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 6-Stage Development Continuum */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((st, idx) => (
          <motion.div
            key={st.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.07, duration: 1.0, ease: EXPO }}
            className="p-8 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 hover:bg-[#0a0a10] hover:border-spark-purple/40 transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <span className="text-[12px] font-mono text-spark-purple/80 tracking-[0.2em]">
                  STAGE {st.code}
                </span>
                <span className="text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase">
                  ACTIVE CONTINUUM
                </span>
              </div>

              <div className="mt-6 mb-3">
                <h3 className="text-xl font-light tracking-[0.16em] uppercase text-white">
                  {st.title}
                </h3>
                <span className="text-[9.5px] font-mono text-white/50 tracking-[0.12em] uppercase block mt-1">
                  {st.titleVi}
                </span>
              </div>

              <p className="text-xs font-light text-white/60 leading-relaxed font-sans mb-6">
                {lang === 'vi' ? st.descVi : st.descEn}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {st.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[8px] font-mono text-white/60 tracking-[0.14em] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Global DSP Streaming Network Strip */}
      <div className="mt-16 p-8 rounded-3xl border border-white/[0.08] bg-white/[0.015] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Globe size={16} className="text-spark-purple" />
          <span className="text-[9px] font-mono tracking-[0.28em] text-white/80 uppercase">
            GLOBAL DSP DISTRIBUTION MATRIX
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-6 text-[10px] font-mono text-white/40 tracking-[0.18em] uppercase">
          {platforms.map((p) => (
            <span key={p} className="hover:text-white transition-colors">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
