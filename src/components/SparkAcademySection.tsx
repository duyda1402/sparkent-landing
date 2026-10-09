import { motion } from 'framer-motion';
import { ChevronRight, Music, Mic, Guitar, Sliders, Disc } from 'lucide-react';
import { LiquidGlassButton } from './LiquidGlass';

type Lang = 'vi' | 'en' | 'jp';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.4) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: dur, ease: EXPO },
});

export function SparkAcademySection({ lang }: { lang: Lang }) {
  const programs = [
    {
      icon: Music,
      code: '01',
      title: 'PIANO',
      subVi: 'Độc tấu & Đệm hát chuyên sâu',
      subEn: 'Classical & Contemporary Mastery',
      descVi: 'Đào tạo kỹ thuật ngón, thị tấu, cảm âm và tư duy hòa âm đương đại trên đàn Grand Piano acoustic chuẩn hòa nhạc.',
      descEn: 'Finger dexterity, sight reading, ear training, and modern harmonic theory on concert-grade acoustic grand pianos.',
      targetVi: 'Học viên từ sơ cấp đến nâng cao, nghệ sĩ muốn làm chủ nhạc cụ sáng tác.',
      targetEn: 'Beginners to advanced performers seeking complete compositional fluency.',
    },
    {
      icon: Mic,
      code: '02',
      title: 'VOCAL',
      subVi: 'Kỹ thuật thanh nhạc & Xử lý micro',
      subEn: 'Vocal Architecture & Studio Mic Technique',
      descVi: 'Phương pháp giải phẫu giọng hát, hơi thở cơ hoành, mở rộng âm vực và kỹ năng kiểm soát dynamic trong vocal booth phòng thu.',
      descEn: 'Vocal anatomy, diaphragmatic breath control, range expansion, and studio microphone dynamic management.',
      targetVi: 'Ca sĩ triển vọng, ca sĩ phòng thu, người chuẩn bị phát hành single.',
      targetEn: 'Emerging vocalists, recording artists, and demo performers.',
    },
    {
      icon: Guitar,
      code: '03',
      title: 'GUITAR',
      subVi: 'Acoustic & Electric Studio Craft',
      subEn: 'Acoustic & Electric Studio Craft',
      descVi: 'Kỹ thuật fingerstyle, voicing hợp âm jazz/neo-soul, kỹ năng thu âm track guitar sạch và xử lý analog pedalboard.',
      descEn: 'Fingerstyle, jazz/neo-soul voicings, pristine tracking methodology, and analog pedalboard management.',
      targetVi: 'Người đệm hát, guitarist phòng thu, nhạc sĩ biểu diễn live.',
      targetEn: 'Session musicians, songwriters, and live stage performers.',
    },
    {
      icon: Sliders,
      code: '04',
      title: 'MUSIC PRODUCTION',
      subVi: 'Sáng tác beat & Phối khí DAW',
      subEn: 'DAW Beat Craft & Arrangement',
      descVi: 'Quy trình sản xuất âm nhạc từ ý tưởng sơ khởi đến bản demo hoàn chỉnh trên Ableton Live, Logic Pro và hệ thống synthesizer phần cứng.',
      descEn: 'End-to-end production pipeline from motif conception to release-ready arrangement on Ableton, Logic, and modular gear.',
      targetVi: 'Beatmaker, music producer độc lập, nghệ sĩ tự sản xuất âm nhạc.',
      targetEn: 'Aspiring producers, beatmakers, and self-producing artists.',
    },
    {
      icon: Disc,
      code: '05',
      title: 'MIXING / MASTERING',
      subVi: 'Kỹ thuật cân bằng âm thanh',
      subEn: 'Acoustic Balance & Final Polish',
      descVi: 'Tư duy EQ, nén dynamic analog, tạo không gian reverb/delay 3D và chuẩn hóa loudness theo tiêu chuẩn Spotify / Apple Music Lossless.',
      descEn: 'Surgical EQ, analog compression, 3D spatial staging, and loudness optimization for Apple Music Lossless & Spotify.',
      targetVi: 'Sound engineer, producer muốn hoàn thiện chất lượng âm thanh quốc tế.',
      targetEn: 'Sound engineers and mixing professionals aiming for commercial grade.',
    },
  ];

  return (
    <section id="academy" className="relative py-32 md:py-48 px-8 md:px-16 border-t border-spark-border/60 bg-[#060608] overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[450px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at top left, rgba(139,92,255,0.25), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-8 border-b border-white/[0.06] pb-12">
          <div>
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-4 block">
              {lang === 'vi' ? 'SPARK ACADEMY' : lang === 'en' ? 'SPARK ACADEMY' : 'SPARKアカデミー'}
            </motion.span>
            <motion.h2 {...fadeUp(0.1, 1.4)} className="heading-section">
              {lang === 'vi' ? 'ĐÀO TẠO NGHỆ SĨ & SẢN XUẤT' : lang === 'en' ? 'ARTIST & PRODUCER INCUBATOR' : 'アーティスト＆プロデューサー育成'}
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2, 1.4)} className="max-w-md">
            <p className="text-[12px] font-light text-white/50 leading-[2.0] tracking-[0.06em]">
              {lang === 'vi'
                ? 'Không chỉ giảng dạy nhạc lý đơn thuần. Spark Academy đặt học viên trực tiếp vào môi trường phòng thu tiêu chuẩn quốc tế với lộ trình phát triển cá nhân hóa.'
                : 'Beyond traditional theory. Spark Academy embeds students directly inside professional acoustic environments with bespoke mentorship.'}
            </p>
          </motion.div>
        </div>

        {/* 5 Service Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 1.2, ease: EXPO }}
              className="p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-spark-purple/35 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-spark-purple/70">
                    {prog.code} // PROGRAM
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-spark-purple group-hover:scale-110 transition-transform">
                    <prog.icon size={15} />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-light tracking-[0.16em] uppercase text-white mb-2">
                    {prog.title}
                  </h3>
                  <span className="text-[9.5px] tracking-[0.2em] font-light uppercase text-spark-purple/80 block">
                    {lang === 'vi' ? prog.subVi : prog.subEn}
                  </span>
                </div>

                <p className="text-[11.5px] font-light text-white/50 leading-[1.95] tracking-[0.04em]">
                  {lang === 'vi' ? prog.descVi : prog.descEn}
                </p>

                <div className="p-4 rounded-xl border border-white/[0.04] bg-black/40">
                  <span className="text-[8px] tracking-[0.24em] font-mono uppercase text-white/30 block mb-1">
                    {lang === 'vi' ? 'ĐỐI TƯỢNG HỌC VIÊN' : 'TARGET STUDENT'}
                  </span>
                  <span className="text-[10px] tracking-[0.1em] font-light text-white/70 block">
                    {lang === 'vi' ? prog.targetVi : prog.targetEn}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.05]">
                <LiquidGlassButton href="#contact" variant="secondary" size="sm" fullWidth icon={<ChevronRight size={10} />}>
                  {lang === 'vi' ? 'BOOK A TRIAL LESSON' : 'BOOK A TRIAL LESSON'}
                </LiquidGlassButton>
              </div>
            </motion.div>
          ))}

          {/* Mentorship & Facilities highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.45, duration: 1.2, ease: EXPO }}
            className="p-8 md:p-10 rounded-2xl border border-spark-purple/20 bg-gradient-to-br from-spark-purple/[0.08] to-transparent flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-[0.3em] text-spark-purple">
                PRIVILEGE // STUDIO ACCESS
              </span>
              <h3 className="text-xl font-light tracking-[0.16em] uppercase text-white">
                {lang === 'vi' ? 'HỌC TRỰC TIẾP TẠI PHÒNG THU' : 'PRACTICE ON REAL STUDIO HARDWARE'}
              </h3>
              <p className="text-[11.5px] font-light text-white/60 leading-[1.95]">
                {lang === 'vi'
                  ? 'Mỗi học viên được phân bổ giờ thực hành trực tiếp trên hệ thống Neumann, Genelec và phòng thu âm chuyên nghiệp của Spark Monolith.'
                  : 'Every student receives dedicated hands-on hours with Neumann microphones, Genelec monitors, and Spark recording booths.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <LiquidGlassButton href="#contact" variant="primary" size="sm" fullWidth icon={<ChevronRight size={10} />}>
                {lang === 'vi' ? 'ĐĂNG KÝ HỌC THỬ MIỄN PHÍ' : 'APPLY FOR CONSULTATION'}
              </LiquidGlassButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
