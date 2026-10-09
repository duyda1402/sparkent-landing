import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, ProjectData } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';

type Lang = 'vi' | 'en' | 'jp';
type FilterCategory = 'ALL' | 'MUSIC' | 'MUSIC VIDEO' | 'COMMERCIAL' | 'EVENT' | 'MEDIA';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.4) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: dur, ease: EXPO },
});

export function FeaturedProjectsSection({ lang }: { lang: Lang }) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');

  const categories: FilterCategory[] = ['ALL', 'MUSIC', 'MUSIC VIDEO', 'COMMERCIAL', 'EVENT', 'MEDIA'];

  const filteredProjects: ProjectData[] = useMemo(() => {
    if (activeCategory === 'ALL') return PROJECTS_DATA;
    if (activeCategory === 'MEDIA') {
      return PROJECTS_DATA.filter((p) => p.cat === 'MUSIC VIDEO' || p.cat === 'COMMERCIAL');
    }
    return PROJECTS_DATA.filter((p) => p.cat === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="relative py-32 md:py-48 bg-[#050507] overflow-hidden border-t border-spark-border/60">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-4 block">
              {lang === 'vi' ? 'DỰ ÁN NỔI BẬT' : lang === 'en' ? 'FEATURED WORKS' : '注目のプロジェクト'}
            </motion.span>
            <motion.h2 {...fadeUp(0.1, 1.4)} className="heading-section">
              {lang === 'vi' ? 'TÁC PHẨM & DỰ ÁN' : lang === 'en' ? 'SELECTED CASE STUDIES' : '制作事例と作品'}
            </motion.h2>
          </div>
          <motion.p {...fadeUp(0.2, 1.4)} className="body-quiet max-w-sm" style={{ textTransform: 'none', fontSize: '12px', letterSpacing: '0.08em', lineHeight: '2.0', color: 'rgba(255,255,255,0.45)' }}>
            {lang === 'vi'
              ? 'Tuyển tập các tác phẩm âm nhạc, video điện ảnh và chiến dịch thương hiệu tiêu biểu được sáng tạo và sản xuất bởi Spark.'
              : 'Curated music productions, cinematic visuals, and brand collaborations executed by Spark Entertainment.'}
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-16 pb-6 border-b border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[9px] tracking-[0.24em] font-light uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-spark-purple text-white shadow-[0_0_20px_rgba(139,92,255,0.4)]'
                  : 'bg-white/[0.02] text-white/45 hover:text-white hover:bg-white/[0.06] border border-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[8.5px] font-mono tracking-[0.2em] text-white/30 uppercase hidden md:inline-block">
            {filteredProjects.length} ARCHIVED WORKS
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 1.4, ease: EXPO }}
            >
              <Link to={`/projects/${p.slug}`} className="group flex flex-col space-y-5 block">
                <div
                  className="relative overflow-hidden rounded-2xl border border-spark-border/70 group-hover:border-spark-purple/35 transition-all duration-700"
                  style={{ aspectRatio: '16/10' }}
                >
                  <div
                    className="absolute inset-0 z-10 transition-opacity duration-600 group-hover:opacity-75"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }}
                  />
                  <ImageWithFallback
                    src={p.cover}
                    alt={p.title}
                    fallbackLabel={p.title}
                    className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />

                  {/* Top row meta tags */}
                  <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-center pointer-events-none">
                    <span className="text-[8.5px] tracking-[0.28em] uppercase font-light text-white/70 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]">
                      {p.cat}
                    </span>
                    <span className="text-[8.5px] tracking-[0.24em] uppercase font-mono text-white/50 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]">
                      {p.year}
                    </span>
                  </div>

                  {/* Hover bottom preview */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[11px] font-light text-white/80 leading-relaxed tracking-[0.06em] max-w-sm">
                      {p.desc}
                    </p>
                    <span className="text-[8.5px] tracking-[0.26em] uppercase font-mono text-spark-purple mt-3 block">
                      VIEW FULL CASE STUDY →
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pb-4 border-b border-spark-border/60">
                  <div className="space-y-1">
                    <h3 className="text-base font-light tracking-[0.16em] text-white uppercase group-hover:text-spark-purple transition-colors duration-300">
                      {p.title}
                    </h3>
                    <span className="text-[9.5px] tracking-[0.22em] uppercase font-light text-white/35">
                      {p.client}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-spark-purple/50 group-hover:bg-spark-purple/10 transition-all duration-300">
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
