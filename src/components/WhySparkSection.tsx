import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Globe, Layers, ArrowUpRight } from 'lucide-react';
import { LiquidGlassButton } from './LiquidGlass';

type Lang = 'vi' | 'en' | 'jp';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.4) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: dur, ease: EXPO },
});

export function WhySparkSection({ lang }: { lang: Lang }) {
  const pillars = [
    {
      icon: Layers,
      title: lang === 'vi' ? 'HỆ SINH THÁI KHÉP KÍN' : 'INTEGRATED ECOSYSTEM',
      subtitle: lang === 'vi' ? 'Studio • Academy • Media • Label' : 'Studio • Academy • Media • Label',
      desc:
        lang === 'vi'
          ? 'Không phân mảnh các khâu sáng tạo. Toàn bộ quy trình từ ý tưởng âm nhạc, đào tạo kỹ thuật, sản xuất MV đến phát hành toàn cầu đều diễn ra đồng bộ dưới một mái nhà.'
          : 'Zero creative fragmentation. Music production, technical artist incubation, 4K cinematography, and global distribution operate seamlessly under one roof.',
    },
    {
      icon: ShieldCheck,
      title: lang === 'vi' ? 'TIÊU CHUẨN ÂM HỌC QUỐC TẾ' : 'WORLD-CLASS ACOUSTICS',
      subtitle: lang === 'vi' ? 'Phần cứng tham chiếu công nghiệp' : 'Industry Reference Signal Chain',
      desc:
        lang === 'vi'
          ? 'Hệ thống kiểm âm Genelec SAM, preamp Neve & Avalon, vocal booth cách âm anechoic -62dB và quy trình mix Dolby Atmos chuẩn streaming thương mại.'
          : 'Calibrated Genelec SAM monitors, vintage tube signal chains, anechoic vocal isolation tuned to -62dB, and lossless spatial mastering.',
    },
    {
      icon: Globe,
      title: lang === 'vi' ? 'ĐỊNH HƯỚNG TOÀN CẦU' : 'GLOBAL MARKET REACH',
      subtitle: lang === 'vi' ? 'Vươn tầm quốc tế từ Việt Nam' : 'International Positioning from Saigon',
      desc:
        lang === 'vi'
          ? 'Âm nhạc và hình ảnh được định chuẩn cho thị trường quốc tế, phân phối trực tiếp tới các nền tảng streaming hàng đầu châu Á và thế giới.'
          : 'Bilingual songwriting, global DSP direct distribution pipelines, and cinematic aesthetics engineered to resonate across borders.',
    },
    {
      icon: Sparkles,
      title: lang === 'vi' ? 'CAM KẾT ĐỒNG HÀNH DÀI HẠN' : 'ARTIST-FIRST COMMITMENT',
      subtitle: lang === 'vi' ? 'Xây dựng sự nghiệp & di sản' : 'Long-Term Legacy Over Fleeting Trends',
      desc:
        lang === 'vi'
          ? 'Spark không chạy theo những xu hướng tức thời. Chúng tôi đầu tư dài hạn vào bản sắc độc bản, kỹ thuật nghệ sĩ và giá trị nghệ thuật bền vững.'
          : 'We prioritize enduring artist identity, uncompromising technical craft, and sustainable creative equity over ephemeral social hype.',
    },
  ];

  return (
    <section id="why-spark" className="relative py-32 md:py-48 px-8 md:px-16 border-t border-spark-border/60 bg-[#050507] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,255,0.25), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-8 border-b border-white/[0.06] pb-12">
          <div>
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-4 block">
              {lang === 'vi' ? 'TẠI SAO CHỌN SPARK' : 'WHY SPARK ENTERTAINMENT'}
            </motion.span>
            <motion.h2 {...fadeUp(0.1, 1.4)} className="heading-section">
              {lang === 'vi' ? 'NỀN TẢNG CHO SỰ KHÁC BIỆT' : 'THE ARCHITECTURE OF EXCELLENCE'}
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2, 1.4)} className="max-w-md">
            <p className="text-[12px] font-light text-white/50 leading-[2.0] tracking-[0.06em]">
              {lang === 'vi'
                ? 'Sự kết hợp hiếm hoi giữa kỹ thuật âm thanh thượng thừa, tư duy thẩm mỹ thị giác điện ảnh và chiến lược phát triển nghệ sĩ dài hạn tại Việt Nam.'
                : 'A rare convergence of rigorous acoustic mastery, cinema-grade visual direction, and long-term artist development in Southeast Asia.'}
            </p>
          </motion.div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {pillars.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.08, duration: 1.2, ease: EXPO }}
              className="p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-spark-purple/35 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-spark-purple group-hover:scale-110 transition-transform">
                    <item.icon size={16} />
                  </div>
                  <span className="text-[8.5px] font-mono tracking-[0.24em] text-white/20 uppercase">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-light tracking-[0.16em] uppercase text-white mb-2">
                    {item.title}
                  </h3>
                  <span className="text-[9.5px] tracking-[0.2em] font-light uppercase text-spark-purple/80 block">
                    {item.subtitle}
                  </span>
                </div>

                <p className="text-[11.5px] font-light text-white/50 leading-[1.95] tracking-[0.04em]">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[8px] font-mono tracking-[0.24em] uppercase text-white/30">
                  STANDARDS CHECKED
                </span>
                <span className="text-spark-purple opacity-40 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commercial Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-white/[0.015]">
          <div>
            <span className="text-[8.5px] tracking-[0.3em] font-mono text-spark-purple uppercase block mb-1">
              PARTNERSHIP & COLLABORATION
            </span>
            <h3 className="text-xl md:text-2xl font-light tracking-[0.14em] uppercase text-white">
              {lang === 'vi' ? 'HỢP TÁC CÙNG SPARK ENTERTAINMENT' : 'WORK WITH SPARK ENTERTAINMENT'}
            </h3>
          </div>
          <LiquidGlassButton href="#contact" variant="primary" size="md">
            WORK WITH SPARK
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
}
