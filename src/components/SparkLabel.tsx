import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { LiquidGlassButton } from './LiquidGlass';

type Lang = 'vi' | 'en' | 'jp';

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0, dur = 1.6) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: dur, ease: EXPO },
});

// Priority 9: DISCOVER, DEVELOP, PRODUCE, RELEASE, MARKET, GROW
const STEPS = (lang: Lang) => [
  {
    num: '01',
    key: lang === 'vi' ? 'DISCOVER' : lang === 'en' ? 'DISCOVER' : 'DISCOVER',
    sub: lang === 'vi' ? 'Tìm kiếm nghệ sĩ tiềm năng' : lang === 'en' ? 'Talent Scouting & Demo Submissions' : '才能あるアーティストを発掘',
    body:
      lang === 'vi'
        ? 'Tìm kiếm và tuyển chọn nghệ sĩ tài năng qua cổng demo trực tuyến, buổi thử giọng và creative scouting chuyên nghiệp.'
        : 'Discovering gifted voices through digital demo submissions, physical auditions, and in-field creative scouting across Southeast Asia.',
    tags: ['Demo Review', 'Auditions', 'A&R Scouting', 'Talent Incubator'],
  },
  {
    num: '02',
    key: lang === 'vi' ? 'DEVELOP' : lang === 'en' ? 'DEVELOP' : 'DEVELOP',
    sub: lang === 'vi' ? 'Đào tạo nghệ sĩ toàn diện' : lang === 'en' ? 'Holistic Artist Incubation' : 'プロのアーティスト育成',
    body:
      lang === 'vi'
        ? 'Đào tạo kỹ thuật thanh nhạc, nhạc cụ, sáng tác, giải phóng hình thể sân khấu, định hình phong cách thời trang và kỹ năng truyền thông.'
        : 'Deep technical incubation across vocal architecture, songwriting, physical staging, visual image consulting, and media coaching.',
    tags: ['Vocal Coaching', 'Instruments', 'Staging', 'Songwriting', 'Media Training'],
  },
  {
    num: '03',
    key: lang === 'vi' ? 'PRODUCE' : lang === 'en' ? 'PRODUCE' : 'PRODUCE',
    sub: lang === 'vi' ? 'Sản xuất âm nhạc & hình ảnh' : lang === 'en' ? 'World-Class Studio Production' : 'ワールドクラスのプロダクション',
    body:
      lang === 'vi'
        ? 'Sản xuất bản thu âm phòng thu chuẩn audiophile, mixing Dolby Atmos, master uncompressed, kết hợp chỉ đạo MV 4K điện ảnh.'
        : 'Audiophile tracking at Spark Studio A, immersive Dolby Atmos mixing, uncompressed analog mastering, and 4K cinema music videos.',
    tags: ['Recording', 'Mixing', 'Mastering', 'MV Production', 'Visual Identity'],
  },
  {
    num: '04',
    key: lang === 'vi' ? 'RELEASE' : lang === 'en' ? 'RELEASE' : 'RELEASE',
    sub: lang === 'vi' ? 'Phát hành âm nhạc toàn cầu' : lang === 'en' ? 'Worldwide Streaming Distribution' : '世界規模の音楽配信',
    body:
      lang === 'vi'
        ? 'Phân phối bản quyền toàn cầu trên Spotify, Apple Music, YouTube Music, TikTok Music, QQ Music và LINE MUSIC.'
        : 'Global distribution pipeline to Spotify, Apple Music, YouTube Music, TikTok Music, QQ Music, and LINE MUSIC with verified metadata.',
    tags: ['Spotify', 'Apple Music', 'YouTube Music', 'TikTok Music', 'Lossless Masters'],
  },
  {
    num: '05',
    key: lang === 'vi' ? 'MARKET' : lang === 'en' ? 'MARKET' : 'MARKET',
    sub: lang === 'vi' ? 'Chiến dịch truyền thông đa kênh' : lang === 'en' ? 'Editorial & Visual Campaigns' : '戦略的マーケティング',
    body:
      lang === 'vi'
        ? 'Triển khai chiến dịch truyền thông đa nền tảng, bài PR trên các tạp chí văn hóa, playlist pitching và chiến lược viral social.'
        : 'Full-funnel launch campaigns, cultural editorial placements, major DSP playlist pitching, and high-impact social content.',
    tags: ['Playlist Pitching', 'Editorial PR', 'Digital Campaigns', 'Fan Community'],
  },
  {
    num: '06',
    key: lang === 'vi' ? 'GROW' : lang === 'en' ? 'GROW' : 'GROW',
    sub: lang === 'vi' ? 'Đồng hành sự nghiệp bền vững' : lang === 'en' ? 'Long-Term Legacy & Touring' : '長期的なキャリア成長',
    body:
      lang === 'vi'
        ? 'Đồng hành dài hạn: hợp tác thương hiệu xa xỉ, booking lễ hội âm nhạc quốc tế, lưu diễn và xây dựng di sản nghệ thuật bền vững.'
        : 'Long-term management: luxury brand endorsements, international festival bookings, arena tours, and enduring cultural legacy.',
    tags: ['Brand Collabs', 'Concert Tours', 'Festival Bookings', 'Global Expansion'],
  },
];

