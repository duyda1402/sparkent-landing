import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Instagram, Youtube, Music, Disc, Sparkles, ExternalLink, Mail } from 'lucide-react';
import { ARTISTS_DATA } from '@/lib/data';
import { LiquidGlassButton } from '@/components/LiquidGlass';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function ArtistDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(24);

  const artist = ARTISTS_DATA.find((a) => a.slug === slug) || ARTISTS_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${artist.name} — Artist Profile | Spark Entertainment`;
  }, [artist]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#050507] text-white min-h-screen relative selection:bg-spark-purple/20 pb-32">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(139,92,255,0.08), transparent 70%)' }} />

      {/* Top Bar / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 px-8 md:px-16 flex items-center justify-between border-b border-white/[0.05] bg-[#050507]/80 backdrop-blur-xl">
        <Link
          to="/#artists"
          className="flex items-center gap-3 text-[10px] tracking-[0.26em] uppercase font-light text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={13} className="text-spark-purple" />
          <span>Back to Artists</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.3em] font-light text-spark-purple uppercase">SPARK LABEL ROSTER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-spark-purple animate-pulse" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 md:pt-44 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EXPO }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_40px_rgba(139,92,255,0.06)]">
              <ImageWithFallback
                src={artist.portrait}
                alt={`${artist.name} portrait`}
                fallbackLabel={artist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[8.5px] tracking-[0.34em] font-light uppercase text-spark-purple block mb-1">
                    {artist.genre}
                  </span>
                  <p className="text-[10px] tracking-[0.24em] font-light uppercase text-white/50">
                    {artist.releasesCount}
                  </p>
                </div>
                <span className="text-[8px] tracking-[0.28em] font-mono text-white/30 uppercase px-2.5 py-1 rounded border border-white/[0.08] bg-black/40">
                  EXCLUSIVE ROSTER
                </span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center justify-center gap-6 mt-8 py-4 px-6 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <a href={artist.socials.spotify} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Spotify">
                <Music size={15} />
              </a>
              <a href={artist.socials.appleMusic} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Apple Music">
                <Disc size={15} />
              </a>
              <a href={artist.socials.youtube} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={15} />
              </a>
              <a href={artist.socials.instagram} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={15} />
              </a>
            </div>
          </motion.div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1.2, ease: EXPO }}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <span className="text-[9.5px] tracking-[0.38em] uppercase text-spark-purple font-light block mb-3">
                {artist.role}
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-[0.08em] text-white uppercase mb-6">
                {artist.name}
              </h1>
              <div className="space-y-4 max-w-2xl text-[13px] font-light leading-[2.1] text-white/60 tracking-[0.04em]">
                {artist.bio.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Interactive Music Player Card */}
            <div className="p-7 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(139,92,255,0.4), transparent 70%)' }} />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8.5px] tracking-[0.3em] font-light uppercase text-white/50">
                    LATEST RELEASE SPOTLIGHT
                  </span>
                </div>
                <span className="text-[8.5px] tracking-[0.24em] font-mono text-white/30">
                  {artist.latestRelease.duration}
                </span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-light tracking-[0.16em] uppercase text-white">
                    {artist.latestRelease.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] font-light uppercase text-white/40 mt-1">
                    {artist.latestRelease.type} • {artist.latestRelease.year}
                  </p>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-13 h-13 rounded-full flex items-center justify-center bg-white text-black hover:bg-spark-purple hover:text-white transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
                  aria-label={isPlaying ? 'Pause track' : 'Play track'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-5 pt-4 border-t border-white/[0.05]">
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-spark-purple rounded-full"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono text-white/30 mt-2">
                  <span>01:14</span>
                  <span>{isPlaying ? 'STREAMING VIA SPARK AUDIO BUS' : 'CLICK PLAY TO AUDITION'}</span>
                  <span>{artist.latestRelease.duration}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <LiquidGlassButton href="/#contact" variant="primary" size="md" icon={<Sparkles size={11} />}>
                Booking & Performance Inquiries
              </LiquidGlassButton>
              <LiquidGlassButton href="/#contact" variant="secondary" size="md" icon={<Mail size={11} />}>
                Contact Artist Management
              </LiquidGlassButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discography & Featured Releases */}
      <section className="pt-28 md:pt-36 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12 border-b border-white/[0.06] pb-6">
          <div>
            <span className="text-[9px] tracking-[0.36em] uppercase text-spark-purple font-light block mb-2">CATALOGUE</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.16em] uppercase text-white">Discography & Releases</h2>
          </div>
          <span className="text-[9.5px] tracking-[0.24em] font-light text-white/40 uppercase">SPARK LABEL MASTER VAULT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {artist.discography.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-spark-purple/30 transition-all duration-300 group flex items-center justify-between"
            >
              <div>
                <span className="text-[8px] tracking-[0.28em] font-mono text-spark-purple/70 block mb-1">
                  0{idx + 1} // {item.year}
                </span>
                <h3 className="text-sm font-light tracking-[0.16em] uppercase text-white group-hover:text-white/80 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[8.5px] tracking-[0.2em] font-light uppercase text-white/35 mt-1 block">
                  {item.type}
                </span>
              </div>
              <ExternalLink size={12} className="text-white/20 group-hover:text-spark-purple transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Visual Archive / Gallery */}
      <section className="pt-28 md:pt-36 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12 border-b border-white/[0.06] pb-6">
          <div>
            <span className="text-[9px] tracking-[0.36em] uppercase text-spark-purple font-light block mb-2">VISUAL ARCHIVE</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.16em] uppercase text-white">Editorial & Studio Sessions</h2>
          </div>
          <span className="text-[9.5px] tracking-[0.24em] font-light text-white/40 uppercase">35MM ANAMORPHIC</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artist.gallery.map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] group">
              <ImageWithFallback
                src={img}
                alt={`${artist.name} visual archive 0${idx + 1}`}
                fallbackLabel={`${artist.name} SESSION 0${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-[8px] tracking-[0.3em] font-mono text-white/60 uppercase">
                  SESSION ARCHIVE #{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
