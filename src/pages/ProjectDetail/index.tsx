import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data';
import { LiquidGlassButton } from '@/components/LiquidGlass';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const project = PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${project.title} — Case Study | Spark Entertainment`;
  }, [project]);

  return (
    <div className="bg-[#050507] text-white min-h-screen relative selection:bg-spark-purple/20 pb-32">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,255,0.1), transparent 70%)' }}
      />

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 px-8 md:px-16 flex items-center justify-between border-b border-white/[0.05] bg-[#050507]/80 backdrop-blur-xl">
        <Link
          to="/#projects"
          className="flex items-center gap-3 text-[10px] tracking-[0.26em] uppercase font-light text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={13} className="text-spark-purple" />
          <span>Back to Projects</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.3em] font-light text-spark-purple uppercase">
            CASE STUDY ARCHIVE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-spark-purple animate-pulse" />
        </div>
      </header>

      {/* Hero Meta */}
      <section className="pt-36 md:pt-44 px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EXPO }}
          className="space-y-6 max-w-4xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.34em] font-light uppercase px-3 py-1 rounded-full border border-spark-purple/40 text-spark-purple bg-spark-purple/5">
              {project.cat}
            </span>
            <span className="text-[9px] tracking-[0.26em] uppercase text-white/40 font-mono">
              YEAR {project.year}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-[0.08em] uppercase text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-[14px] md:text-[15px] font-light text-white/60 leading-[2.1] tracking-[0.04em] max-w-2xl">
            {project.desc}
          </p>
        </motion.div>

        {/* Project Spec Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 mt-12 border-y border-white/[0.06]">
          <div>
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">PROJECT</span>
            <span className="text-[11px] tracking-[0.16em] uppercase text-white font-light">{project.title}</span>
          </div>
          <div>
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">CLIENT / ARTIST</span>
            <span className="text-[11px] tracking-[0.16em] uppercase text-white font-light">{project.client}</span>
          </div>
          <div>
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">YEAR</span>
            <span className="text-[11px] tracking-[0.16em] uppercase text-white font-light">{project.year}</span>
          </div>
          <div>
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block mb-1">CATEGORY</span>
            <span className="text-[11px] tracking-[0.16em] uppercase text-spark-purple font-light">{project.cat}</span>
          </div>
        </div>

        {/* Primary Cinematic Asset */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-white/[0.08] relative aspect-[16/9] shadow-[0_0_50px_rgba(139,92,255,0.06)]">
          <ImageWithFallback
            src={project.cover}
            alt={project.title}
            fallbackLabel={project.title}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
            <div>
              <span className="text-[8.5px] tracking-[0.3em] font-mono text-spark-purple block mb-1">
                EXECUTIVE PRODUCTION
              </span>
              <p className="text-xl md:text-2xl font-light tracking-[0.14em] uppercase text-white">
                {project.title} // OFFICIAL RELEASE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Narrative Architecture */}
      <section className="pt-24 md:pt-36 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.015]">
            <span className="text-[8.5px] tracking-[0.32em] font-mono text-spark-purple block mb-3">01 // CONCEPT</span>
            <h3 className="text-sm font-light tracking-[0.18em] uppercase text-white mb-3">Narrative Core</h3>
            <p className="text-[11.5px] font-light leading-[1.95] text-white/50 tracking-[0.03em]">{project.concept}</p>
          </div>

          <div className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.015]">
            <span className="text-[8.5px] tracking-[0.32em] font-mono text-spark-purple block mb-3">02 // DIRECTION</span>
            <h3 className="text-sm font-light tracking-[0.18em] uppercase text-white mb-3">Creative Language</h3>
            <p className="text-[11.5px] font-light leading-[1.95] text-white/50 tracking-[0.03em]">{project.creativeDirection}</p>
          </div>

          <div className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.015]">
            <span className="text-[8.5px] tracking-[0.32em] font-mono text-spark-purple block mb-3">03 // PRODUCTION</span>
            <h3 className="text-sm font-light tracking-[0.18em] uppercase text-white mb-3">Technical Execution</h3>
            <p className="text-[11.5px] font-light leading-[1.95] text-white/50 tracking-[0.03em]">{project.production}</p>
          </div>

          <div className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.015]">
            <span className="text-[8.5px] tracking-[0.32em] font-mono text-emerald-400 block mb-3">04 // RESULT</span>
            <h3 className="text-sm font-light tracking-[0.18em] uppercase text-white mb-3">Impact & Legacy</h3>
            <p className="text-[11.5px] font-light leading-[1.95] text-white/50 tracking-[0.03em]">{project.result}</p>
          </div>
        </div>
      </section>

      {/* Production Gallery & Credits */}
      <section className="pt-24 md:pt-36 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-4">
              <span className="text-[9px] tracking-[0.3em] uppercase text-spark-purple font-light">VISUAL RECORD</span>
              <span className="text-[8.5px] tracking-[0.24em] font-mono text-white/30 uppercase">SPARK MEDIA ARCHIVE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06]">
                  <ImageWithFallback
                    src={img}
                    alt={`${project.title} asset 0${idx + 1}`}
                    fallbackLabel={`${project.title} FRAME ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Credits Column */}
          <div className="lg:col-span-4 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <span className="text-[9px] tracking-[0.34em] uppercase text-spark-purple font-light block mb-6">
              PRODUCTION CREDITS
            </span>
            <div className="space-y-4">
              {project.credits.map((c, idx) => (
                <div key={idx} className="flex justify-between items-baseline border-b border-white/[0.04] pb-3">
                  <span className="text-[9px] tracking-[0.24em] uppercase text-white/40 font-light">{c.role}</span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-white font-light">{c.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-4 text-[9px] tracking-[0.2em] font-mono text-emerald-400">
                <CheckCircle2 size={12} />
                <span>SPARK ENTERTAINMENT ARCHIVED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Call to Action */}
      <section className="pt-28 md:pt-40 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="p-10 md:p-16 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent text-center space-y-8 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(139,92,255,0.4), transparent 70%)' }}
          />
          <span className="text-[9px] tracking-[0.38em] uppercase text-spark-purple font-light block">
            NEXT COLLABORATION
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] uppercase text-white">
            START A PROJECT WITH SPARK
          </h2>
          <p className="text-[12px] font-light text-white/50 max-w-md mx-auto leading-relaxed">
            From creative direction and recording to global distribution and brand campaigns.
          </p>
          <div className="flex justify-center pt-2">
            <LiquidGlassButton href="/#contact" variant="primary" size="lg" icon={<Sparkles size={11} />}>
              Schedule Project Consultation
            </LiquidGlassButton>
          </div>
        </div>
      </section>
    </div>
  );
}
