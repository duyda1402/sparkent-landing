import { motion } from 'framer-motion';
import { ChevronRight, Film, Tv, Video, Radio, Share2, Camera } from 'lucide-react';
import { LiquidGlassButton } from './LiquidGlass';
import { PROJECTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router-dom';

type Lang = 'vi' | 'en' | 'jp';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.4) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: dur, ease: EXPO },
});

export function SparkMediaSection({ lang }: { lang: Lang }) {
  const services = [
    {
      icon: Film,
      title: 'MUSIC VIDEO',
      descVi: 'Đạo diễn MV điện ảnh 4K/8K, bối cảnh studio và ngoại cảnh, xử lý kỹ xảo VFX và color grade 35mm.',
      descEn: 'Cinematic 4K/8K music video direction, bespoke set builds, anamorphic glass, and 35mm film emulation.',
    },
    {
      icon: Tv,
      title: 'TVC',
      descVi: 'Phim quảng cáo truyền hình chuẩn phát sóng quốc tế, định hướng nghệ thuật xa xỉ và thông điệp thương hiệu sâu sắc.',
      descEn: 'Broadcast-certified commercial spots, luxury brand art direction, and emotional narrative storytelling.',
    },
    {
      icon: Video,
      title: 'COMMERCIAL',
      descVi: 'Nội dung video thương mại cho chiến dịch đa kênh, tối ưu hóa thị giác cho các thương hiệu hàng đầu.',
      descEn: 'Multi-platform commercial campaigns optimized for luxury automotive, fashion, and lifestyle sectors.',
    },
    {
      icon: Radio,
      title: 'LIVESTREAM',
      descVi: 'Sản xuất phát sóng trực tiếp sự kiện âm nhạc, multitrack audio mix thời gian thực và hệ thống multi-cam 4K.',
      descEn: 'Broadcast concert multi-cam streaming, real-time spatial multitrack mix, and zero-latency distribution.',
    },
    {
      icon: Share2,
      title: 'SOCIAL CONTENT',
      descVi: 'Gói nội dung ngắn cao cấp (Reels/TikTok/Shorts), giữ trọn chuẩn thẩm mỹ điện ảnh của thương hiệu.',
      descEn: 'High-production short-form visual assets engineered for viral velocity while preserving luxury aesthetics.',
    },
    {
      icon: Camera,
      title: 'PHOTOGRAPHY',
      descVi: 'Chụp ảnh bìa album, editorial lookbook thời trang, chân dung nghệ sĩ độc bản và chiến dịch quảng cáo.',
      descEn: 'Album cover design, high-fashion editorial lookbooks, exclusive artist portraiture, and key visuals.',
    },
  ];

  const featuredMediaProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section id="media" className="relative py-32 md:py-48 px-8 md:px-16 border-t border-spark-border/60 bg-[#050507] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[600px] h-[500px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(139,92,255,0.3), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-8 border-b border-white/[0.06] pb-12">
          <div>
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-4 block">
              {lang === 'vi' ? 'SPARK MEDIA' : lang === 'en' ? 'SPARK MEDIA' : 'SPARKメディア'}
            </motion.span>
            <motion.h2 {...fadeUp(0.1, 1.4)} className="heading-section">
              {lang === 'vi' ? 'SẢN XUẤT HÌNH ẢNH & ĐIỆN ẢNH' : lang === 'en' ? 'CINEMA & VISUAL PRODUCTION' : '映像＆映画プロダクション'}
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2, 1.4)} className="max-w-md">
            <p className="text-[12px] font-light text-white/50 leading-[2.0] tracking-[0.06em]">
              {lang === 'vi'
                ? 'Đội ngũ đạo diễn, DP và biên tập nội bộ tại Spark Media tạo dựng những tác phẩm nghe nhìn đạt chuẩn điện ảnh quốc tế.'
                : 'In-house directors, cinematographers, and colorists executing visual stories with cinematic depth and timeless precision.'}
            </p>
          </motion.div>
        </div>

        {/* 6 Core Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.06, duration: 1.2, ease: EXPO }}
              className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-spark-purple/30 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-spark-purple mb-6 group-hover:scale-110 transition-transform">
                <srv.icon size={16} />
              </div>
              <h3 className="text-sm font-light tracking-[0.2em] uppercase text-white mb-2.5">
                {srv.title}
              </h3>
              <p className="text-[11px] font-light text-white/50 leading-[1.9] tracking-[0.03em]">
                {lang === 'vi' ? srv.descVi : srv.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Selected Media Showcase */}
        <div className="mb-16">
          <div className="flex items-baseline justify-between mb-8">
            <span className="text-[9px] tracking-[0.3em] font-mono text-spark-purple uppercase">
              SELECTED REAL PRODUCTIONS
            </span>
            <span className="text-[9px] tracking-[0.2em] font-light text-white/30 uppercase">
              IN-HOUSE EXECUTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMediaProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.08] block aspect-[16/10]"
              >
                <ImageWithFallback
                  src={p.cover}
                  alt={p.title}
                  fallbackLabel={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[8px] tracking-[0.26em] font-mono text-spark-purple uppercase mb-1">
                    {p.cat} // {p.year}
                  </span>
                  <h4 className="text-base font-light tracking-[0.14em] uppercase text-white">
                    {p.title}
                  </h4>
                  <span className="text-[9px] tracking-[0.16em] uppercase text-white/40 mt-1">
                    {p.client}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-white/[0.015]">
          <div>
            <span className="text-[8.5px] tracking-[0.32em] font-mono text-spark-purple uppercase block mb-1">
              COMMERCIAL INQUIRY
            </span>
            <h3 className="text-xl md:text-2xl font-light tracking-[0.14em] uppercase text-white">
              {lang === 'vi' ? 'SẴN SÀNG CHO DỰ ÁN HÌNH ẢNH MỚI?' : 'READY FOR YOUR NEXT VISUAL PRODUCTION?'}
            </h3>
          </div>
          <LiquidGlassButton href="#contact" variant="primary" size="md" icon={<ChevronRight size={11} />}>
            REQUEST A MEDIA QUOTE
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
}
