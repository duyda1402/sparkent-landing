import { motion } from 'framer-motion';
import { ArrowUpRight, Music, Disc, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTISTS_DATA } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';

type Lang = 'vi' | 'en' | 'jp';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.4) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: dur, ease: EXPO },
});

export function FeaturedArtistsSection({ lang }: { lang: Lang }) {
  return (
    <section id="artists" className="relative py-32 md:py-48 bg-[#050507] overflow-hidden border-t border-spark-border/60">
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at right, rgba(139,92,255,0.25), transparent 65%)' }}
      />
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32 gap-8 border-b border-white/[0.06] pb-10">
          <div>
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-4 block">
              {lang === 'vi' ? 'NGHỆ SĨ ĐỘC QUYỀN' : lang === 'en' ? 'EXCLUSIVE ROSTER' : '専属アーティスト'}
            </motion.span>
            <motion.h2 {...fadeUp(0.1, 1.4)} className="heading-section">
              {lang === 'vi' ? 'NGHỆ SĨ SPARK LABEL' : lang === 'en' ? 'SPARK LABEL ARTISTS' : 'SPARKレーベルアーティスト'}
            </motion.h2>
          </div>
          <motion.p
            {...fadeUp(0.2, 1.4)}
            className="body-quiet max-w-sm"
            style={{ textTransform: 'none', fontSize: '12px', letterSpacing: '0.08em', lineHeight: '2.0', color: 'rgba(255,255,255,0.45)' }}
          >
            {lang === 'vi'
              ? 'Mỗi nghệ sĩ tại Spark Label được đồng hành chiến lược toàn diện: từ sản xuất âm nhạc, định hình hình tượng đến phát hành quốc tế.'
              : 'Every artist developed under Spark receives comprehensive incubation: production, visual identity, and international positioning.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {ARTISTS_DATA.map((artist, idx) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.12, duration: 1.5, ease: EXPO }}
              className="flex flex-col space-y-6 group"
            >
              <Link to={`/artists/${artist.slug}`} className="block relative overflow-hidden rounded-2xl border border-spark-border/70 group-hover:border-spark-purple/35 transition-all duration-700" style={{ aspectRatio: '4/5' }}>
                <div
                  className="absolute inset-0 z-10 opacity-60 group-hover:opacity-75 transition-opacity duration-700"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
                />
                <ImageWithFallback
                  src={artist.portrait}
                  alt={artist.name}
                  fallbackLabel={artist.name}
                  className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                {/* Latest Release Pill Overlay */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.08]">
                  <Disc size={11} className="text-spark-purple animate-spin-slow" />
                  <span className="text-[8.5px] tracking-[0.22em] uppercase font-mono text-white/80">
                    LATEST: {artist.latestRelease.title}
                  </span>
                </div>

                {/* Profile Link Action Pill on Hover */}
                <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 bg-white text-black px-5 py-2.5 rounded-full text-[9px] tracking-[0.24em] uppercase font-light opacity-90 group-hover:opacity-100 group-hover:bg-spark-purple group-hover:text-white transition-all duration-300 shadow-xl">
                  <span>VIEW FULL PROFILE</span>
                  <ArrowRight size={12} />
                </div>
              </Link>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline pb-4 border-b border-spark-border/70">
                  <div>
                    <Link to={`/artists/${artist.slug}`} className="text-2xl font-light tracking-[0.16em] text-white uppercase hover:text-spark-purple transition-colors">
                      {artist.name}
                    </Link>
                    <span className="text-[9.5px] tracking-[0.26em] text-spark-textMuted uppercase font-light mt-1 block">
                      {artist.role}
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.26em] text-spark-purple font-mono uppercase">
                    SPARK LABEL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[8px] tracking-[0.26em] uppercase font-mono text-white/30 block mb-1">
                      {lang === 'vi' ? 'THỂ LOẠI' : 'GENRE'}
                    </span>
                    <span className="text-[9.5px] tracking-[0.18em] uppercase font-light text-white/70">
                      {artist.genre}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] tracking-[0.26em] uppercase font-mono text-white/30 block mb-1">
                      {lang === 'vi' ? 'PHÁT HÀNH' : 'DISCOGRAPHY'}
                    </span>
                    <span className="text-[9.5px] tracking-[0.18em] uppercase font-light text-white/70">
                      {artist.releasesCount}
                    </span>
                  </div>
                </div>

                {/* Social links & Profile CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <a href={artist.socials.spotify} target="_blank" rel="noreferrer" className="text-white/30 hover:text-spark-purple transition-colors p-1" aria-label="Spotify">
                      <Music size={14} />
                    </a>
                    <a href={artist.socials.appleMusic} target="_blank" rel="noreferrer" className="text-white/30 hover:text-spark-purple transition-colors p-1" aria-label="Apple Music">
                      <Disc size={14} />
                    </a>
                  </div>
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="text-[9px] tracking-[0.26em] uppercase font-mono text-spark-purple/80 hover:text-spark-purple transition-colors flex items-center gap-1.5"
                  >
                    <span>EXPLORE BIOGRAPHY</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