const JOURNEY = (lang: Lang) => [
  lang === 'vi' ? 'Ước mơ (Dream)' : 'Dream',
  lang === 'vi' ? 'Demo Submission' : 'Demo',
  lang === 'vi' ? 'Đào tạo (Training)' : 'Training',
  lang === 'vi' ? 'Thu âm (Recording)' : 'Recording',
  lang === 'vi' ? 'Phát hành (Release)' : 'Release',
  lang === 'vi' ? 'Thịnh hành (Trending)' : 'Trending',
  lang === 'vi' ? 'Hòa nhạc (Concert)' : 'Concert',
  lang === 'vi' ? 'Sân khấu quốc tế' : 'International Stage',
];

function StepCard({ step, index }: { step: ReturnType<typeof STEPS>[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 1.3, ease: EXPO }}
      className="group relative flex flex-col p-7 md:p-8 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'rgba(255,255,255,0.018)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.055)',
        boxShadow: '0 0 28px rgba(139,92,255,0.04), inset 0 1px 0 rgba(255,255,255,0.045)',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(139,92,255,0.10), transparent 70%)' }}
      />
      <div
        className="absolute top-0 left-5 right-5 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)' }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: '1px solid rgba(139,92,255,0.32)' }}
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        <div className="flex items-baseline justify-between">
          <span className="text-[9px] tracking-[0.44em] font-mono text-spark-purple">{step.num}</span>
          <div className="w-5 h-px" style={{ background: 'rgba(139,92,255,0.30)' }} />
        </div>

        <div>
          <h3 className="text-sm font-light tracking-[0.24em] uppercase text-white mb-1.5">{step.key}</h3>
          <p className="text-[9.5px] tracking-[0.16em] uppercase font-light text-spark-purple/80">{step.sub}</p>
        </div>

        <p className="text-[11px] font-light leading-[1.95] text-white/50 tracking-[0.04em] flex-1">
          {step.body}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.045)' }}>
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="text-[7.5px] tracking-[0.22em] uppercase font-light text-white/35 bg-white/[0.035] border border-white/[0.05] px-2.5 py-1.5 rounded-full group-hover:border-spark-purple/20 group-hover:text-white/60 transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function JourneyMilestone({ label, index, total }: { label: string; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex items-center gap-5 md:gap-7">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.05, duration: 0.7, ease: EXPO }}
          className="relative flex-shrink-0"
        >
          <div
            className="w-[10px] h-[10px] rounded-full border transition-all duration-700"
            style={{
              borderColor: inView ? 'rgba(139,92,255,0.85)' : 'rgba(139,92,255,0.20)',
              background: inView ? 'radial-gradient(circle, rgba(139,92,255,0.60) 0%, transparent 70%)' : 'transparent',
              boxShadow: inView ? '0 0 12px rgba(139,92,255,0.55), 0 0 28px rgba(139,92,255,0.20)' : 'none',
            }}
          />
          {inView && (
            <motion.div
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ delay: index * 0.05 + 0.1, duration: 1.1, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'rgba(139,92,255,0.25)' }}
            />
          )}
        </motion.div>

        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.05 + 0.05, duration: 1.0, ease: EXPO }}
          className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-light transition-colors duration-700"
          style={{ color: inView ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)' }}
        >
          {label}
        </motion.span>
      </div>

      {!isLast && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.05 + 0.15, duration: 0.8, ease: 'easeOut' }}
          className="ml-[2px] w-px"
          style={{
            height: '42px',
            background: 'linear-gradient(to bottom, rgba(139,92,255,0.50), rgba(139,92,255,0.10))',
            transformOrigin: 'top',
          }}
        />
      )}
    </div>
  );
}

