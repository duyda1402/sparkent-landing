import React, { useEffect, useRef } from 'react';
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MinimalNav } from '@/components/MinimalNav';
import { MinimalFooter } from '@/components/MinimalFooter';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useLanguage } from '@/lib/LanguageContext';
import { useBookingModal } from '@/lib/BookingContext';
import { getPillar, PillarCta, PillarData } from '@/lib/pillars';
import NotFoundPage from '@/pages/NotFound/index';
import { CreateModule, DevelopModule, LearnModule, ReleaseModule } from './modules';
import { BTN_GHOST, BTN_LIGHT, EASE } from './ui';

const CtaButton: React.FC<{ cta: PillarCta; className: string }> = ({ cta, className }) => {
  const { lang } = useLanguage();
  const { openBooking } = useBookingModal();
  const label = lang === 'vi' ? cta.labelVi : cta.labelEn;
  const action = cta.action;

  if (action.kind === 'booking') {
    return (
      <button type="button" onClick={() => openBooking(action.service)} className={className}>
        {label}
      </button>
    );
  }
  return (
    <Link to={action.href} className={className}>
      {label}
      <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
};

// Masked line reveal: the text slides up from behind its own line box
const RevealLine: React.FC<{ children: React.ReactNode; delay: number; className?: string }> = ({ children, delay, className = '' }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: '105%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const PillarHero: React.FC<{ pillar: PillarData }> = ({ pillar }) => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden bg-[#080808] text-[#F4F1E8] flex flex-col">
      <motion.div style={reduceMotion ? undefined : { scale: imageScale, y: imageY }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={pillar.heroImage}
            alt={vi ? pillar.imageAltVi : pillar.imageAltEn}
            fetchPriority="high"
            className="w-full h-full"
            style={{ objectPosition: pillar.heroFocus }}
          />
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-[#080808]/25 to-transparent" />

      <div className="relative z-10 flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-28 lg:pb-20">
        <Link
          to="/#intro"
          className="self-start inline-flex items-center gap-2.5 min-h-[44px] font-condensed text-xs font-bold tracking-[0.26em] uppercase text-[#F4F1E8]/70 hover:text-[#F4F1E8] transition-colors duration-300"
        >
          <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
          {vi ? 'GIỚI THIỆU' : 'ABOUT'}
        </Link>

        <div className="mt-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="block font-condensed text-xs font-bold tracking-[0.32em] text-[#A78BFA]"
            >
              {pillar.unit}
            </motion.span>
            <h1 className="mt-5 font-condensed font-extrabold uppercase text-[clamp(5.5rem,16vw,15rem)] leading-[0.88] tracking-[-0.02em] text-[#F4F1E8]">
              <RevealLine delay={0.2}>{pillar.word}</RevealLine>
            </h1>
            <p className="mt-2 font-condensed italic font-bold uppercase text-[clamp(1.9rem,4vw,3.75rem)] leading-[1.15] tracking-[-0.01em] text-[#8B5CF6]">
              <RevealLine delay={0.35} className="pt-[0.08em] pb-[0.04em]">
                {vi ? pillar.subVi : pillar.subEn}.
              </RevealLine>
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className="lg:col-span-4 lg:pb-4"
          >
            <p className="max-w-[40ch] text-base md:text-lg leading-relaxed text-[#F4F1E8]/80">{vi ? pillar.leadVi : pillar.leadEn}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton cta={pillar.primaryCta} className={BTN_LIGHT} />
              <CtaButton cta={pillar.secondaryCta} className={BTN_GHOST} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Responsive hairlines for a 1 / 2 / 4 column facts row
const FACT_CELL = [
  'sm:pr-8',
  'border-t sm:border-t-0 sm:border-l sm:pl-8 lg:pr-8',
  'border-t sm:pr-8 lg:border-t-0 lg:border-l lg:pl-8',
  'border-t sm:border-l sm:pl-8 lg:border-t-0',
];

const FactsStrip: React.FC<{ pillar: PillarData }> = ({ pillar }) => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';

  return (
    <section className="w-full bg-white border-b border-[#E5E5E5] px-6 md:px-12 lg:px-20">
      <dl className="max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pillar.facts.map((fact, i) => (
          <div key={fact.labelEn} className={`py-8 lg:py-11 border-[#E5E5E5] ${FACT_CELL[i] ?? ''}`}>
            <dt className="font-condensed text-xs font-bold tracking-[0.28em] text-[#7C3AED]">{vi ? fact.labelVi : fact.labelEn}</dt>
            <dd className="mt-3 text-base md:text-[17px] leading-relaxed text-[#0A0A0A]">
              {vi ? fact.valueVi : fact.valueEn}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const ClosingCta: React.FC<{ pillar: PillarData }> = ({ pillar }) => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';
  const { closing } = pillar;
  const [line1, line2] = vi ? closing.titleVi : closing.titleEn;

  return (
    <section className="relative overflow-hidden w-full bg-[#080808] text-[#F4F1E8] px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <div aria-hidden="true" className="absolute inset-0 opacity-35">
        <ImageWithFallback src={pillar.heroImage} alt="" loading="lazy" className="w-full h-full" style={{ objectPosition: pillar.heroFocus }} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/45" />

      <div className="relative max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="lg:col-span-7 font-condensed font-extrabold uppercase text-[clamp(3rem,7vw,7rem)] leading-[0.98] tracking-[-0.015em]"
        >
          {line1}
          <span className="block pt-1 pb-1 font-bold italic text-[#8B5CF6]">{line2}</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="lg:col-span-5 lg:pb-3"
        >
          <p className="max-w-[42ch] text-base md:text-lg leading-relaxed text-[#F4F1E8]/75">{vi ? closing.bodyVi : closing.bodyEn}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton cta={closing.primary} className={BTN_LIGHT} />
            <CtaButton cta={closing.secondary} className={BTN_GHOST} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function PillarPage() {
  const { pillar: slug } = useParams();
  const { lang } = useLanguage();
  const pillar = getPillar(slug);

  useEffect(() => {
    if (!pillar) return;
    document.title = `${pillar.word}: ${lang === 'vi' ? pillar.subVi : pillar.subEn} | Spark Entertainment`;
  }, [pillar, lang]);

  if (!pillar) return <NotFoundPage />;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white text-[#0A0A0A] min-h-screen relative overflow-x-clip selection:bg-[#7C3AED]/20 selection:text-[#0A0A0A]">
        <MinimalNav />
        {/* Keyed so entry animations replay when the pillar changes */}
        <div key={pillar.slug}>
          <PillarHero pillar={pillar} />
          <FactsStrip pillar={pillar} />
          {pillar.slug === 'learn' && <LearnModule />}
          {pillar.slug === 'create' && <CreateModule />}
          {pillar.slug === 'develop' && <DevelopModule />}
          {pillar.slug === 'release' && <ReleaseModule />}
          <ClosingCta pillar={pillar} />
        </div>
        <MinimalFooter />
      </div>
    </MotionConfig>
  );
}
