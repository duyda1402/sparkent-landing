import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useBookingModal } from '@/lib/BookingContext';

export const MobileStickyBookingBar: React.FC = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBookingModal();

  const bookingText = lang === 'vi' ? 'ĐẶT LỊCH' : 'BOOK A SESSION';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#08090C]/90 backdrop-blur-xl border-t border-white/[0.08] lg:hidden">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => openBooking()}
        className="w-full py-3.5 px-6 rounded-full bg-[#8B5CF6] hover:bg-[#7c48f2] text-[#F2F0EA] font-semibold text-xs tracking-[0.24em] uppercase flex items-center justify-center gap-2.5 shadow-xl shadow-[#8B5CF6]/25 transition-all duration-300"
      >
        <Calendar size={15} />
        <span>{bookingText}</span>
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>
    </div>
  );
};
