import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Film, Tv, Video, Radio, Share2, Camera } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router-dom';
import { Lang } from './EditorialNav';

interface EditorialMediaProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialMedia: React.FC<EditorialMediaProps> = ({ lang }) => {
  const disciplines = [
    {
      code: '01',
      icon: Film,
      title: 'MUSIC VIDEO',
      descVi: 'Đạo diễn MV điện ảnh 4K/8K, bối cảnh studio và ngoại cảnh, xử lý kỹ xảo VFX và color grade 35mm.',
      descEn: 'Cinematic 4K/8K music video direction, bespoke set builds, anamorphic glass, and 35mm film emulation.',
      tag: 'ANAMORPHIC CINEMA',
    },
    {
      code: '02',
      icon: Tv,
      title: 'TVC',
      descVi: 'Phim quảng cáo truyền hình chuẩn phát sóng quốc tế, định hướng nghệ thuật xa xỉ và thông điệp thương hiệu sâu sắc.',
      descEn: 'Broadcast-certified commercial spots, luxury brand art direction, and emotional narrative storytelling.',
      tag: 'BROADCAST STANDARDS',
    },
    {
      code: '03',
      icon: Video,
      title: 'COMMERCIAL',
      descVi: 'Nội dung video thương mại cho chiến dịch đa kênh, tối ưu hóa thị giác cho các thương hiệu hàng đầu.',
      descEn: 'Multi-platform commercial campaigns optimized for luxury automotive, fashion, and lifestyle sectors.',
      tag: 'MULTI-CAMPAIGN',
    },
    {
      code: '04',
      icon: Radio,
      title: 'LIVESTREAM CONCERTS',
      descVi: 'Sản xuất phát sóng trực tiếp sự kiện âm nhạc, multitrack audio mix thời gian thực và hệ thống multi-cam 4K.',
      descEn: 'Broadcast concert multi-cam streaming, real-time spatial multitrack mix, and zero-latency distribution.',
      tag: 'LOW-LATENCY 4K',
    },
    {
      code: '05',
      icon: Share2,
      title: 'SOCIAL SHORTS',
      descVi: 'Gói nội dung ngắn cao cấp (Reels/TikTok/Shorts), giữ trọn chuẩn thẩm mỹ điện ảnh của thương hiệu.',
      descEn: 'High-production short-form visual assets engineered for viral velocity while preserving luxury aesthetics.',
      tag: 'VIRAL LUXURY',
    },
    {
      code: '06',
      icon: Camera,
      title: 'EDITORIAL STILLS',
      descVi: 'Chụp ảnh bìa album, editorial lookbook thời trang, chân dung nghệ sĩ độc bản và chiến dịch quảng cáo.',
      descEn: 'Album cover design, high-fashion editorial lookbooks, exclusive artist portraiture, and key visuals.',
      tag: 'MEDIUM FORMAT',
    },
  ];

  const featured = PROJECTS_DATA.slice(0, 3);

  return (
    <section
      id="media"
      className="relative w-full bg-[#050508] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              CINEMA & VISUAL MEDIA // 05
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            SPARK MEDIA<br />
            <span className="font-extralight text-white/50">HOUSE</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
          <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
            {lang === 'vi'
              ? 'Xây dựng ngôn ngữ điện ảnh không thể nhầm lẫn cho nghệ sĩ và thương hiệu xa xỉ. Từ ống kính anamorphic đến phòng hoàn thiện màu sắc chuẩn Hollywood.'
              : 'Forging unmistakable visual languages for artists and prestigious brands. From anamorphic optics to Hollywood-standard color science.'}
          </p>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black text-[9.5px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span>{lang === 'vi' ? 'NHẬN BÁO GIÁ MEDIA' : 'REQUEST A MEDIA QUOTE'}</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 6 Disciplines Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disciplines.map((d, idx) => (
          <motion.div
            key={d.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.06, duration: 0.9, ease: EXPO }}
            className="p-8 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 hover:bg-[#0a0a10] hover:border-spark-purple/40 transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-spark-purple group-hover:scale-110 transition-transform">
                  <d.icon size={14} />
                </div>
                <span className="text-[8px] font-mono tracking-[0.24em] text-spark-purple uppercase">
                  {d.tag}
                </span>
              </div>

              <div className="mt-6 mb-3">
                <span className="text-[10px] font-mono text-white/30 mb-1 block">// {d.code}</span>
                <h3 className="text-lg font-light tracking-[0.14em] uppercase text-white">
                  {d.title}
                </h3>
              </div>

              <p className="text-xs font-light text-white/60 leading-relaxed font-sans">
                {lang === 'vi' ? d.descVi : d.descEn}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[8.5px] font-mono tracking-[0.2em] text-white/40 uppercase">
              <span>IN-HOUSE CREATIVE</span>
              <span className="text-spark-purple group-hover:translate-x-1 transition-transform">
                COMMISSION ↗
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Real Media Production Reel Cards */}
      <div className="mt-16 pt-16 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[9px] font-mono tracking-[0.28em] text-white/40 uppercase">
            SELECTED IN-HOUSE EXECUTIONS
          </span>
          <Link
            to="/#projects"
            className="text-[9px] font-mono tracking-[0.2em] text-spark-purple hover:underline uppercase"
          >
            VIEW ALL RELEASES ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group block rounded-2xl overflow-hidden border border-white/[0.08] hover:border-spark-purple/50 transition-all duration-700 bg-black/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={p.cover}
                  alt={p.title}
                  fallbackLabel={p.title}
                  className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[8px] font-mono tracking-[0.2em] text-white/80 border border-white/10 uppercase">
                    {p.cat} // {p.year}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-base font-light tracking-[0.14em] uppercase text-white group-hover:text-white">
                    {p.title}
                  </h4>
                  <span className="text-[9px] font-mono text-spark-purple uppercase tracking-[0.16em] mt-1 block">
                    {p.client}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
