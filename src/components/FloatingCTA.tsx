import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic2, GraduationCap, Video, Disc3, Handshake } from 'lucide-react';

type Lang = 'vi' | 'en' | 'jp';

interface FloatingCTAProps {
  lang: Lang;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

// Priority 5 exact items:
// BOOK STUDIO
// SPARK ACADEMY
// SPARK MEDIA
// SUBMIT DEMO
// PARTNERSHIP
const items = {
  vi: [
    { icon: Mic2,          label: 'BOOK STUDIO',     href: '#studio',  desc: 'Thu âm & Sản xuất' },
    { icon: GraduationCap, label: 'SPARK ACADEMY',   href: '#academy', desc: 'Đào tạo âm nhạc' },
    { icon: Video,         label: 'SPARK MEDIA',     href: '#media',   desc: 'MV & TVC điện ảnh' },
    { icon: Disc3,         label: 'SUBMIT DEMO',     href: '#label',   desc: 'Gửi bản demo' },
    { icon: Handshake,     label: 'PARTNERSHIP',     href: '#contact', desc: 'Hợp tác thương hiệu' },
  ],
  en: [
    { icon: Mic2,          label: 'BOOK STUDIO',     href: '#studio',  desc: 'Recording & Mixing' },
    { icon: GraduationCap, label: 'SPARK ACADEMY',   href: '#academy', desc: 'Artist Development' },
    { icon: Video,         label: 'SPARK MEDIA',     href: '#media',   desc: 'Cinema MV & TVC' },
    { icon: Disc3,         label: 'SUBMIT DEMO',     href: '#label',   desc: 'Label Audition' },
    { icon: Handshake,     label: 'PARTNERSHIP',     href: '#contact', desc: 'Brand Collaboration' },
  ],
  jp: [
    { icon: Mic2,          label: 'BOOK STUDIO',     href: '#studio',  desc: 'レコーディング' },
    { icon: GraduationCap, label: 'SPARK ACADEMY',   href: '#academy', desc: '音楽アカデミー' },
    { icon: Video,         label: 'SPARK MEDIA',     href: '#media',   desc: 'MV & 映像制作' },
    { icon: Disc3,         label: 'SUBMIT DEMO',     href: '#label',   desc: 'デモ提出' },
    { icon: Handshake,     label: 'PARTNERSHIP',     href: '#contact', desc: 'ブランド提携' },
  ],
} as const;

export function FloatingCTA({ lang }: FloatingCTAProps) {
  const [open, setOpen] = useState(false);
  const list = items[lang] || items.en;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex flex-col items-end gap-3 pointer-events-none">
      {/* Expanded quick menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EXPO }}
            className="flex flex-col gap-2 pointer-events-auto w-64 max-w-[85vw]"
          >
            {list.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: i * 0.035, duration: 0.28, ease: EXPO }}
                className="flex items-center justify-between p-3.5 rounded-2xl text-[10px] tracking-[0.24em] uppercase font-light text-white/90 hover:text-white transition-all duration-300 group"
                style={{
                  background: 'rgba(10,10,14,0.92)',
                  backdropFilter: 'blur(24px) saturate(1.6)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(139,92,255,0.14)',
                }}
                whileHover={{
                  boxShadow: '0 8px 36px rgba(0,0,0,0.7), 0 0 28px rgba(139,92,255,0.3)',
                  borderColor: 'rgba(139,92,255,0.45)',
                  x: -3,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-spark-purple group-hover:bg-spark-purple/20 transition-colors">
                    <item.icon size={13} />
                  </div>
                  <div className="text-left">
                    <span className="block font-medium">{item.label}</span>
                    <span className="text-[8px] tracking-[0.14em] text-white/40 normal-case font-light block">{item.desc}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating trigger button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-full text-[10px] tracking-[0.26em] uppercase font-light text-white transition-all duration-500 shadow-2xl"
        style={{
          background: open ? 'rgba(139,92,255,0.2)' : 'rgba(10,10,14,0.92)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          border: open ? '1px solid rgba(139,92,255,0.5)' : '1px solid rgba(255,255,255,0.12)',
          boxShadow: open
            ? '0 0 35px rgba(139,92,255,0.4), inset 0 1px 0 rgba(255,255,255,0.16)'
            : '0 10px 30px rgba(0,0,0,0.7), 0 0 22px rgba(139,92,255,0.22), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: '0 10px 35px rgba(0,0,0,0.7), 0 0 32px rgba(139,92,255,0.38), inset 0 1px 0 rgba(255,255,255,0.14)',
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.3, ease: EXPO }}
        aria-label="Open Spark quick action menu"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <X size={14} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="text-sm leading-none"
            >
              ✨
            </motion.span>
          )}
        </AnimatePresence>
        <span className="font-medium">
          {lang === 'vi' ? 'BẮT ĐẦU CÙNG SPARK' : lang === 'en' ? 'START WITH SPARK' : 'SPARKを始める'}
        </span>
      </motion.button>
    </div>
  );
}
