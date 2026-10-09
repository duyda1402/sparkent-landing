import { useEffect } from 'react';
import { MinimalNav } from '@/components/MinimalNav';
import { MinimalFooter } from '@/components/MinimalFooter';
import { BookingHubModal } from '@/components/BookingHubModal';
import { useLanguage } from '@/lib/LanguageContext';
import { useBookingModal, BookingServiceType } from '@/lib/BookingContext';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { ASSETS } from '@/lib/data';

export default function BookingPage() {
  const { lang } = useLanguage();
  const { openBooking } = useBookingModal();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = lang === 'vi'
      ? 'Đặt Lịch Trải Nghiệm & Buổi Học — Spark Entertainment'
      : 'Book a Session & Lessons — Spark Entertainment';
    window.scrollTo(0, 0);

    // Auto-open modal if query parameter specifies service
    const serviceParam = searchParams.get('service') as BookingServiceType;
    if (serviceParam && ['recording', 'piano', 'vocal', 'guitar'].includes(serviceParam)) {
      openBooking(serviceParam);
    }
  }, [lang, searchParams, openBooking]);

  const services = [
    {
      id: 'recording' as BookingServiceType,
      num: '01',
      titleVi: 'THU ÂM & SẢN XUẤT',
      titleEn: 'RECORDING & PRODUCTION',
      subVi: 'SPARK STUDIO · THU ÂM, SẢN XUẤT, MIX & MASTER',
      subEn: 'SPARK STUDIO · TRACKING, PRODUCTION, MIX & MASTER',
      descVi: 'Không gian chuẩn âm học quốc tế, Neve signal paths, micro Neumann M149 và hệ thống kiểm âm Genelec SAM.',
      descEn: 'Acoustic-treated live rooms, Neve signal paths, Neumann M149 microphones, and Genelec SAM monitoring.',
      image: ASSETS.studioMain,
      ctaVi: 'ĐẶT PHÒNG THU ↗',
      ctaEn: 'BOOK STUDIO ↗',
    },
    {
      id: 'piano' as BookingServiceType,
      num: '02',
      titleVi: 'HỌC PIANO',
      titleEn: 'PIANO LESSONS',
      subVi: 'SPARK ACADEMY · HỌC THỬ HOẶC ĐĂNG KÝ KHÓA HỌC',
      subEn: 'SPARK ACADEMY · TRIAL LESSON OR FORMAL ENROLLMENT',
      descVi: 'Đào tạo cảm thụ phím đàn, hòa thanh đương đại và kỹ thuật biểu diễn trên đàn Grand Piano tiêu chuẩn hòa nhạc.',
      descEn: 'Articulate touch, contemporary harmonic reflex, and performance dynamics on concert-grade grand pianos.',
      image: ASSETS.studioAcoustic,
      ctaVi: 'HỌC THỬ PIANO ↗',
      ctaEn: 'BOOK A PIANO TRIAL ↗',
    },
    {
      id: 'vocal' as BookingServiceType,
      num: '03',
      titleVi: 'HỌC THANH NHẠC & THỬ GIỌNG',
      titleEn: 'VOCAL LESSONS & AUDITION',
      subVi: 'THỬ GIỌNG NGHỆ SĨ HOẶC RÈN LUYỆN KỸ NGHỆ GIỌNG HÁT',
      subEn: 'ARTIST AUDITION OR VOCAL COACHING',
      descVi: 'Kiểm tra chất giọng trực tiếp trong buồng thu âm, làm chủ hơi thở và định hình bản sắc giọng độc bản.',
      descEn: 'Studio booth assessment, diaphragmatic breath support, vocal range expansion, and signature timbre development.',
      image: ASSETS.artistMinh,
      ctaVi: 'ĐẶT LỊCH THỬ GIỌNG ↗',
      ctaEn: 'BOOK VOICE AUDITION ↗',
    },
    {
      id: 'guitar' as BookingServiceType,
      num: '04',
      titleVi: 'HỌC GUITAR',
      titleEn: 'GUITAR LESSONS',
      subVi: 'SPARK ACADEMY · ACOUSTIC, ELECTRIC, CLASSICAL',
      subEn: 'SPARK ACADEMY · ACOUSTIC, ELECTRIC, CLASSICAL',
      descVi: 'Phương pháp fingerstyle, đệm hát đương đại, solo ngẫu hứng và kỹ thuật thu âm guitar chuẩn studio thương mại.',
      descEn: 'Fingerstyle arrangement, contemporary rhythm backing, expressive soloing, and live tracking workflows.',
      image: ASSETS.artistLyra,
      ctaVi: 'HỌC THỬ GUITAR ↗',
      ctaEn: 'GUITAR TRIAL LESSON ↗',
    },
    {
      id: 'producer' as BookingServiceType,
      num: '05',
      titleVi: 'HỌC MUSIC PRODUCER',
      titleEn: 'MUSIC PRODUCER PROGRAM',
      subVi: 'SPARK ACADEMY · MUSIC PRODUCER',
      subEn: 'SPARK ACADEMY · MUSIC PRODUCER',
      descVi: 'Học cách biến ý tưởng thành một sản phẩm âm nhạc hoàn chỉnh — từ sáng tạo, arrangement, sound selection đến production.',
      descEn: 'Learn how to turn an idea into a complete music production — from concept and arrangement to sound selection and production.',
      image: ASSETS.studioMain,
      ctaVi: 'BẮT ĐẦU ĐẶT LỊCH ↗',
      ctaEn: 'BOOK A SESSION ↗',
    },
    {
      id: 'mixmaster' as BookingServiceType,
      num: '06',
      titleVi: 'HỌC MIX & MASTER',
      titleEn: 'MIX & MASTER PROGRAM',
      subVi: 'SPARK ACADEMY · MIX & MASTER',
      subEn: 'SPARK ACADEMY · MIX & MASTER',
      descVi: 'Làm chủ quá trình hoàn thiện âm thanh — từ mixing, xử lý vocal, dynamics và spatial depth đến mastering.',
      descEn: 'Master the final stages of music production — from balance, processing, space and dynamics to a release-ready master.',
      image: ASSETS.studioMastering,
      ctaVi: 'BẮT ĐẦU ĐẶT LỊCH ↗',
      ctaEn: 'BOOK A SESSION ↗',
    },
  ];

  return (
    <div className="bg-white text-[#0A0A0A] min-h-screen relative selection:bg-[#7C3AED]/20 selection:text-[#0A0A0A] overflow-x-hidden">
      <MinimalNav />

      {/* Hero Section */}
      <section className="relative pt-36 md:pt-48 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 max-w-[1720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <span className="font-condensed text-xs tracking-[0.34em] uppercase text-[#7C3AED] font-bold block mb-6">
            {lang === 'vi' ? 'HỆ THỐNG ĐẶT LỊCH TRỰC TUYẾN' : 'CONCIERGE BOOKING SYSTEM'}
          </span>
          <h1 className="font-condensed font-extrabold text-[clamp(3rem,8.5vw,8.5rem)] tracking-[-0.02em] uppercase text-[#0A0A0A] leading-[0.98]">
            {lang === 'vi' ? (
              <>
                ĐẶT LỊCH CÙNG<br />
                <span className="font-extrabold italic text-[#7C3AED] tracking-tight">SPARK ENTERTAINMENT.</span>
              </>
            ) : (
              <>
                BOOK A SESSION WITH<br />
                <span className="font-extrabold italic text-[#7C3AED] tracking-tight">SPARK ENTERTAINMENT.</span>
              </>
            )}
          </h1>
          <p className="mt-8 font-condensed text-xs md:text-sm tracking-[0.24em] uppercase text-[#666666] font-semibold max-w-2xl leading-relaxed">
            {lang === 'vi'
              ? 'Chọn trải nghiệm bạn muốn bắt đầu cùng Spark. Quy trình đặt lịch trực tiếp với thời gian thực và xác nhận nhanh chóng.'
              : 'Choose how you want to start with Spark. Direct scheduling workflow with real-time availability and immediate verification.'}
          </p>
        </motion.div>

        {/* 6 Pillars Grid: 2x3 on desktop, 1-col on mobile */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.9 }}
              onClick={() => openBooking(srv.id)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white border border-[#E5E5E5] hover:border-[#7C3AED] transition-all duration-300 p-6 md:p-8 flex flex-col justify-between min-h-[340px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(124,58,237,0.12)]"
            >
              <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <img
                  src={srv.image}
                  alt=""
                  className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono tracking-widest text-[#7C3AED] font-bold">
                    {srv.num}
                  </span>
                  <span className="font-condensed text-[11px] tracking-[0.24em] uppercase text-[#8E8E93] font-semibold">
                    ONLINE CALENDAR
                  </span>
                </div>

                <div>
                  <h2 className="font-condensed text-3xl md:text-5xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors leading-tight">
                    {lang === 'vi' ? srv.titleVi : srv.titleEn}
                  </h2>
                  <p className="mt-2 font-condensed text-xs md:text-sm tracking-[0.26em] uppercase text-[#7C3AED] font-bold">
                    {lang === 'vi' ? srv.subVi : srv.subEn}
                  </p>
                </div>

                <p className="text-sm text-[#666666] font-normal leading-relaxed max-w-lg">
                  {lang === 'vi' ? srv.descVi : srv.descEn}
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-[#E5E5E5] flex items-center justify-between">
                <span className="font-condensed text-xs tracking-[0.28em] uppercase text-[#0A0A0A] font-bold group-hover:text-[#7C3AED] transition-colors">
                  {lang === 'vi' ? srv.ctaVi : srv.ctaEn}
                </span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 text-[#7C3AED]">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Guarantee Footer */}
        <div className="mt-20 pt-10 border-t border-[#E5E5E5] grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-normal text-[#666666]">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-[#7C3AED] mt-0.5 shrink-0" />
            <div>
              <span className="block text-[#0A0A0A] font-bold uppercase tracking-wider mb-1">
                {lang === 'vi' ? 'ĐỒNG BỘ THỜI GIAN THỰC' : 'REAL-TIME SYNCHRONIZATION'}
              </span>
              <span>
                {lang === 'vi'
                  ? 'Khung giờ hiển thị trực tiếp theo tình trạng phòng thu và lịch giảng viên thực tế.'
                  : 'Time slots accurately mirror active live room and senior mentor availability.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck size={16} className="text-[#7C3AED] mt-0.5 shrink-0" />
            <div>
              <span className="block text-[#0A0A0A] font-bold uppercase tracking-wider mb-1">
                {lang === 'vi' ? 'BẢO MẬT & XÁC THỰC' : 'AUTHENTICATED VERIFICATION'}
              </span>
              <span>
                {lang === 'vi'
                  ? 'Mã đặt lịch độc bản kèm hợp đồng dịch vụ và thông tin chi tiết qua email.'
                  : 'Unique reference token accompanied by official project briefing and email verification.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles size={16} className="text-[#7C3AED] mt-0.5 shrink-0" />
            <div>
              <span className="block text-[#0A0A0A] font-bold uppercase tracking-wider mb-1">
                {lang === 'vi' ? 'TIÊU CHUẨN QUỐC TẾ' : 'CONTEMPORARY STANDARDS'}
              </span>
              <span>
                {lang === 'vi'
                  ? 'Hạ tầng phòng thu Neve, Genelec SAM và đội ngũ sản xuất dày dặn kinh nghiệm.'
                  : 'Neve outboard signal paths, Genelec acoustic tuning, and dedicated sound engineers.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <MinimalFooter />
      <BookingHubModal />
    </div>
  );
}
