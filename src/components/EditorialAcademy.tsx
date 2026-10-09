import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Music, Mic, Guitar, Sliders, Disc } from 'lucide-react';
import { Lang } from './EditorialNav';

interface EditorialAcademyProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export const EditorialAcademy: React.FC<EditorialAcademyProps> = ({ lang }) => {
  const programs = [
    {
      code: '01',
      icon: Music,
      title: 'PIANO & HARMONY',
      viSub: 'Độc tấu & Đệm hát chuyên sâu trên Grand Piano',
      enSub: 'Concert Grand Solo & Contemporary Harmonic Voice Leading',
      descVi: 'Đào tạo kỹ thuật ngón, thị tấu, cảm âm và tư duy hòa âm đương đại trên đàn Grand Piano acoustic chuẩn hòa nhạc.',
      descEn: 'Finger dexterity, sight reading, ear training, and modern harmonic theory on concert-grade acoustic grand pianos.',
      targetVi: 'Học viên từ sơ cấp đến nâng cao, nghệ sĩ muốn làm chủ nhạc cụ sáng tác.',
      targetEn: 'Beginners to advanced performers seeking complete compositional fluency.',
      spec: 'Yamaha CFX Concert Grand Acoustic Suite',
    },
    {
      code: '02',
      icon: Mic,
      title: 'VOCAL ARCHITECTURE',
      viSub: 'Kỹ thuật giải phẫu giọng hát & Xử lý micro',
      enSub: 'Vocal Anatomy, Breath Control & Studio Microphone Dynamics',
      descVi: 'Phương pháp giải phẫu giọng hát, hơi thở cơ hoành, mở rộng âm vực và kỹ năng kiểm soát dynamic trong vocal booth phòng thu.',
      descEn: 'Vocal anatomy, diaphragmatic breath control, range expansion, and studio microphone dynamic management.',
      targetVi: 'Ca sĩ triển vọng, ca sĩ phòng thu, người chuẩn bị phát hành single.',
      targetEn: 'Emerging vocalists, recording artists, and demo performers.',
      spec: 'Isolated Vocal Chamber A + Real-time FFT Feedback',
    },
    {
      code: '03',
      icon: Guitar,
      title: 'GUITAR & BASS',
      viSub: 'Kỹ nghệ Fingerstyle, Neo-Soul & Studio Tracking',
      enSub: 'Acoustic Fingerstyle, Neo-Soul Voicings & Analog Pedals',
      descVi: 'Kỹ thuật fingerstyle, voicing hợp âm jazz/neo-soul, kỹ năng thu âm track guitar sạch và xử lý analog pedalboard.',
      descEn: 'Fingerstyle, jazz/neo-soul voicings, pristine tracking methodology, and analog pedalboard management.',
      targetVi: 'Người đệm hát, guitarist phòng thu, nhạc sĩ biểu diễn live.',
      targetEn: 'Session musicians, songwriters, and live stage performers.',
      spec: 'Vintage Tube Amps & Direct Hi-Z Preamps',
    },
    {
      code: '04',
      icon: Sliders,
      title: 'MUSIC PRODUCTION',
      viSub: 'Sáng tác beat, Phối khí DAW & Modular Synthesizer',
      enSub: 'DAW Beat Craft, Arrangement & Hardware Synthesizers',
      descVi: 'Quy trình sản xuất âm nhạc từ ý tưởng sơ khởi đến bản demo hoàn chỉnh trên Ableton Live, Logic Pro và hệ thống synthesizer.',
      descEn: 'End-to-end production pipeline from motif conception to release-ready arrangement on Ableton, Logic, and modular gear.',
      targetVi: 'Beatmaker, music producer độc lập, nghệ sĩ tự sản xuất âm nhạc.',
      targetEn: 'Aspiring producers, beatmakers, and self-producing artists.',
      spec: 'Moog Sub 37 + Universal Audio Apollo DSP',
    },
    {
      code: '05',
      icon: Disc,
      title: 'MIXING / MASTERING',
      viSub: 'Cân bằng tần số, Không gian âm thanh & Loudness War',
      enSub: 'Frequency Balance, Spatial Imaging & Master Delivery',
      descVi: 'Kỹ năng nghe phân tích tần số, kỹ thuật nén đa băng tần, xử lý saturation analog và tối ưu loudness chuẩn Spotify/Apple Music.',
      descEn: 'Critical listening, multiband compression, analog saturation modeling, and target streaming loudness optimization.',
      targetVi: 'Sound engineer, producer muốn tự hoàn thiện sản phẩm chuẩn thương mại.',
      targetEn: 'Audio engineers and producers seeking label-certified delivery skills.',
      spec: 'Genelec SAM Calibrated Listening Environment',
    },
  ];

  return (
    <section
      id="academy"
      className="relative w-full bg-[#040406] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              CONSERVATORY & PEDAGOGY // 04
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            SPARK CREATIVE<br />
            <span className="font-extralight text-white/50">ACADEMY</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
          <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
            {lang === 'vi'
              ? 'Không chỉ dạy kỹ thuật nhạc cụ thuần túy, Spark Academy đào tạo tư duy nghệ sĩ độc bản, khả năng làm chủ thiết bị phòng thu và sự tự tin trên sân khấu quốc tế.'
              : 'Beyond standard music lessons, Spark Academy nurtures unique artist voices, studio fluency, and international stage confidence through 1-on-1 mentorship.'}
          </p>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black text-[9.5px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span>{lang === 'vi' ? 'ĐĂNG KÝ HỌC THỬ' : 'BOOK A TRIAL LESSON'}</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 5 Architectural Program Modules */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((item, idx) => (
          <motion.div
            key={item.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.08, duration: 1.0, ease: EXPO }}
            className={`group flex flex-col justify-between p-8 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 hover:bg-[#0a0a10] hover:border-spark-purple/40 transition-all duration-700 ${
              idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-spark-purple group-hover:scale-110 transition-transform">
                    <item.icon size={14} />
                  </div>
                  <span className="text-[11px] font-mono text-white/30 tracking-[0.2em]">
                    // {item.code}
                  </span>
                </div>
                <span className="text-[8px] font-mono tracking-[0.22em] text-spark-purple uppercase">
                  ACTIVE SYLLABUS
                </span>
              </div>

              <div className="mt-6 mb-4">
                <h3 className="text-lg md:text-xl font-light tracking-[0.14em] uppercase text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-light text-spark-purple/90 tracking-[0.04em]">
                  {lang === 'vi' ? item.viSub : item.enSub}
                </p>
              </div>

              <p className="text-xs font-light text-white/60 leading-relaxed font-sans mb-6">
                {lang === 'vi' ? item.descVi : item.descEn}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-6 space-y-1">
                <span className="text-[8px] font-mono tracking-[0.24em] text-white/40 uppercase block">
                  TARGET PROFILE
                </span>
                <p className="text-[11px] font-light text-white/80 leading-snug font-sans">
                  {lang === 'vi' ? item.targetVi : item.targetEn}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase">
                {item.spec}
              </span>
              <a
                href="#contact"
                className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase text-white/70 group-hover:text-spark-purple transition-colors"
              >
                <span>ENROLL</span>
                <ArrowUpRight size={11} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
