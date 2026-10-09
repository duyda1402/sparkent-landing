import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '@/lib/data';

export type Lang = 'vi' | 'en' | 'jp';

interface EditorialNavProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isMuted: boolean;
  onToggleAudio: () => void;
}

const NAV_ITEMS = {
  vi: [
    { label: 'Hệ sinh thái', href: '#ecosystem', code: '01' },
    { label: 'Dự án', href: '#projects', code: '02' },
    { label: 'Studio', href: '#studio', code: '03' },
    { label: 'Academy', href: '#academy', code: '04' },
    { label: 'Media', href: '#media', code: '05' },
    { label: 'Label', href: '#label', code: '06' },
    { label: 'Nghệ sĩ', href: '#artists', code: '07' },
    { label: 'Liên hệ', href: '#contact', code: '08' },
  ],
  en: [
    { label: 'Ecosystem', href: '#ecosystem', code: '01' },
    { label: 'Works', href: '#projects', code: '02' },
    { label: 'Studio', href: '#studio', code: '03' },
    { label: 'Academy', href: '#academy', code: '04' },
    { label: 'Media', href: '#media', code: '05' },
    { label: 'Label', href: '#label', code: '06' },
    { label: 'Artists', href: '#artists', code: '07' },
    { label: 'Contact', href: '#contact', code: '08' },
  ],
  jp: [
    { label: 'エコシステム', href: '#ecosystem', code: '01' },
    { label: 'プロジェクト', href: '#projects', code: '02' },
    { label: 'スタジオ', href: '#studio', code: '03' },
    { label: 'アカデミー', href: '#academy', code: '04' },
    { label: 'メディア', href: '#media', code: '05' },
    { label: 'レーベル', href: '#label', code: '06' },
    { label: 'アーティスト', href: '#artists', code: '07' },
    { label: 'お問い合わせ', href: '#contact', code: '08' },
  ],
};

export const EditorialNav: React.FC<EditorialNavProps> = ({
  lang,
  setLang,
  isMuted,
  onToggleAudio,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live HCMC time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navs = NAV_ITEMS[lang];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#050507]/90 backdrop-blur-2xl border-b border-white/[0.07] py-4'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 md:py-8'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Left Brand Identity: Spark Wave Peak Crest */}
          <a
            href="#hero"
            className="flex items-center gap-4 group transition-transform duration-300 active:scale-95"
            aria-label="Spark Entertainment Home"
          >
            <div className="relative flex items-center justify-center">
              {/* Soft purple glow surrounding crest */}
              <div className="absolute inset-0 rounded-full bg-spark-purple/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 scale-125 pointer-events-none" />
              <img
                src={ASSETS.logo}
                alt="Spark Entertainment Crest"
                className="h-10 md:h-12 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] font-medium tracking-[0.28em] text-white uppercase leading-none">
                SPARK
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-white/40 uppercase mt-1">
                ENTERTAINMENT
              </span>
            </div>
          </a>

          {/* Center: Editorial Monograph Navigation (Desktop) */}
          <nav className="hidden xl:flex items-center gap-8 2xl:gap-10">
            {navs.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative flex items-center gap-1.5 py-1 text-[9.5px] font-mono tracking-[0.24em] text-white/60 hover:text-white transition-colors duration-300 uppercase"
              >
                <span className="text-[8px] text-spark-purple/60 group-hover:text-spark-purple transition-colors duration-300">
                  {item.code}
                </span>
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-spark-purple group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right: Telemetry, Audio & Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* HCMC Live Station Clock */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8.5px] font-mono tracking-[0.16em] text-white/50 uppercase">
                HCMC {timeStr || '20:00:00'}
              </span>
            </div>

            {/* Ambient Soundscape Controller */}
            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-[9px] font-mono tracking-[0.18em] uppercase ${
                !isMuted
                  ? 'border-spark-purple/60 bg-spark-purple/15 text-white shadow-[0_0_15px_rgba(139,92,255,0.3)]'
                  : 'border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20'
              }`}
              title={isMuted ? 'Turn on ambient soundscape' : 'Mute soundscape'}
            >
              {!isMuted ? (
                <>
                  <Volume2 size={12} className="text-spark-purple" />
                  <span className="hidden sm:inline">SOUND ON</span>
                  <span className="flex gap-0.5 items-end h-2.5">
                    <span className="w-0.5 h-2 bg-spark-purple animate-pulse" />
                    <span className="w-0.5 h-3 bg-spark-purple animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-spark-purple animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX size={12} className="text-white/40" />
                  <span className="hidden sm:inline">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
              {(['vi', 'en', 'jp'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded-full text-[8.5px] font-mono tracking-[0.14em] uppercase transition-all duration-300 ${
                    lang === l
                      ? 'bg-spark-purple text-white shadow-[0_0_10px_rgba(139,92,255,0.4)]'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-[9.5px] font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:border-spark-purple/60 group"
            >
              <span>{lang === 'vi' ? 'HỢP TÁC' : lang === 'en' ? 'INQUIRE' : 'お問い合わせ'}</span>
              <ArrowUpRight
                size={11}
                className="text-spark-purple transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050507]/98 backdrop-blur-3xl pt-28 px-8 pb-12 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-[0.3em] text-spark-purple uppercase block pb-3 border-b border-white/[0.08]">
                SPARK EDITORIAL DIRECTORY
              </span>
              <div className="flex flex-col gap-4">
                {navs.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-baseline justify-between py-2 border-b border-white/[0.04] text-white/80 hover:text-white group"
                  >
                    <span className="text-xl font-light tracking-[0.16em] uppercase">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-spark-purple/60 group-hover:text-spark-purple">
                      // {item.code}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/[0.08] flex flex-col gap-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>HEADQUARTERS</span>
                <span className="text-white/70">DISTRICT 1, HO CHI MINH CITY</span>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-spark-purple text-white text-center text-[10px] font-mono tracking-[0.24em] uppercase font-medium"
              >
                {lang === 'vi' ? 'BẮT ĐẦU DỰ ÁN' : 'COMMISSION A PROJECT'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
