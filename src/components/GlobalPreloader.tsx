import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '@/lib/data';

interface GlobalPreloaderProps {
  onComplete?: () => void;
}

export const GlobalPreloader: React.FC<GlobalPreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, ultra-smooth timeline: total duration ~650ms for lightning-fast Speed Index
    const startTime = performance.now();
    const duration = 650; // ms

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) {
            onComplete();
          }
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="spark-global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white pointer-events-auto select-none"
        >
          {/* Center Brand Identity Container */}
          <div className="relative flex flex-col items-center justify-center max-w-sm px-6">
            
            {/* Logo Container with Traveling Purple Signal Line */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center mb-6 overflow-hidden py-3 px-6"
            >
              {/* Master High-Resolution Spark Entertainment Logo */}
              <img
                src={ASSETS.logo}
                alt="Spark Entertainment"
                width={2000}
                height={551}
                className="w-[190px] sm:w-[220px] h-auto object-contain relative z-10"
              />

              {/* Laser-Thin Purple Signal Line that travels across the logo */}
              <motion.div
                initial={{ left: '-40%', opacity: 0 }}
                animate={{
                  left: ['-40%', '140%'],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.45,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent z-20 pointer-events-none shadow-[0_0_12px_#7C3AED]"
              />

              {/* Brief subtle illumination pulse on the peak symbol */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.35, 0],
                  scale: [0.8, 1.25, 1.1],
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.8,
                  ease: 'easeOut',
                }}
                className="absolute top-[38%] left-[45%] w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED] blur-lg pointer-events-none z-0"
              />
            </motion.div>

            {/* Precision Horizontal Loading Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-[130px] sm:w-[150px] flex flex-col items-center mt-2"
            >
              {/* Track + Fill */}
              <div className="w-full h-[1.5px] bg-[#EAEAEA] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#7C3AED] rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Metadata Indicator */}
              <div className="mt-3.5 flex items-center justify-between w-full text-[9px] font-condensed tracking-[0.3em] uppercase text-[#888888] font-bold">
                <span>IGNITION</span>
                <span>{progress < 100 ? `0${Math.floor(progress / 10)}` : 'READY'}</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
