import React from 'react';
import { ArrowUpRight, Disc } from 'lucide-react';
import { ASSETS } from '@/lib/data';
import { ImageWithFallback } from './ImageWithFallback';
import { Lang } from './EditorialNav';

interface EditorialStudioProps {
  lang: Lang;
}

export const EditorialStudio: React.FC<EditorialStudioProps> = ({ lang }) => {
  const specs = [
    { label: 'ACOUSTIC ISOLATION', val: 'NC-15 Floating Concrete Envelope' },
    { label: 'PRIMARY TRANSDUCER', val: 'Neumann M149 Tube Reference System' },
    { label: 'CONVERTER / CLOCK', val: 'Avid Pro Tools | HDX 192kHz Prism Sound' },
    { label: 'REFERENCE MONITORS', val: 'Genelec SAM 8351B Tri-Amplified Array' },
    { label: 'OUTBOARD DYNAMICS', val: 'Avalon Vt-737sp, Shadow Hills Mastering' },
    { label: 'ATMOSPHERIC CONTROL', val: 'Laminar Airflow Silent HVAC (<10dB)' },
  ];

  const services = [
    {
      num: '01',
      title: 'RECORDING',
      vi: 'Thu âm vocal và acoustic cao cấp',
      en: 'Vocal tracking & acoustic instrument isolation',
      tech: 'Neumann M149 Tube Mic Chain',
    },
    {
      num: '02',
      title: 'MIXING',
      vi: 'Hòa âm đa kênh & Dolby Atmos 7.1.4',
      en: 'Multitrack spatial audio & Dolby Atmos',
      tech: 'Avid HDX 192kHz Architecture',
    },
    {
      num: '03',
      title: 'MASTERING',
      vi: 'Tối ưu loudness & analog signal path',
      en: 'Analog loudness mastering & digital prep',
      tech: 'Shadow Hills Mastering Compressor',
    },
    {
      num: '04',
      title: 'MUSIC PRODUCTION',
      vi: 'Phối khí, hòa âm & executive supervision',
      en: 'Arrangement, scoring & executive direction',
      tech: 'Bespoke In-House Producer Suite',
    },
    {
      num: '05',
      title: 'VOCAL PRODUCTION',
      vi: 'Chỉnh tone, xếp bè vocal & vocal coaching',
      en: 'Vocal arrangement, tuning & booth session',
      tech: 'Anechoic Chamber Isolation -62dB',
    },
  ];

  return (
    <section
      id="studio"
      className="relative w-full bg-[#050508] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              ACOUSTIC FACILITY // 03
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            SPARK MONOLITH<br />
            <span className="font-extralight text-white/50">ACOUSTIC SUITE</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
          <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
            {lang === 'vi'
              ? 'Được thiết kế dựa trên tiêu chuẩn kiến trúc âm học tĩnh lặng tuyệt đối, kết hợp chuỗi tín hiệu đèn điện tử cổ điển và công nghệ kiểm âm không gian Dolby Atmos.'
              : 'Engineered at the intersection of architectural silence, vintage tube signal chains, and high-resolution spatial audio.'}
          </p>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black text-[9.5px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span>{lang === 'vi' ? 'ĐẶT LỊCH PHÒNG THU' : 'BOOK THE STUDIO'}</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Visual Showcase: Main Control Room + Technical Specification Matrix */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Main Photographic Anchor */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#07070b]/60 p-6 md:p-8 overflow-hidden group">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
            <ImageWithFallback
              src={ASSETS.studioMain}
              alt="Spark Monolith Studio Control Room"
              fallbackLabel="STUDIO CONTROL A"
              className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[8.5px] font-mono tracking-[0.24em] text-white/80 uppercase">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CONTROL ROOM A // MASTER SUITE
              </span>
              <span>CALIBRATED TO ISO 2969</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.06]">
            <div>
              <span className="text-[8px] font-mono tracking-[0.26em] text-spark-purple uppercase block mb-1">
                ACOUSTIC ISOLATION
              </span>
              <span className="text-sm md:text-base font-light text-white font-mono">
                NC-15 / 62dB
              </span>
            </div>
            <div>
              <span className="text-[8px] font-mono tracking-[0.26em] text-spark-purple uppercase block mb-1">
                SAMPLING RATE
              </span>
              <span className="text-sm md:text-base font-light text-white font-mono">
                192kHz / 32-Bit
              </span>
            </div>
            <div>
              <span className="text-[8px] font-mono tracking-[0.26em] text-spark-purple uppercase block mb-1">
                SURROUND FORMAT
              </span>
              <span className="text-sm md:text-base font-light text-white font-mono">
                Dolby Atmos 7.1.4
              </span>
            </div>
          </div>
        </div>

        {/* Right: Technical Specification Manifest */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#07070b]/60 p-6 md:p-8">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
              <span className="text-[9px] font-mono tracking-[0.3em] text-spark-purple uppercase">
                ENGINEERING SPECIFICATIONS
              </span>
              <span className="text-[10px] font-mono text-white/40">// LAB DOC</span>
            </div>

            <div className="mt-6 divide-y divide-white/[0.05]">
              {specs.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col gap-1">
                  <span className="text-[8px] font-mono tracking-[0.28em] text-white/30 uppercase">
                    {item.label}
                  </span>
                  <span className="text-xs md:text-[13px] font-light text-white/90 font-mono tracking-[0.04em]">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[8.5px] font-mono tracking-[0.2em] text-white/40 uppercase">
              STUDIO OPERATIONS // ACTIVE
            </span>
            <span className="text-[8.5px] font-mono tracking-[0.2em] text-emerald-400 uppercase">
              OPEN FOR SESSIONS
            </span>
          </div>
        </div>
      </div>

      {/* 5 Core Commercial Service Disciplines */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
        {services.map((srv) => (
          <div
            key={srv.num}
            className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-spark-purple/30 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-spark-purple/80">
                  // {srv.num}
                </span>
                <Disc size={12} className="text-white/20" />
              </div>
              <h4 className="text-sm font-light tracking-[0.16em] uppercase text-white mb-2">
                {srv.title}
              </h4>
              <p className="text-[11px] font-light text-white/50 leading-relaxed font-sans mb-4">
                {lang === 'vi' ? srv.vi : srv.en}
              </p>
            </div>
            <span className="text-[8px] font-mono tracking-[0.18em] text-spark-purple/70 uppercase pt-3 border-t border-white/[0.04]">
              {srv.tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
