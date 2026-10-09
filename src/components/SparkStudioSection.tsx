import { motion } from 'framer-motion';
import { ChevronRight, Radio } from 'lucide-react';
import { LiquidGlassButton } from './LiquidGlass';
import { ImageWithFallback } from './ImageWithFallback';
import { ASSETS } from '@/lib/data';

type Lang = 'vi' | 'en' | 'jp';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.4) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: dur, ease: EXPO },
});

export function SparkStudioSection({ lang }: { lang: Lang }) {
  // Priority 6: Recording, Mixing, Mastering, Music Production, Vocal Production
  const services = [
    {
      num: '01',
      title: 'RECORDING',
      vi: 'Thu âm thanh nhạc & nhạc cụ acoustic',
      en: 'Vocal tracking & acoustic instrument isolation',
      spec: 'Neumann M149 • Avalon Vt-737sp',
    },
    {
      num: '02',
      title: 'MIXING',
      vi: 'Hòa âm đa kênh & không gian Dolby Atmos',
      en: 'Multitrack spatial audio & Dolby Atmos',
      spec: 'Avid HDX 192kHz • UAD DSP Satellite',
    },
    {
      num: '03',
      title: 'MASTERING',
      vi: 'Chuẩn hóa loudness & tối ưu analog',
      en: 'Loudness optimization & analog polish',
      spec: 'Shadow Hills Mastering Compressor',
    },
    {
      num: '04',
      title: 'MUSIC PRODUCTION',
      vi: 'Phối khí, hòa âm & chỉ đạo âm nhạc',
      en: 'Arrangement, scoring & executive production',
      spec: 'Full In-House Producer Roster',
    },
    {
      num: '05',
      title: 'VOCAL PRODUCTION',
      vi: 'Chỉnh tone, xếp bè vocal & vocal booth A',
      en: 'Vocal arrangement, tuning & booth session',
      spec: 'Anechoic Chamber Isolation -62dB',
    },
  ];

  return (
    <section id="studio" className="relative bg-[#050507] overflow-hidden border-t border-spark-border/60">
      {/* Studio Header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-36 md:pt-48 pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          <div className="flex-shrink-0 max-w-xl">
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-5 block">
              MONOLITH ACOUSTICS — HO CHI MINH CITY
            </motion.span>
            <motion.h2
              {...fadeUp(0.1, 1.5)}
              className="text-[clamp(2.2rem,4.8vw,4.2rem)] font-light tracking-[0.12em] uppercase text-white leading-[1.08]"
            >
              SPARK<br />MONOLITH<br />STUDIO
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2, 1.4)} className="max-w-md pt-2">
            <p className="text-[13px] md:text-sm font-light text-white/60 leading-[2.1] tracking-[0.06em]">
              {lang === 'vi'
                ? 'Cơ sở thu âm và sản xuất âm nhạc thương mại được tinh chỉnh âm học hàng đầu Việt Nam. Nơi nghệ sĩ và thương hiệu tạo ra những chuẩn âm thanh bất hủ.'
                : 'Vietnam’s premier commercial recording facility. Engineered at the intersection of architectural silence, vintage tube signal chains, and high-resolution spatial audio.'}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] tracking-[0.24em] font-mono text-emerald-400/90 uppercase">
                CALIBRATED SAM MONITORING ACTIVE
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Studio Photography Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.8, ease: EXPO }}
        className="relative w-full overflow-hidden group"
        style={{ height: 'clamp(420px, 66vh, 800px)' }}
      >
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]" />
        <ImageWithFallback
          src={ASSETS.studioMain}
          alt="Spark Monolith Studio — Control Room A"
          fallbackLabel="STUDIO CONTROL ROOM A"
          className="w-full h-full object-cover transition-transform duration-[3.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] brightness-[0.82] contrast-[1.04]"
        />

        {/* Tactical HUD Overlay */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-14 z-20 space-y-2">
          <div className="flex items-center gap-2.5">
            <Radio size={12} className="text-spark-purple animate-pulse" />
            <span className="text-[9px] tracking-[0.34em] uppercase font-mono text-white/70">
              STUDIO A — MAIN CONTROL CONSOLE
            </span>
          </div>
          <p className="text-[8.5px] tracking-[0.2em] font-light text-white/40 uppercase">
            SOLID STATE LOGIC DUALITY FUSE • GENELEC 8351B STEREO PAIR
          </p>
        </div>
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-14 z-20 text-right">
          <p className="text-[8.5px] tracking-[0.28em] font-mono text-white/30 uppercase">10.7769° N, 106.7009° E</p>
        </div>
      </motion.div>

      {/* 5 Core Studio Services Breakdown */}
      <div className="border-y border-spark-border/60 bg-black/30">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            {services.map((srv, idx) => (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 1.2, ease: EXPO }}
                className="pt-6 md:pt-0 md:px-6 first:pl-0 last:pr-0 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-spark-purple">{srv.num}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-spark-purple transition-colors" />
                </div>
                <h3 className="text-xs font-light tracking-[0.22em] uppercase text-white group-hover:text-spark-purple transition-colors">
                  {srv.title}
                </h3>
                <p className="text-[10.5px] font-light text-white/50 leading-relaxed tracking-[0.04em]">
                  {lang === 'vi' ? srv.vi : srv.en}
                </p>
                <span className="text-[8px] font-mono tracking-[0.16em] uppercase text-white/25 block pt-2 border-t border-white/[0.04]">
                  {srv.spec}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Spaces Editorial Gallery */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <motion.div
            {...fadeUp(0, 1.6)}
            className="md:col-span-7 relative overflow-hidden rounded-2xl border border-spark-border/60 group aspect-[16/11]"
          >
            <ImageWithFallback
              src={ASSETS.studioVocalBooth}
              alt="Spark Studio — Vocal Isolation Booth"
              fallbackLabel="STUDIO B VOCAL BOOTH"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-[8.5px] tracking-[0.32em] font-mono text-white/60 uppercase">
                STUDIO B — ANECHOIC VOCAL SUITE
              </span>
            </div>
          </motion.div>

          <div className="md:col-span-5 flex flex-col gap-6">
            <motion.div
              {...fadeUp(0.1, 1.6)}
              className="relative overflow-hidden rounded-2xl border border-spark-border/60 group aspect-[16/10]"
            >
              <ImageWithFallback
                src={ASSETS.studioSuite}
                alt="Spark Studio — Production Suite"
                fallbackLabel="PRODUCTION SUITE"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-[8.5px] tracking-[0.32em] font-mono text-white/60 uppercase">
                  PRODUCTION SUITE C — ANALOG SYNTH RACK
                </span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.2, 1.6)}
              className="relative overflow-hidden rounded-2xl border border-spark-border/60 group aspect-[16/10]"
            >
              <ImageWithFallback
                src={ASSETS.studioMastering}
                alt="Spark Studio — Mastering Room"
                fallbackLabel="MASTERING ROOM"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-[8.5px] tracking-[0.32em] font-mono text-white/60 uppercase">
                  MASTERING ROOM D — LOSSLESS ANALOG FINISH
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Commercial Booking Action Banner */}
      <div className="border-t border-spark-border/60 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EXPO }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <span className="text-[8.5px] tracking-[0.3em] font-mono text-spark-purple uppercase block mb-1">
                COMMERCIAL SERVICE AVAILABILITY
              </span>
              <p className="text-[13px] md:text-sm font-light text-white/80 tracking-[0.06em]">
                {lang === 'vi'
                  ? 'Phòng thu mở cửa 24/7 cho các dự án thu âm album, sản xuất âm nhạc và hậu kỳ quảng cáo.'
                  : 'Open 24/7 for commercial tracking, EP/album production, and film score post-production.'}
              </p>
            </div>
            <LiquidGlassButton href="#contact" variant="primary" size="md" icon={<ChevronRight size={11} />}>
              BOOK THE STUDIO
            </LiquidGlassButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
