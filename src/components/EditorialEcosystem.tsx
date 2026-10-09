import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mic2, GraduationCap, Video, Disc3 } from 'lucide-react';
import { Lang } from './EditorialNav';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';

interface EditorialEcosystemProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialEcosystem: React.FC<EditorialEcosystemProps> = ({ lang }) => {
  const pillars = [
    {
      code: '01',
      id: 'studio',
      name: 'SPARK MONOLITH STUDIO',
      taglineVi: 'Thu âm chuẩn audiophile & Không gian hòa âm Dolby Atmos',
      taglineEn: 'Audiophile Acoustic Tracking & Dolby Atmos Immersive Suite',
      spec: 'Neumann M149 · Avid HDX 192kHz · Genelec SAM Series',
      leadVi: 'Thiết kế âm học nổi NC-15 đảm bảo độ tĩnh tuyệt đối cho giọng hát và nhạc cụ mộc.',
      leadEn: 'NC-15 floating isolation chamber engineered for pure acoustic capture and clinical mastering.',
      img: ASSETS.studioMain,
      accent: 'ACOUSTIC SUPREMACY',
      cta: 'EXPLORE STUDIO',
      href: '#studio',
      icon: Mic2,
    },
    {
      code: '02',
      id: 'academy',
      name: 'SPARK CREATIVE ACADEMY',
      taglineVi: 'Học viện đào tạo âm nhạc tinh hoa & Định hình phong cách',
      taglineEn: 'Masterclass Conservatory & Modern Songwriting Architecture',
      spec: 'Concert Grand Piano · Pro Vocal Booth · DAW Masterclasses',
      leadVi: 'Chương trình đào tạo cá nhân hóa từ sơ cấp đến nghệ sĩ phòng thu độc bản.',
      leadEn: 'Tailored 1-on-1 mentorship spanning vocal anatomy, performance staging, and DAW beatcraft.',
      img: ASSETS.studioAcoustic,
      accent: 'ARTIST PEDAGOGY',
      cta: 'EXPLORE ACADEMY',
      href: '#academy',
      icon: GraduationCap,
    },
    {
      code: '03',
      id: 'media',
      name: 'SPARK MEDIA HOUSE',
      taglineVi: 'Sản xuất điện ảnh, MV 8K & Chiến dịch thị giác cao cấp',
      taglineEn: 'Anamorphic Cinema MV, Commercial TVC & Luxury Campaigns',
      spec: '8K Large Format · Arri Signature Primes · 35mm Tone Lab',
      leadVi: 'Đội ngũ đạo diễn, DP và biên tập nội bộ với tư duy thị giác xa xỉ và nhịp điệu sắc sảo.',
      leadEn: 'In-house directors, cinematographers, and colorists shaping the aesthetic identity of next-gen music.',
      img: ASSETS.projectNeon,
      accent: 'CINEMATIC VISION',
      cta: 'EXPLORE MEDIA',
      href: '#media',
      icon: Video,
    },
    {
      code: '04',
      id: 'label',
      name: 'SPARK LABEL & TALENT',
      taglineVi: 'Ươm mầm nghệ sĩ toàn cầu & Phát hành âm nhạc đa quốc gia',
      taglineEn: 'Full-Stack Artist Incubation & Worldwide Music Distribution',
      spec: 'Spotify Global · Apple Music Mastered · Strategic A&R',
      leadVi: 'Đồng hành cùng nghệ sĩ từ bản demo sơ thảo đến các sân khấu hòa nhạc quốc tế.',
      leadEn: 'End-to-end artist management, image consulting, global distribution, and festival booking.',
      img: ASSETS.artistLyra,
      accent: 'TALENT INCUBATION',
      cta: 'EXPLORE LABEL',
      href: '#label',
      icon: Disc3,
    },
  ];

  return (
    <section
      id="ecosystem"
      className="relative w-full bg-[#050508] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Micro Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,92,255,0.18), transparent 70%)',
        }}
      />

      {/* Editorial Section Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 md:pb-24 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              INTEGRATED VALUE CHAIN // 01
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            THE ARCHITECTURE<br />
            <span className="font-extralight text-white/50">OF SOUND & VISION</span>
          </h2>
        </div>

        <p className="max-w-md text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans">
          {lang === 'vi'
            ? 'Thay vì các dịch vụ rời rạc, Spark Entertainment tích hợp toàn bộ chuỗi giá trị âm nhạc: từ ý tưởng đầu tiên trong phòng thu, rèn luyện kỹ năng, định hình hình ảnh đến phát hành toàn cầu.'
            : 'Rather than fragmented agencies, Spark Entertainment binds every phase of musical creation: pristine tracking, vocal refinement, cinematic storytelling, and worldwide distribution.'}
        </p>
      </div>

      {/* Asymmetric 4-Column Editorial Matrix */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-12">
        {pillars.map((p, idx) => (
          <motion.div
            key={p.code}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.1, duration: 1.2, ease: EXPO }}
            className="group relative flex flex-col justify-between p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 hover:bg-[#0a0a10] hover:border-spark-purple/40 transition-all duration-700 overflow-hidden"
          >
            {/* Top Bar inside Card */}
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-spark-purple group-hover:scale-110 group-hover:bg-spark-purple/10 transition-all duration-500">
                    <p.icon size={14} />
                  </div>
                  <span className="text-[8.5px] font-mono tracking-[0.28em] text-spark-purple uppercase">
                    {p.accent}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/30 tracking-[0.2em]">
                  // {p.code}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="mt-8 mb-6">
                <h3 className="text-xl md:text-2xl font-light tracking-[0.14em] uppercase text-white group-hover:text-white transition-colors duration-300">
                  {p.name}
                </h3>
                <p className="mt-2 text-xs font-light text-spark-purple/90 tracking-[0.06em]">
                  {lang === 'vi' ? p.taglineVi : p.taglineEn}
                </p>
              </div>

              {/* Editorial Description */}
              <p className="text-xs md:text-[13px] font-light text-white/60 leading-relaxed font-sans mb-8">
                {lang === 'vi' ? p.leadVi : p.leadEn}
              </p>
            </div>

            {/* Media Canvas preview */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
              <ImageWithFallback
                src={p.img}
                alt={p.name}
                fallbackLabel={p.name}
                className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[8px] font-mono tracking-[0.24em] text-white/70 uppercase">
                <span>BENCHMARK TECH</span>
                <span className="text-spark-purple font-medium">{p.spec}</span>
              </div>
            </div>

            {/* Bottom Interaction Link */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[8.5px] font-mono tracking-[0.2em] text-white/40 uppercase">
                SPARK ENTERTAINMENT CO.
              </span>
              <a
                href={p.href}
                className="flex items-center gap-2 text-[9.5px] font-mono tracking-[0.24em] uppercase text-white/80 group-hover:text-spark-purple transition-colors duration-300"
              >
                <span>{p.cta}</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
