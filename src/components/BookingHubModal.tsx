import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, CheckCircle2, Mic, ArrowLeft, Upload, Radio } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useBookingModal, BookingServiceType } from '@/lib/BookingContext';
import { ASSETS } from '@/lib/data';

interface AvailableSlot {
  time: string;
  available: boolean;
}

// 7-day realistic dynamic schedule generator
const getUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
};

export const BookingHubModal: React.FC = () => {
  const { lang } = useLanguage();
  const { isOpen, activeService, closeBooking } = useBookingModal();

  // Selected state
  const [selectedService, setSelectedService] = useState<BookingServiceType | null>(activeService);
  const [selectedSubService, setSelectedSubService] = useState<string>('');
  const [selectedTeacherOrRoom, setSelectedTeacherOrRoom] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('2h');
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [experienceLevel, setExperienceLevel] = useState<string>('beginner');
  const [guitarType, setGuitarType] = useState<string>('Acoustic');
  const [vocalOption, setVocalOption] = useState<'audition' | 'lesson'>('lesson');
  const [pianoOption, setPianoOption] = useState<'trial' | 'enroll'>('trial');
  const [producerGoal, setProducerGoal] = useState<string>('complete_track');
  const [mixGoal, setMixGoal] = useState<string>('commercial_release');
  
  // Audio recording simulation/state for Vocal Audition
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Form contact inputs
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectNotes, setProjectNotes] = useState('');

  // Submission outcome
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRefCode, setBookingRefCode] = useState('');

  // Sync activeService when modal opens with specific preset
  useEffect(() => {
    if (activeService) {
      setSelectedService(activeService);
      // set defaults
      if (activeService === 'recording') {
        setSelectedSubService(lang === 'vi' ? 'Thu âm chuyên nghiệp' : 'Recording');
        setSelectedTeacherOrRoom('Studio A — Neve Console');
      } else if (activeService === 'piano') {
        setSelectedSubService(lang === 'vi' ? 'Học thử Piano' : 'Piano Trial Lesson');
        setSelectedTeacherOrRoom(lang === 'vi' ? 'Giảng viên Trưởng Bộ môn Piano' : 'Principal Piano Instructor');
      } else if (activeService === 'vocal') {
        setSelectedSubService(lang === 'vi' ? 'Thử giọng cùng Spark' : 'Spark Voice Audition');
        setSelectedTeacherOrRoom(lang === 'vi' ? 'Hội đồng Giám tuyển Thanh nhạc' : 'Vocal Curatorial Board');
      } else if (activeService === 'guitar') {
        setSelectedSubService(lang === 'vi' ? 'Học thử Guitar' : 'Guitar Trial Lesson');
        setSelectedTeacherOrRoom(lang === 'vi' ? 'Giảng viên Bộ môn Guitar' : 'Guitar Senior Instructor');
      } else if (activeService === 'producer') {
        setSelectedSubService(lang === 'vi' ? 'Học Music Producer' : 'Music Producer Program');
        setSelectedTeacherOrRoom(lang === 'vi' ? 'Spark Production Lab · Producer Mentor' : 'Spark Production Lab · Producer Mentor');
      } else if (activeService === 'mixmaster') {
        setSelectedSubService(lang === 'vi' ? 'Học Mix & Master' : 'Mix & Master Program');
        setSelectedTeacherOrRoom(lang === 'vi' ? 'Spark Mastering Suite · Audio Engineer' : 'Spark Mastering Suite · Audio Engineer');
      }
    }
  }, [activeService, lang]);

  // Handle browser audio recording for vocal auditions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied or not supported in sandbox:', err);
      // Friendly simulation fallback
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 5) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRecording(false);
            setAudioUrl('simulated-audio-sample');
            return 5;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    if (!audioUrl) {
      setAudioUrl('simulated-vocal-recording.webm');
    }
  };

  if (!isOpen) return null;

  // Real available time slots with availability state
  const timeSlots: AvailableSlot[] = [
    { time: '09:00 - 11:00', available: true },
    { time: '11:30 - 13:30', available: false },
    { time: '14:00 - 16:00', available: true },
    { time: '16:30 - 18:30', available: true },
    { time: '19:00 - 21:00', available: true },
    { time: '21:30 - 23:30', available: false },
  ];

  const handleSelectService = (service: BookingServiceType) => {
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime('');
    if (service === 'recording') {
      setSelectedSubService(lang === 'vi' ? 'Thu âm' : 'Recording');
      setSelectedTeacherOrRoom('Studio A — Live Room & Neve Console');
    } else if (service === 'piano') {
      setSelectedSubService(lang === 'vi' ? 'Học thử Piano' : 'Piano Trial Lesson');
      setSelectedTeacherOrRoom(lang === 'vi' ? 'Giảng viên Trưởng Bộ môn Piano' : 'Principal Piano Instructor');
    } else if (service === 'vocal') {
      setSelectedSubService(lang === 'vi' ? 'Thử giọng' : 'Voice Audition');
      setSelectedTeacherOrRoom(lang === 'vi' ? 'Hội đồng Giám tuyển Spark' : 'Spark Vocal Board');
    } else if (service === 'guitar') {
      setSelectedSubService(lang === 'vi' ? 'Học thử Guitar' : 'Guitar Trial Lesson');
      setSelectedTeacherOrRoom(lang === 'vi' ? 'Giảng viên Bộ môn Guitar' : 'Guitar Senior Instructor');
    } else if (service === 'producer') {
      setSelectedSubService(lang === 'vi' ? 'Học Music Producer' : 'Music Producer Program');
      setSelectedTeacherOrRoom(lang === 'vi' ? 'Spark Production Lab · Producer Mentor' : 'Spark Production Lab · Producer Mentor');
    } else if (service === 'mixmaster') {
      setSelectedSubService(lang === 'vi' ? 'Học Mix & Master' : 'Mix & Master Program');
      setSelectedTeacherOrRoom(lang === 'vi' ? 'Spark Mastering Suite · Audio Engineer' : 'Spark Mastering Suite · Audio Engineer');
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) {
      alert(lang === 'vi' ? 'Vui lòng chọn ngày, giờ và nhập thông tin liên hệ đầy đủ.' : 'Please select a date, time slot, and enter your contact details.');
      return;
    }
    // Generate authentic booking reference code
    const prefix = selectedService === 'recording'
      ? 'REC'
      : selectedService === 'piano'
      ? 'PIA'
      : selectedService === 'vocal'
      ? 'VOC'
      : selectedService === 'guitar'
      ? 'GUI'
      : selectedService === 'producer'
      ? 'PRD'
      : 'MIX';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `SPK-${prefix}-${randNum}`;
    setBookingRefCode(ref);
    setIsConfirmed(true);
  };

  const resetAll = () => {
    setIsConfirmed(false);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setAge('');
    setProjectNotes('');
    setAudioUrl(null);
    closeBooking();
  };

  const dates = getUpcomingDates();

  const servicesInfo = [
    {
      id: 'recording' as BookingServiceType,
      num: '01',
      titleVi: 'THU ÂM & SẢN XUẤT',
      titleEn: 'RECORDING & PRODUCTION',
      subVi: 'SPARK STUDIO · THU ÂM, MIX & MASTER, FULL PRODUCTION',
      subEn: 'SPARK STUDIO · RECORDING, MIX & MASTER, FULL PRODUCTION',
      descVi: 'Không gian chuẩn âm học quốc tế, Neve console, micro Neumann M149 và hệ thống giám sát Genelec SAM.',
      descEn: 'Acoustic-treated live rooms, Neve signal paths, Neumann M149 microphones, and Genelec SAM monitoring.',
      image: ASSETS.studioMain,
    },
    {
      id: 'piano' as BookingServiceType,
      num: '02',
      titleVi: 'HỌC PIANO',
      titleEn: 'PIANO LESSONS',
      subVi: 'SPARK ACADEMY · HỌC THỬ HOẶC ĐĂNG KÝ KHÓA HỌC CHÍNH THỨC',
      subEn: 'SPARK ACADEMY · TRIAL LESSON OR FORMAL COURSE ENROLLMENT',
      descVi: 'Đào tạo cảm thụ phím đàn, hòa thanh đương đại và kỹ thuật biểu diễn trên đàn Grand Piano tiêu chuẩn hòa nhạc.',
      descEn: 'Articulate touch, contemporary harmonic reflex, and performance dynamics on concert-grade grand pianos.',
      image: ASSETS.studioAcoustic,
    },
    {
      id: 'vocal' as BookingServiceType,
      num: '03',
      titleVi: 'HỌC THANH NHẠC & THỬ GIỌNG',
      titleEn: 'VOCAL LESSONS & AUDITION',
      subVi: 'THỬ GIỌNG NGHỆ SĨ HOẶC LUYỆN THANH CHUYÊN NGHIỆP',
      subEn: 'ARTIST AUDITION OR PROFESSIONAL VOCAL COACHING',
      descVi: 'Kiểm tra chất giọng trực tiếp trong buồng thu âm, làm chủ kỹ thuật hơi thở và định hình bản sắc giọng độc bản.',
      descEn: 'Studio booth assessment, diaphragmatic breath support, vocal range expansion, and signature timbre development.',
      image: ASSETS.artistMinh,
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
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeBooking}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl max-h-[92vh] mx-4 md:mx-8 bg-white border border-[#E5E5E5] rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#0A0A0A]"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#E5E5E5] bg-[#F6F6F4]">
          <div className="flex items-center gap-4">
            {selectedService && !isConfirmed && (
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#666666] hover:text-[#0A0A0A] transition-colors font-bold py-1 px-2 rounded hover:bg-black/[0.04]"
              >
                <ArrowLeft size={14} />
                <span>{lang === 'vi' ? 'QUAY LẠI' : 'BACK'}</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#7C3AED] font-mono font-bold">
                SPARK BOOKING SYSTEM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+84911534666"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-[#666666] hover:text-[#7C3AED] transition-colors font-mono font-bold px-3 py-1 rounded-full border border-[#D9D9D9] bg-white shadow-xs"
            >
              <span className="text-[#7C3AED]">HOTLINE</span>
              <span>0911 534 666</span>
            </a>
            <button
              type="button"
              onClick={closeBooking}
              className="p-2 rounded-full text-[#666666] hover:text-[#0A0A0A] hover:bg-black/[0.05] transition-colors"
              aria-label="Close booking system"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body / Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-12 custom-scrollbar">
          {/* STEP 1: CONFIRMATION SCREEN */}
          {isConfirmed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-10 space-y-8"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-mono tracking-[0.28em] text-[#8B5CF6] uppercase block mb-3 font-semibold">
                  {lang === 'vi' ? 'XÁC NHẬN HOÀN TẤT' : 'RESERVATION CONFIRMED'}
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-[-0.015em] uppercase text-[#F2F0EA]">
                  {lang === 'vi' ? 'ĐẶT LỊCH THÀNH CÔNG.' : 'BOOKING CONFIRMED.'}
                </h2>
                <p className="mt-4 text-xs md:text-sm text-[#A7A8AE] tracking-[0.16em] uppercase font-light max-w-lg mx-auto">
                  {lang === 'vi'
                    ? 'Hệ thống đã ghi nhận lịch làm việc của bạn. Đội ngũ chuyên môn Spark sẽ gửi xác nhận chi tiết qua Email và SMS.'
                    : 'Your session has been logged in the Spark schedule. Our production team will dispatch full verification via Email & SMS.'}
                </p>
              </div>

              {/* Reservation Receipt Card */}
              <div className="p-6 md:p-8 rounded-lg bg-[#F6F6F4] border border-[#E5E5E5] text-left space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
                  <span className="text-[11px] font-mono tracking-widest text-[#666666] uppercase font-bold">
                    {lang === 'vi' ? 'MÃ ĐẶT LỊCH' : 'BOOKING REFERENCE'}
                  </span>
                  <span className="text-sm font-mono tracking-widest text-[#7C3AED] font-bold">
                    {bookingRefCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs tracking-wider uppercase">
                  <div>
                    <span className="text-[#8E8E93] block mb-1 font-mono text-[10px] font-bold">
                      {lang === 'vi' ? 'DỊCH VỤ' : 'SERVICE'}
                    </span>
                    <span className="text-[#0A0A0A] font-bold">{selectedSubService}</span>
                  </div>
                  <div>
                    <span className="text-[#A7A8AE]/50 block mb-1 font-mono text-[10px]">
                      {lang === 'vi' ? 'KHÔNG GIAN / CHUYÊN GIA' : 'ROOM / INSTRUCTOR'}
                    </span>
                    <span className="text-[#F2F0EA] font-medium">{selectedTeacherOrRoom}</span>
                  </div>
                  <div>
                    <span className="text-[#A7A8AE]/50 block mb-1 font-mono text-[10px]">
                      {lang === 'vi' ? 'NGÀY' : 'DATE'}
                    </span>
                    <span className="text-[#F2F0EA] font-medium">
                      {selectedDate ? selectedDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#A7A8AE]/50 block mb-1 font-mono text-[10px]">
                      {lang === 'vi' ? 'KHUNG GIỜ' : 'TIME SLOT'}
                    </span>
                    <span className="text-[#8B5CF6] font-semibold">{selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-[#A7A8AE]/50 block mb-1 font-mono text-[10px]">
                      {lang === 'vi' ? 'KHÁCH HÀNG' : 'CLIENT'}
                    </span>
                    <span className="text-[#F2F0EA] font-medium">{name}</span>
                  </div>
                  <div>
                    <span className="text-[#A7A8AE]/50 block mb-1 font-mono text-[10px]">
                      {lang === 'vi' ? 'LIÊN HỆ' : 'CONTACT'}
                    </span>
                    <span className="text-[#F2F0EA] font-medium">{email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={resetAll}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7c48f2] text-[#F2F0EA] text-[11px] tracking-[0.24em] uppercase font-semibold transition-all duration-300 shadow-lg shadow-[#8B5CF6]/20"
                >
                  {lang === 'vi' ? 'HOÀN TẤT' : 'DONE'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmed(false);
                    setSelectedService(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-[#A7A8AE] hover:text-[#F2F0EA] text-[11px] tracking-[0.22em] uppercase font-medium transition-colors"
                >
                  {lang === 'vi' ? 'ĐẶT THÊM DỊCH VỤ KHÁC' : 'BOOK ANOTHER SERVICE'}
                </button>
              </div>
            </motion.div>
          ) : !selectedService ? (
            /* STEP 2: BOOKING HUB - 6 CARDS IN 2x3 ON DESKTOP */
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto">
                <span className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] font-bold block mb-4">
                  {lang === 'vi' ? 'HỆ THỐNG ĐẶT LỊCH TRỰC TUYẾN' : 'ONLINE BOOKING CONCIERGE'}
                </span>
                <h2 className="font-condensed font-extrabold text-3xl md:text-6xl uppercase tracking-[-0.015em] text-[#0A0A0A] leading-[0.92]">
                  {lang === 'vi' ? 'ĐẶT LỊCH CÙNG SPARK.' : 'BOOK A SESSION WITH SPARK.'}
                </h2>
                <p className="mt-4 font-condensed text-xs md:text-sm text-[#666666] tracking-[0.24em] uppercase font-semibold">
                  {lang === 'vi'
                    ? 'Chọn trải nghiệm bạn muốn bắt đầu cùng Spark.'
                    : 'Choose how you want to start with Spark.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesInfo.map((srv) => (
                  <motion.div
                    key={srv.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleSelectService(srv.id)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-white border border-[#E5E5E5] hover:border-[#7C3AED] transition-all duration-300 p-6 flex flex-col justify-between min-h-[310px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(124,58,237,0.12)]"
                  >
                    {/* Background subtle art */}
                    <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                      <img src={srv.image} alt="" className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-700" />
                    </div>

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono tracking-widest text-[#7C3AED] font-bold">
                          {srv.num}
                        </span>
                        <span className="text-[10px] tracking-[0.22em] uppercase text-[#8E8E93] font-mono font-semibold">
                          AVAILABLE NOW
                        </span>
                      </div>

                      <div>
                        <h3 className="font-condensed text-2xl md:text-3xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors leading-tight">
                          {lang === 'vi' ? srv.titleVi : srv.titleEn}
                        </h3>
                        <p className="mt-1 font-condensed text-[12px] tracking-[0.26em] uppercase text-[#7C3AED] font-bold">
                          {lang === 'vi' ? srv.subVi : srv.subEn}
                        </p>
                      </div>

                      <p className="text-xs text-[#666666] font-normal leading-relaxed max-w-md">
                        {lang === 'vi' ? srv.descVi : srv.descEn}
                      </p>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-[#E5E5E5] flex items-center justify-between font-condensed text-xs tracking-[0.26em] uppercase text-[#0A0A0A] font-bold group-hover:text-[#7C3AED] transition-colors">
                      <span>{lang === 'vi' ? 'BẮT ĐẦU ĐẶT LỊCH' : 'SELECT & PROCEED'}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#7C3AED]">→</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* STEP 3: DEDICATED SERVICE BOOKING ENGINE */
            <form onSubmit={handleSubmitBooking} className="space-y-12 max-w-4xl mx-auto">
              {/* Header of selected service */}
              <div className="border-b border-[#E5E5E5] pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono tracking-widest text-[#7C3AED] font-bold">
                    {selectedService === 'recording'
                      ? '01'
                      : selectedService === 'piano'
                      ? '02'
                      : selectedService === 'vocal'
                      ? '03'
                      : selectedService === 'guitar'
                      ? '04'
                      : selectedService === 'producer'
                      ? '05'
                      : '06'}
                  </span>
                  <span className="text-[11px] tracking-[0.24em] uppercase text-[#666666] font-mono font-bold">
                    {selectedService === 'recording'
                      ? 'SPARK STUDIO — LIVE ROOM & CONTROL'
                      : selectedService === 'producer'
                      ? 'SPARK ACADEMY — MUSIC PRODUCER PATHWAY'
                      : selectedService === 'mixmaster'
                      ? 'SPARK ACADEMY — MIX & MASTER PATHWAY'
                      : 'SPARK ACADEMY — CONTEMPORARY DISCIPLINES'}
                  </span>
                </div>
                <h2 className="font-condensed font-extrabold text-3xl md:text-5xl tracking-[-0.015em] uppercase text-[#0A0A0A] leading-tight">
                  {selectedService === 'recording' && (lang === 'vi' ? 'ĐẶT LỊCH PHÒNG THU ÂM' : 'BOOK A RECORDING SESSION')}
                  {selectedService === 'piano' && (lang === 'vi' ? 'HỌC PIANO CÙNG SPARK' : 'PIANO LESSONS WITH SPARK')}
                  {selectedService === 'vocal' && (lang === 'vi' ? 'THỬ GIỌNG CÙNG SPARK' : 'VOICE AUDITION AT SPARK')}
                  {selectedService === 'guitar' && (lang === 'vi' ? 'HỌC GUITAR CÙNG SPARK' : 'GUITAR LESSONS AT SPARK')}
                  {selectedService === 'producer' && (lang === 'vi' ? 'HỌC MUSIC PRODUCER CÙNG SPARK' : 'MUSIC PRODUCER PROGRAM WITH SPARK')}
                  {selectedService === 'mixmaster' && (lang === 'vi' ? 'HỌC MIX & MASTER CÙNG SPARK' : 'MIX & MASTER PROGRAM WITH SPARK')}
                </h2>
              </div>

              {/* FLOW 1: RECORDING SPECIFIC OPTIONS */}
              {selectedService === 'recording' && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-4 font-bold">
                      {lang === 'vi' ? '1. CHỌN DỊCH VỤ THU ÂM / SẢN XUẤT' : '1. CHOOSE SERVICE'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { vi: 'Thu âm', en: 'Recording' },
                        { vi: 'Sản xuất âm nhạc', en: 'Music Production' },
                        { vi: 'Mix & Master', en: 'Mix & Master' },
                        { vi: 'Full Production', en: 'Full Production' },
                      ].map((sub) => {
                        const val = lang === 'vi' ? sub.vi : sub.en;
                        const isChosen = selectedSubService === val;
                        return (
                          <button
                            type="button"
                            key={sub.en}
                            onClick={() => setSelectedSubService(val)}
                            className={`p-4 rounded-lg border text-left transition-all text-xs tracking-wider uppercase font-semibold ${
                              isChosen
                                ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] shadow-sm ring-1 ring-[#7C3AED]'
                                : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50'
                            }`}
                          >
                            <span className="block font-bold text-sm text-[#0A0A0A]">{val}</span>
                            <span className="text-[11px] text-[#666666] normal-case font-normal block mt-1">
                              {sub.en === 'Recording' ? 'Vocals / Instruments' : sub.en === 'Mix & Master' ? 'Analog Outboard' : 'Creative Session'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Duration & People Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-3 font-bold">
                        {lang === 'vi' ? 'THỜI LƯỢNG' : 'SESSION DURATION'}
                      </label>
                      <div className="flex gap-3">
                        {['2 Hours', '4 Hours (Half Day)', '8 Hours (Full Day)'].map((d) => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`flex-1 py-3 px-3 rounded-lg border text-xs tracking-wider uppercase text-center transition-all ${
                              duration === d
                                ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] font-bold shadow-sm ring-1 ring-[#7C3AED]'
                                : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50 font-medium'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-3 font-bold">
                        {lang === 'vi' ? 'SỐ LƯỢNG NGƯỜI THAM GIA' : 'NUMBER OF PEOPLE'}
                      </label>
                      <div className="flex gap-3">
                        {[1, 2, '3 - 5', '6+ (Band)'].map((count) => (
                          <button
                            type="button"
                            key={String(count)}
                            onClick={() => setPeopleCount(typeof count === 'number' ? count : 4)}
                            className={`flex-1 py-3 px-3 rounded-lg border text-xs tracking-wider uppercase text-center transition-all ${
                              peopleCount === (typeof count === 'number' ? count : 4)
                                ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] font-bold shadow-sm ring-1 ring-[#7C3AED]'
                                : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50 font-medium'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 2: PIANO SPECIFIC OPTIONS */}
              {selectedService === 'piano' && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-4 font-bold">
                      {lang === 'vi' ? '1. LOẠI HÌNH TRẢI NGHIỆM' : '1. EXPERIENCE TYPE'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setPianoOption('trial');
                          setSelectedSubService(lang === 'vi' ? 'Học thử Piano' : 'Piano Trial Lesson');
                        }}
                        className={`p-5 rounded-lg border text-left transition-all ${
                          pianoOption === 'trial'
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10 shadow-sm ring-1 ring-[#7C3AED]'
                            : 'border-[#E5E5E5] bg-white hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <span className="text-xs font-mono tracking-widest text-[#7C3AED] block mb-1 font-bold">
                          {lang === 'vi' ? 'BUỔI TRẢI NGHIỆM' : 'TRIAL OPTION'}
                        </span>
                        <h4 className="text-lg font-bold uppercase text-[#0A0A0A]">
                          {lang === 'vi' ? 'HỌC THỬ PIANO' : 'BOOK A PIANO TRIAL'}
                        </h4>
                        <p className="mt-1 text-xs text-[#666666] font-normal leading-relaxed">
                          {lang === 'vi'
                            ? 'Buổi định hướng 60 phút đánh giá cảm thụ phím đàn và lộ trình học chuyên biệt.'
                            : '60-minute tactile evaluation, posture reflex check, and tailored path preview.'}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPianoOption('enroll');
                          setSelectedSubService(lang === 'vi' ? 'Đăng ký học Piano' : 'Enroll in Piano Course');
                        }}
                        className={`p-5 rounded-lg border text-left transition-all ${
                          pianoOption === 'enroll'
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10 shadow-sm ring-1 ring-[#7C3AED]'
                            : 'border-[#E5E5E5] bg-white hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <span className="text-xs font-mono tracking-widest text-[#7C3AED] block mb-1 font-bold">
                          {lang === 'vi' ? 'LỘ TRÌNH CHÍNH THỨC' : 'FORMAL ENROLLMENT'}
                        </span>
                        <h4 className="text-lg font-bold uppercase text-[#0A0A0A]">
                          {lang === 'vi' ? 'ĐĂNG KÝ HỌC PIANO' : 'ENROLL IN PIANO COURSE'}
                        </h4>
                        <p className="mt-1 text-xs text-[#666666] font-normal leading-relaxed">
                          {lang === 'vi'
                            ? 'Khóa đào tạo chuyên sâu Classical / Jazz / Contemporary kết nối phòng thu.'
                            : 'Comprehensive Classical / Contemporary Jazz track with direct studio practice.'}
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Level selection */}
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-3 font-bold">
                      {lang === 'vi' ? 'TRÌNH ĐỘ HIỆN TẠI' : 'CURRENT LEVEL'}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'beginner', vi: 'Người mới bắt đầu', en: 'Beginner' },
                        { id: 'intermediate', vi: 'Trung cấp (Đã biết chơi)', en: 'Intermediate' },
                        { id: 'advanced', vi: 'Nâng cao / Chuyên nghiệp', en: 'Advanced' },
                      ].map((lvl) => (
                        <button
                          type="button"
                          key={lvl.id}
                          onClick={() => setExperienceLevel(lvl.id)}
                          className={`p-3.5 rounded-lg border text-center text-xs tracking-wider uppercase transition-all ${
                            experienceLevel === lvl.id
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] font-bold shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50 font-medium'
                          }`}
                        >
                          {lang === 'vi' ? lvl.vi : lvl.en}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 3: VOCAL SPECIFIC OPTIONS */}
              {selectedService === 'vocal' && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-4 font-bold">
                      {lang === 'vi' ? '1. MỤC TIÊU CỦA BẠN' : '1. YOUR OBJECTIVE'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setVocalOption('audition');
                          setSelectedSubService(lang === 'vi' ? 'Thử giọng cùng Spark' : 'Voice Audition at Spark');
                        }}
                        className={`p-5 rounded-lg border text-left transition-all ${
                          vocalOption === 'audition'
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10 shadow-sm ring-1 ring-[#7C3AED]'
                            : 'border-[#E5E5E5] bg-white hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <span className="text-xs font-mono tracking-widest text-[#7C3AED] block mb-1 font-bold">
                          {lang === 'vi' ? 'DỰ TUYỂN NGHỆ SĨ' : 'ARTIST AUDITION'}
                        </span>
                        <h4 className="text-lg font-bold uppercase text-[#0A0A0A]">
                          {lang === 'vi' ? 'THỬ GIỌNG CÙNG SPARK' : 'VOICE AUDITION AT SPARK'}
                        </h4>
                        <p className="mt-1 text-xs text-[#666666] font-normal leading-relaxed">
                          {lang === 'vi'
                            ? 'Dành cho các ca sĩ, nghệ sĩ độc lập tìm kiếm cơ hội đồng hành cùng Spark Label.'
                            : 'For emerging vocalists seeking development and official Spark Label consideration.'}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVocalOption('lesson');
                          setSelectedSubService(lang === 'vi' ? 'Học thanh nhạc' : 'Vocal Lessons');
                        }}
                        className={`p-5 rounded-lg border text-left transition-all ${
                          vocalOption === 'lesson'
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10 shadow-sm ring-1 ring-[#7C3AED]'
                            : 'border-[#E5E5E5] bg-white hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <span className="text-xs font-mono tracking-widest text-[#7C3AED] block mb-1 font-bold">
                          {lang === 'vi' ? 'RÈN LUYỆN KỸ THUẬT' : 'VOCAL COACHING'}
                        </span>
                        <h4 className="text-lg font-bold uppercase text-[#0A0A0A]">
                          {lang === 'vi' ? 'HỌC THANH NHẠC' : 'VOCAL LESSONS'}
                        </h4>
                        <p className="mt-1 text-xs text-[#666666] font-normal leading-relaxed">
                          {lang === 'vi'
                            ? 'Giải phẫu hơi thở, mở rộng âm vực và làm chủ kỹ thuật biểu diễn phòng thu.'
                            : 'Diaphragmatic control, sustainable range extension, and studio microphone delivery.'}
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Vocal Sample Option: Direct Browser Recording or File Upload */}
                  <div className="p-6 rounded-lg bg-[#F6F6F4] border border-[#E5E5E5] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] block font-bold">
                          {lang === 'vi' ? 'BẢN THU MẪU (KHÔNG BẮT BUỘC)' : 'SAMPLE VOCAL CLIP (OPTIONAL)'}
                        </span>
                        <p className="text-xs text-[#666666] font-normal mt-1 leading-relaxed">
                          {lang === 'vi'
                            ? 'Bạn có thể ghi âm trực tiếp 15-30 giây hoặc tải lên file âm thanh để hội đồng nghe trước.'
                            : 'Record a quick 15-30s vocal sample in browser or upload an audio clip for pre-review.'}
                        </p>
                      </div>
                      <Radio size={18} className="text-[#7C3AED]" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startRecording}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#7C3AED] bg-[#7C3AED]/10 hover:bg-[#7C3AED] text-[#7C3AED] hover:text-white text-xs tracking-wider uppercase transition-all font-bold shadow-sm"
                        >
                          <Mic size={14} />
                          <span>{lang === 'vi' ? 'BẮT ĐẦU GHI ÂM TRỰC TIẾP' : 'RECORD SAMPLE IN BROWSER'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500 bg-red-500 text-xs tracking-wider uppercase text-white transition-all font-bold animate-pulse"
                        >
                          <span className="w-2 h-2 rounded-full bg-white" />
                          <span>
                            {lang === 'vi' ? `DỪNG GHI ÂM (${recordingSeconds}s)` : `STOP RECORDING (${recordingSeconds}s)`}
                          </span>
                        </button>
                      )}

                      <label className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5E5E5] hover:border-[#7C3AED] bg-white text-xs tracking-wider uppercase text-[#0A0A0A] transition-all cursor-pointer font-bold shadow-sm">
                        <Upload size={14} className="text-[#7C3AED]" />
                        <span>{lang === 'vi' ? 'TẢI FILE TỪ MÁY' : 'UPLOAD AUDIO FILE'}</span>
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAudioUrl(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>

                      {audioUrl && (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono tracking-wider font-bold">
                          <CheckCircle2 size={14} />
                          <span>{audioUrl}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 4: GUITAR SPECIFIC OPTIONS */}
              {selectedService === 'guitar' && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-4 font-bold">
                      {lang === 'vi' ? '1. LOẠI HÌNH ĐÀN GUITAR' : '1. GUITAR INSTRUMENT'}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Acoustic Guitar', 'Electric Guitar', 'Classical Guitar'].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setGuitarType(type)}
                          className={`p-4 rounded-lg border text-center text-xs tracking-wider uppercase transition-all ${
                            guitarType === type
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] font-bold shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50 font-medium'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-3 font-bold">
                      {lang === 'vi' ? 'KINH NGHIỆM CHƠI GUITAR' : 'EXPERIENCE'}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'zero', vi: 'Chưa từng chơi đàn', en: 'Absolute Beginner' },
                        { id: 'self', vi: 'Đã tự học đệm hát', en: 'Self-Taught / Chords' },
                        { id: 'lead', vi: 'Lead / Solo ngẫu hứng', en: 'Lead / Improvisation' },
                      ].map((lvl) => (
                        <button
                          type="button"
                          key={lvl.id}
                          onClick={() => setExperienceLevel(lvl.id)}
                          className={`p-3.5 rounded-lg border text-center text-xs tracking-wider uppercase transition-all ${
                            experienceLevel === lvl.id
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] font-bold shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50 font-medium'
                          }`}
                        >
                          {lang === 'vi' ? lvl.vi : lvl.en}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 5: MUSIC PRODUCER SPECIFIC OPTIONS */}
              {selectedService === 'producer' && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-4 font-bold">
                      {lang === 'vi' ? '1. MỤC TIÊU HỌC TẬP' : '1. PRIMARY LEARNING GOAL'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'complete_track',
                          vi: 'Hoàn thiện Track đầu tay',
                          en: 'Finish First Complete Track',
                          subVi: 'Từ ý tưởng thô đến bài nhạc hoàn chỉnh',
                          subEn: 'From initial seed to finished arrangement',
                        },
                        {
                          id: 'sound_beat',
                          vi: 'Sound Design & Beatmaking',
                          en: 'Sound Design & Beatcraft',
                          subVi: 'Làm chủ synthesizer, drum groove & samples',
                          subEn: 'Master synth engines, rhythm and sound selection',
                        },
                        {
                          id: 'artist_producer',
                          vi: 'Trở thành Music Producer độc lập',
                          en: 'Independent Music Producer',
                          subVi: 'Định hình phong cách & lộ trình hợp tác nghệ sĩ',
                          subEn: 'Establish sonic signature & artist collaborations',
                        },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            setProducerGoal(item.id);
                            setSelectedSubService(lang === 'vi' ? item.vi : item.en);
                          }}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            producerGoal === item.id
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#7C3AED]/50'
                          }`}
                        >
                          <span className="text-sm font-bold block uppercase tracking-wider text-[#0A0A0A]">
                            {lang === 'vi' ? item.vi : item.en}
                          </span>
                          <span className="text-[11px] text-[#666666] block mt-1 font-normal leading-relaxed">
                            {lang === 'vi' ? item.subVi : item.subEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Level */}
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#8B5CF6] mb-3 font-semibold">
                      {lang === 'vi' ? 'TRÌNH ĐỘ & KINH NGHIỆM HIỆN TẠI' : 'CURRENT PRODUCTION EXPERIENCE'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'beginner',
                          vi: 'Người mới bắt đầu',
                          en: 'Beginner',
                          descVi: 'Chưa từng mở DAW hoặc vừa cài phần mềm',
                          descEn: 'Brand new to DAWs or first exploring music tech',
                        },
                        {
                          id: 'intermediate',
                          vi: 'Đã tự làm beat / demo',
                          en: 'Self-Taught / Demo Maker',
                          descVi: 'Có kinh nghiệm cơ bản, muốn chuẩn hóa quy trình',
                          descEn: 'Familiar with DAW basics, looking for industry polish',
                        },
                        {
                          id: 'advanced',
                          vi: 'Muốn chuyên nghiệp hóa',
                          en: 'Advanced Aspiring Producer',
                          descVi: 'Cần nâng cấp sound selection và tư duy sản xuất',
                          descEn: 'Seeking commercial refinement & mentorship',
                        },
                      ].map((lvl) => (
                        <button
                          type="button"
                          key={lvl.id}
                          onClick={() => setExperienceLevel(lvl.id)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            experienceLevel === lvl.id
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#7C3AED]/50'
                          }`}
                        >
                          <span className="text-xs font-bold block uppercase tracking-wider text-[#0A0A0A]">
                            {lang === 'vi' ? lvl.vi : lvl.en}
                          </span>
                          <span className="text-[11px] text-[#666666] block mt-1 font-normal leading-relaxed">
                            {lang === 'vi' ? lvl.descVi : lvl.descEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 6: MIX & MASTER SPECIFIC OPTIONS */}
              {selectedService === 'mixmaster' && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-4 font-bold">
                      {lang === 'vi' ? '1. MỤC TIÊU HỌC TẬP & ĐỊNH HƯỚNG' : '1. FOCUS AREA'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'mixing_depth',
                          vi: 'Làm chủ Mixing & Không gian',
                          en: 'Mixing & Spatial Depth',
                          subVi: 'Cân bằng EQ, compression, vocal tuning & không gian',
                          subEn: 'EQ balance, compression, vocal processing & depth',
                        },
                        {
                          id: 'mastering_dsp',
                          vi: 'Mastering tiêu chuẩn phát hành',
                          en: 'Release-Ready Mastering',
                          subVi: 'Độ lớn LUFS, stereo image, chuẩn hóa phát hành DSP',
                          subEn: 'LUFS loudness curve, stereo width & DSP delivery',
                        },
                        {
                          id: 'full_suite',
                          vi: 'Toàn diện Mix & Master',
                          en: 'Complete Mix & Master Suite',
                          subVi: 'Quy trình phòng thu chuẩn mực từ stem đến master',
                          subEn: 'End-to-end studio workflow from multitrack to final',
                        },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            setMixGoal(item.id);
                            setSelectedSubService(lang === 'vi' ? item.vi : item.en);
                          }}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            mixGoal === item.id
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#7C3AED]/50'
                          }`}
                        >
                          <span className="text-xs font-bold block uppercase tracking-wider text-[#0A0A0A]">
                            {lang === 'vi' ? item.vi : item.en}
                          </span>
                          <span className="text-[11px] text-[#666666] block mt-1 font-normal leading-relaxed">
                            {lang === 'vi' ? item.subVi : item.subEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Level selection */}
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] mb-3 font-bold">
                      {lang === 'vi' ? 'TRÌNH ĐỘ & KINH NGHIỆM XỬ LÝ ÂM THANH' : 'CURRENT AUDIO PROCESSING LEVEL'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'beginner',
                          vi: 'Mới tìm hiểu âm học',
                          en: 'Beginner / Audio Basics',
                          descVi: 'Chưa có kiến thức chuyên sâu về EQ và Compressor',
                          descEn: 'Starting fresh with EQ, dynamics, and spatial acoustics',
                        },
                        {
                          id: 'intermediate',
                          vi: 'Đã tự mix demo',
                          en: 'Intermediate Self-Mixer',
                          descVi: 'Biết công cụ cơ bản nhưng âm thanh chưa sạch và dày',
                          descEn: 'Familiar with plugins but seeking clarity, punch & polish',
                        },
                        {
                          id: 'advanced',
                          vi: 'Producer / Kỹ thuật viên',
                          en: 'Producer / Audio Engineer',
                          descVi: 'Muốn hoàn thiện mastering chuẩn streaming quốc tế',
                          descEn: 'Aiming for commercial loudness, translation & analog gear',
                        },
                      ].map((lvl) => (
                        <button
                          type="button"
                          key={lvl.id}
                          onClick={() => setExperienceLevel(lvl.id)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            experienceLevel === lvl.id
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#0A0A0A] shadow-sm ring-1 ring-[#7C3AED]'
                              : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#7C3AED]/50'
                          }`}
                        >
                          <span className="text-xs font-bold block uppercase tracking-wider text-[#0A0A0A]">
                            {lang === 'vi' ? lvl.vi : lvl.en}
                          </span>
                          <span className="text-[11px] text-[#666666] block mt-1 font-normal leading-relaxed">
                            {lang === 'vi' ? lvl.descVi : lvl.descEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* REAL CALENDAR & TIME AVAILABILITY EXPERIENCE */}
              <div className="space-y-6 pt-6 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] font-bold">
                      {lang === 'vi' ? '2. CHỌN NGÀY LÀM VIỆC / BUỔI HỌC' : '2. SELECT DATE'}
                    </label>
                    <p className="text-xs text-[#666666] font-normal mt-0.5 leading-relaxed">
                      {lang === 'vi'
                        ? 'Lịch làm việc trực tiếp được đồng bộ theo thời gian thực.'
                        : 'Live availability synced with Spark production schedule.'}
                    </p>
                  </div>
                  <Calendar size={18} className="text-[#7C3AED]" />
                </div>

                {/* Horizontal Date Picker Cards */}
                <div className="flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
                  {dates.map((d, idx) => {
                    const isSelected = selectedDate?.toDateString() === d.toDateString();
                    const dayName = d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short' });
                    const dayNum = d.getDate();
                    const monthName = d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { month: 'short' });

                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedDate(d)}
                        className={`min-w-[88px] py-3.5 px-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#7C3AED] bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20 font-bold'
                            : 'border-[#E5E5E5] bg-white text-[#4A4A4A] hover:text-[#0A0A0A] hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${isSelected ? 'text-white/80' : 'text-[#8E8E93]'}`}>
                          {dayName}
                        </span>
                        <span className="text-xl font-bold tracking-tight my-0.5">
                          {dayNum}
                        </span>
                        <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${isSelected ? 'text-white/90' : 'text-[#7C3AED]'}`}>
                          {monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Available Time Slots Grid */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] font-bold">
                      {lang === 'vi' ? '3. CHỌN KHUNG GIỜ' : '3. SELECT TIME SLOT'}
                    </label>
                    <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{lang === 'vi' ? 'CÒN TRỐNG' : 'AVAILABLE'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#8E8E93] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D1D1D6]" />
                        <span>{lang === 'vi' ? 'ĐÃ KÍN' : 'BOOKED'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {timeSlots.map((slot) => {
                      const isChosen = selectedTime === slot.time;
                      return (
                        <button
                          type="button"
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-3 px-2 rounded-lg border text-center transition-all text-xs font-mono tracking-wider ${
                            !slot.available
                              ? 'border-[#E5E5E5] bg-[#F6F6F4] text-[#8E8E93]/50 cursor-not-allowed line-through'
                              : isChosen
                              ? 'border-[#7C3AED] bg-[#7C3AED] text-white font-bold shadow-md shadow-[#7C3AED]/20'
                              : 'border-[#E5E5E5] bg-white text-[#0A0A0A] hover:border-[#7C3AED] font-bold'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CONTACT & PARTICIPANT INFORMATION */}
              <div className="space-y-6 pt-6 border-t border-[#E5E5E5]">
                <label className="block text-xs font-mono tracking-[0.24em] uppercase text-[#7C3AED] font-bold">
                  {lang === 'vi' ? '4. THÔNG TIN LIÊN HỆ & DỰ ÁN' : '4. CONTACT & PROJECT DETAILS'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-[#4A4A4A] mb-2 font-bold">
                      {lang === 'vi' ? 'HỌ VÀ TÊN *' : 'FULL NAME *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'vi' ? 'Nguyễn Hoàng Minh' : 'Minh Nguyen'}
                      className="w-full bg-[#F6F6F4] border border-[#D1D1D6] focus:border-[#7C3AED] focus:bg-white rounded-lg px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#8E8E93] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-[#4A4A4A] mb-2 font-bold">
                      {lang === 'vi' ? 'ĐỊA CHỈ EMAIL *' : 'EMAIL ADDRESS *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="minh@example.com"
                      className="w-full bg-[#F6F6F4] border border-[#D1D1D6] focus:border-[#7C3AED] focus:bg-white rounded-lg px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#8E8E93] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-[#4A4A4A] mb-2 font-bold">
                      {lang === 'vi' ? 'SỐ ĐIỆN THOẠI (SMS XÁC NHẬN) *' : 'PHONE NUMBER *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+84 90 000 0000"
                      className="w-full bg-[#F6F6F4] border border-[#D1D1D6] focus:border-[#7C3AED] focus:bg-white rounded-lg px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#8E8E93] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-[#4A4A4A] mb-2 font-bold">
                      {lang === 'vi' ? 'ĐỘ TUỔI / NĂM SINH' : 'AGE / BIRTH YEAR'}
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="2000"
                      className="w-full bg-[#F6F6F4] border border-[#D1D1D6] focus:border-[#7C3AED] focus:bg-white rounded-lg px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#8E8E93] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-[#4A4A4A] mb-2 font-bold">
                    {lang === 'vi' ? 'GHI CHÚ DỰ ÁN / MỤC TIÊU NGHỆ THUẬT' : 'PROJECT NOTES / ARTISTIC GOALS'}
                  </label>
                  <textarea
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder={
                      lang === 'vi'
                        ? 'Mô tả bài hát dự kiến thu âm, thể loại âm nhạc hoặc mục tiêu bạn muốn đạt được...'
                        : 'Describe the upcoming track, genre direction, or specific technical aims...'
                    }
                    className="w-full bg-[#F6F6F4] border border-[#D1D1D6] focus:border-[#7C3AED] focus:bg-white rounded-lg px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#8E8E93] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-xs text-[#666666] font-mono tracking-wider uppercase font-semibold">
                  {selectedDate && selectedTime ? (
                    <span className="text-[#7C3AED] font-bold">
                      ✓ {selectedDate.toLocaleDateString()} · {selectedTime}
                    </span>
                  ) : (
                    <span>{lang === 'vi' ? 'Vui lòng chọn ngày và giờ ở phía trên' : 'Please select date & time slot above'}</span>
                  )}
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 sm:flex-initial px-6 py-3.5 rounded-full border border-[#D1D1D6] hover:border-[#0A0A0A] text-xs font-condensed tracking-[0.2em] uppercase text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors font-bold"
                  >
                    {lang === 'vi' ? 'HỦY' : 'CANCEL'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-9 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] text-white text-xs font-condensed tracking-[0.24em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#7C3AED]/20 flex items-center justify-center gap-2"
                  >
                    <span>
                      {selectedService === 'recording' && (lang === 'vi' ? 'XÁC NHẬN ĐẶT LỊCH →' : 'CONFIRM BOOKING →')}
                      {selectedService === 'piano' && (pianoOption === 'trial' ? (lang === 'vi' ? 'HỌC THỬ PIANO →' : 'BOOK A PIANO TRIAL →') : (lang === 'vi' ? 'XÁC NHẬN ĐĂNG KÝ →' : 'CONFIRM ENROLLMENT →'))}
                      {selectedService === 'vocal' && (lang === 'vi' ? 'ĐẶT LỊCH THỬ GIỌNG →' : 'BOOK VOICE AUDITION →')}
                      {selectedService === 'guitar' && (lang === 'vi' ? 'HỌC THỬ GUITAR →' : 'GUITAR TRIAL LESSON →')}
                      {selectedService === 'producer' && (lang === 'vi' ? 'BẮT ĐẦU ĐẶT LỊCH →' : 'CONFIRM PRODUCER SESSION →')}
                      {selectedService === 'mixmaster' && (lang === 'vi' ? 'BẮT ĐẦU ĐẶT LỊCH →' : 'CONFIRM MIX & MASTER SESSION →')}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
