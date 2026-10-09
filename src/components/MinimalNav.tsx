import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ASSETS } from '@/lib/data';
import { useLanguage, Lang } from '@/lib/LanguageContext';
import { useBookingModal } from '@/lib/BookingContext';

export type { Lang };

interface MinimalNavProps {
  lang?: Lang;
  setLang?: (lang: Lang) => void;
}

export const MinimalNav: React.FC<MinimalNavProps> = () => {
  const { lang, setLang } = useLanguage();
  const { openBooking } = useBookingModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = lang === 'vi' ? [
    { label: 'TRANG CHỦ', href: isHomePage ? '#hero' : '/' },
    { label: 'GIỚI THIỆU', href: isHomePage ? '#intro' : '/#intro' },
    { label: 'HỆ SINH THÁI', href: isHomePage ? '#ecosystem' : '/#ecosystem' },
    { label: 'DỰ ÁN', href: isHomePage ? '#works' : '/#works' },
    { label: 'NGHỆ SĨ', href: isHomePage ? '#artists' : '/#artists' },
    { label: 'TIN TỨC', href: isHomePage ? '#journal' : '/#journal' },
    { label: 'LIÊN HỆ', href: isHomePage ? '#contact' : '/#contact' },
  ] : [
    { label: 'HOME', href: isHomePage ? '#hero' : '/' },
    { label: 'ABOUT', href: isHomePage ? '#intro' : '/#intro' },
    { label: 'ECOSYSTEM', href: isHomePage ? '#ecosystem' : '/#ecosystem' },
    { label: 'WORKS', href: isHomePage ? '#works' : '/#works' },
    { label: 'ARTISTS', href: isHomePage ? '#artists' : '/#artists' },
    { label: 'JOURNAL', href: isHomePage ? '#journal' : '/#journal' },
    { label: 'CONTACT', href: isHomePage ? '#contact' : '/#contact' },
  ];

  const bookingCtaText = lang === 'vi' ? 'ĐẶT LỊCH ↗' : 'BOOK A SESSION ↗';
  const collaborateText = lang === 'vi' ? 'HỢP TÁC' : 'COLLABORATE';
  const contactHref = isHomePage ? '#contact' : '/#contact';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808] py-3.5 md:py-4 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[#080808] py-4 md:py-5 border-b border-white/10'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Left Brand Identity: Official Spark Crest with original white lettering + purple crest */}
          <div className="flex items-center justify-start shrink-0">
            <Link
              to="/"
              className="flex items-center group pl-0 md:pl-1 shrink-0"
              aria-label="Spark Entertainment"
            >
              <img
                src={ASSETS.logoLight}
                alt="Spark Entertainment"
                width={2000}
                height={551}
                decoding="async"
                fetchPriority="high"
                className="w-[126px] min-[375px]:w-[135px] sm:w-[165px] md:w-[195px] lg:w-[220px] xl:w-[230px] h-auto object-contain object-left transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Center: Bilingual Navigation with crisp white typography and purple active/hover */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-condensed text-[12.5px] tracking-[0.28em] font-semibold text-white/80 hover:text-[#7C3AED] transition-colors duration-300 uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Language switch + Global Booking CTA + Collaboration link + Mobile Hamburger */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-5 shrink-0">
            <div className="flex items-center gap-0.5 font-condensed text-[12px] tracking-[0.2em] font-semibold">
              <button
                type="button"
                onClick={() => setLang('vi')}
                className={`min-w-[40px] min-h-[44px] flex items-center justify-center p-2 transition-colors duration-300 ${
                  lang === 'vi' ? 'text-white font-bold' : 'text-white/45 hover:text-white'
                }`}
                aria-label="Chuyển sang tiếng Việt"
              >
                VI
              </button>
              <span className="text-white/25 select-none" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`min-w-[40px] min-h-[44px] flex items-center justify-center p-2 transition-colors duration-300 ${
                  lang === 'en' ? 'text-white font-bold' : 'text-white/45 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Global Booking CTA: Dark/transparent bg with clean white border, white text, and Spark Purple hover */}
            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex items-center gap-1 font-condensed text-[10.5px] min-[375px]:text-[11.5px] sm:text-[12px] tracking-[0.18em] sm:tracking-[0.26em] text-white uppercase transition-all duration-300 py-1.5 px-3 sm:px-4 rounded-full border border-white/60 bg-transparent hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] hover:shadow-lg hover:shadow-[#7C3AED]/30 font-bold shrink-0"
            >
              <span>{bookingCtaText}</span>
            </button>

            <a
              href={contactHref}
              className="hidden xl:inline-flex items-center gap-1.5 font-condensed text-[11px] tracking-[0.26em] text-white/60 hover:text-[#7C3AED] uppercase transition-colors duration-300 py-1.5 px-2 font-semibold"
            >
              <span>{collaborateText}</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 text-[#7C3AED]">→</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-white hover:text-[#7C3AED] transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Minimal Mobile Menu on Dark Background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-28 lg:hidden"
          >
            <div className="flex flex-col space-y-7">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                  className="font-condensed text-3xl font-extrabold tracking-[-0.01em] text-white hover:text-[#7C3AED] transition-colors uppercase flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-white/40 font-mono tracking-widest">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="pt-10 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm tracking-[0.2em] font-condensed font-bold">
                <button
                  type="button"
                  onClick={() => setLang('vi')}
                  className={lang === 'vi' ? 'text-white font-extrabold' : 'text-white/50'}
                >
                  VI
                </button>
                <span className="text-white/20">/</span>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={lang === 'en' ? 'text-white font-extrabold' : 'text-white/50'}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="py-2.5 px-6 rounded-full border border-white text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-colors font-condensed text-xs tracking-[0.24em] uppercase font-bold"
              >
                {bookingCtaText}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
