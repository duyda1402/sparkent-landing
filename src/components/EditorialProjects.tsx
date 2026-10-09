import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Lang } from './EditorialNav';

interface EditorialProjectsProps {
  lang: Lang;
}

type FilterCategory = 'ALL' | 'MUSIC' | 'MUSIC VIDEO' | 'COMMERCIAL' | 'EVENT' | 'MEDIA';

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialProjects: React.FC<EditorialProjectsProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');

  const categories: FilterCategory[] = ['ALL', 'MUSIC', 'MUSIC VIDEO', 'COMMERCIAL', 'EVENT', 'MEDIA'];

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return PROJECTS_DATA;
    if (activeCategory === 'MEDIA') {
      return PROJECTS_DATA.filter((p) => p.cat === 'MUSIC VIDEO' || p.cat === 'COMMERCIAL');
    }
    return PROJECTS_DATA.filter((p) => p.cat === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#040406] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Editorial Section Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              ARCHIVE & CASE STUDIES // 02
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            SELECTED<br />
            <span className="font-extralight text-white/50">WORKS & PRODUCTIONS</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6">
          <p className="max-w-md text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
            {lang === 'vi'
              ? 'Mỗi tác phẩm là sự kết hợp giữa tư duy nghệ thuật không thỏa hiệp và quy trình sản xuất cơ giới chuẩn xác.'
              : 'Each project exemplifies uncompromising creative direction, audiophile acoustic tracking, and anamorphic film craft.'}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[8.5px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-spark-purple text-white shadow-[0_0_15px_rgba(139,92,255,0.4)]'
                    : 'bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Asymmetric Case Study Gallery */}
      <motion.div
        layout
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start"
      >
        <AnimatePresence>
          {filtered.map((project, idx) => {
            // Asymmetric layout span
            const colSpan = idx % 3 === 0 ? 'lg:col-span-8' : idx % 3 === 1 ? 'lg:col-span-4' : 'lg:col-span-6';
            const aspectRatio = idx % 3 === 0 ? 'aspect-[16/9]' : idx % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[16/10]';

            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: EXPO }}
                className={`${colSpan} group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#07070b]/40 hover:border-spark-purple/40 hover:bg-[#09090f] p-6 md:p-8 transition-all duration-700`}
              >
                <Link to={`/projects/${project.slug}`} className="block">
                  {/* Media Frame */}
                  <div className={`relative ${aspectRatio} w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-6`}>
                    <ImageWithFallback
                      src={project.cover}
                      alt={project.title}
                      fallbackLabel={project.title}
                      className="w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[8px] font-mono tracking-[0.24em] text-white/80 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
                      <span>{project.cat} // {project.year}</span>
                    </div>

                    {/* View Action Indicator */}
                    <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-spark-purple group-hover:text-white transition-all duration-300 shadow-xl">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Project Meta Info */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[9px] font-mono tracking-[0.24em] text-spark-purple uppercase">
                        CLIENT: {project.client}
                      </span>
                      <span className="text-[9px] font-mono text-white/30 tracking-[0.18em]">
                        REF #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light tracking-[0.12em] uppercase text-white group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-xs font-light text-white/50 leading-relaxed font-sans line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                </Link>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[8.5px] font-mono tracking-[0.22em] text-white/40 uppercase">
                  <span>DISCIPLINE: {project.cat}</span>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-white/70 hover:text-spark-purple transition-colors flex items-center gap-1"
                  >
                    <span>READ CASE STUDY</span>
                    <ArrowUpRight size={10} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