export function SparkLabel({ lang }: { lang: Lang }) {
  const steps = STEPS(lang);
  const journey = JOURNEY(lang);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const headline =
    lang === 'vi' ? (
      <>
        Không chỉ phát hành âm nhạc.
        <br />
        Chúng tôi xây dựng sự nghiệp nghệ sĩ.
      </>
    ) : lang === 'en' ? (
      <>
        We Don't Just Release Music.
        <br />
        We Build Artist Careers.
      </>
    ) : (
      <>
        音楽をリリースするだけじゃない。
        <br />
        アーティストのキャリアを築く。
      </>
    );

  const subtitle =
    lang === 'vi'
      ? 'Spark Label đồng hành cùng nghệ sĩ từ ý tưởng sơ khởi đến sự công nhận toàn cầu thông qua một hệ sinh thái giải trí khép kín.'
      : 'Spark Label accompanies artists from raw demo ideation to international recognition through one seamlessly integrated creative ecosystem.';

  return (
    <section
      id="label"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-spark-border/60"
      style={{ background: '#050507' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: parallaxY, background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,255,0.06) 0%, transparent 65%)' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at right bottom, rgba(139,92,255,0.04), transparent 65%)' }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pt-36 md:pt-48 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-6 block">
              {lang === 'vi' ? 'SPARK LABEL' : lang === 'en' ? 'SPARK LABEL' : 'SPARKレーベル'}
            </motion.span>
            <motion.h2
              {...fadeUp(0.1, 1.6)}
              className="text-[clamp(1.9rem,4.2vw,3.6rem)] font-light tracking-[0.08em] text-white leading-[1.18]"
            >
              {headline}
            </motion.h2>
          </div>
          <motion.div {...fadeUp(0.2, 1.4)} className="lg:col-span-5">
            <p className="text-[12px] font-light leading-[2.1] tracking-[0.08em] text-white/50" style={{ textTransform: 'none' }}>
              {subtitle}
            </p>
            <div
              className="mt-8 h-px"
              style={{ background: 'linear-gradient(90deg, rgba(139,92,255,0.50), rgba(255,139,167,0.2), transparent)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* 6 Steps Grid: DISCOVER, DEVELOP, PRODUCE, RELEASE, MARKET, GROW */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-28 md:pb-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* Artist Journey Timeline */}
      <div className="relative z-10 border-t border-spark-border/60" style={{ background: 'rgba(0,0,0,0.30)' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-28 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <motion.span {...fadeUp(0, 1.0)} className="label-micro mb-6 block">
                {lang === 'vi' ? 'HÀNH TRÌNH NGHỆ SĨ' : lang === 'en' ? 'ARTIST JOURNEY' : 'アーティストジャーニー'}
              </motion.span>
              <motion.h3
                {...fadeUp(0.1, 1.5)}
                className="text-[clamp(1.5rem,2.8vw,2.4rem)] font-light tracking-[0.10em] text-white leading-[1.25] mb-6"
              >
                {lang === 'vi' ? 'Từ ước mơ sơ khởi đến sân khấu quốc tế.' : 'From initial dream to international spotlight.'}
              </motion.h3>
              <motion.p
                {...fadeUp(0.2, 1.4)}
                className="text-[11.5px] font-light leading-[2.0] tracking-[0.06em] text-white/40"
                style={{ textTransform: 'none' }}
              >
                {lang === 'vi'
                  ? 'Spark định hình bệ phóng bền vững để nghệ sĩ tập trung tuyệt đối vào sáng tạo và di sản âm nhạc dài lâu.'
                  : 'Spark provides an unyielding springboard so artists can dedicate their energy solely to authentic creative craft and enduring legacy.'}
              </motion.p>
            </div>

            <div className="lg:col-span-8">
              <div className="flex flex-col items-start pl-4">
                {journey.map((label, i) => (
                  <JourneyMilestone key={label} label={label} index={i} total={journey.length} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Strip */}
      <div className="relative z-10 border-t border-spark-border/60">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-24 md:py-32">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="space-y-3">
              <span className="label-micro block">
                {lang === 'vi' ? 'KHỞI ĐẦU HÀNH TRÌNH' : lang === 'en' ? 'YOUR STORY STARTS HERE' : 'ここから始まる'}
              </span>
              <h3 className="text-[clamp(1.6rem,3.2vw,2.8rem)] font-light tracking-[0.10em] text-white leading-[1.2]">
                {lang === 'vi' ? (
                  <>Hành trình nghệ sĩ của bạn bắt đầu từ đây.</>
                ) : (
                  <>Your Story Starts Here.</>
                )}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
              <LiquidGlassButton href="#contact" variant="primary" size="lg" icon={<ChevronRight size={11} />}>
                SUBMIT YOUR DEMO
              </LiquidGlassButton>
              <LiquidGlassButton href="#contact" variant="secondary" size="lg" icon={<ChevronRight size={11} />}>
                {lang === 'vi' ? 'HỢP TÁC NGHỆ SĨ SPARK' : 'WORK WITH SPARK'}
              </LiquidGlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
