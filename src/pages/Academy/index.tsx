import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinimalNav } from '@/components/MinimalNav';
import { MinimalFooter } from '@/components/MinimalFooter';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { ASSETS } from '@/lib/data';
import { Plus, Minus, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useBookingModal } from '@/lib/BookingContext';

export default function AcademyPage() {
  const { lang } = useLanguage();
  const { openBooking } = useBookingModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    discipline: 'PIANO',
    level: 'BEGINNER',
    message: '',
  });

  useEffect(() => {
    document.title = lang === 'vi'
      ? 'Spark Academy — Đào tạo Âm nhạc Đương đại | Spark Entertainment'
      : 'Spark Academy — Contemporary Music Education | Spark Entertainment';
    window.scrollTo(0, 0);
  }, [lang]);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitted(true);
  };

  const disciplines = [
    {
      id: '01',
      title: 'PIANO',
      subVi: 'Cổ điển & Jazz đương đại, hòa thanh và cảm thụ phím đàn.',
      subEn: 'Classical & contemporary jazz touch, harmonic voicing, and performance posture.',
      outcomesVi: [
        'Kỹ thuật ngón, thị tấu và phản xạ hợp âm đương đại',
        'Cấu trúc hòa thanh ứng dụng trong sản xuất âm nhạc',
        'Thực hành biểu diễn và tương tác với ban nhạc trực tiếp',
      ],
      outcomesEn: [
        'Contemporary finger technique, sight reading, and harmonic reflex',
        'Harmonic structures applied to modern music production',
        'Live performance dynamics and real band accompaniment',
      ],
      image: ASSETS.studioAcoustic,
    },
    {
      id: '02',
      title: lang === 'vi' ? 'THANH NHẠC' : 'VOCAL',
      subVi: 'Giải phẫu thanh nhạc, kỹ thuật hơi thở, phong thái và bản sắc giọng.',
      subEn: 'Vocal anatomy, diaphragmatic breath control, stage presence, and unique vocal identity.',
      outcomesVi: [
        'Làm chủ cột hơi, cao độ, mở rộng quãng giọng an toàn',
        'Kỹ thuật xử lý ca từ và cảm xúc trong phòng thu chuyên nghiệp',
        'Định hình màu sắc thanh âm đặc trưng của từng nghệ sĩ',
      ],
      outcomesEn: [
        'Breath support, pitch accuracy, and sustainable vocal range expansion',
        'Studio microphone delivery and emotional phrasing',
        'Artistic timbre shaping and distinct signature tone',
      ],
      image: ASSETS.artistMinh,
    },
    {
      id: '03',
      title: 'GUITAR',
      subVi: 'Acoustic & Electric Guitar, phong cách đệm hát và solo biểu diễn.',
      subEn: 'Acoustic & Electric guitar, fingerstyle arrangement, and expressive solo improvisation.',
      outcomesVi: [
        'Hệ thống gam, pentatonic, modal và rải ngón chuẩn xác',
        'Kỹ năng đệm hát đương đại, solo giai điệu và sáng tác riff',
        'Thực hành ghi âm guitar mộc và guitar điện chuẩn studio',
      ],
      outcomesEn: [
        'Scale systems, chord melody voicings, and articulate picking',
        'Contemporary rhythm backing, dynamic soloing, and riff writing',
        'Direct and acoustic microphone tracking in professional live rooms',
      ],
      image: ASSETS.artistLyra,
    },
    {
      id: '04',
      title: 'MUSIC PRODUCER',
      subVi: 'Học cách biến ý tưởng thành một sản phẩm âm nhạc hoàn chỉnh — từ ý tưởng, arrangement, sound selection đến production.',
      subEn: 'Learn how to turn an idea into a complete music production — from concept and arrangement to sound selection and production.',
      outcomesVi: [
        'Music production fundamentals & quy trình làm việc trên DAW chuyên nghiệp',
        'Cấu trúc arrangement, lựa chọn âm sắc (sound selection) & thiết kế beat/rhythm',
        'Kỹ thuật thu âm nền tảng, định hình chất âm cá nhân và hoàn thiện finished track',
      ],
      outcomesEn: [
        'Music production fundamentals & industry DAW workflow mastery',
        'Arrangement architecture, strategic sound selection & rhythm/beat craft',
        'Recording fundamentals, developing personal sound & completing a finished track',
      ],
      image: ASSETS.studioMain,
    },
    {
      id: '05',
      title: 'MIX & MASTER',
      subVi: 'Làm chủ quá trình hoàn thiện âm thanh — từ cân bằng, xử lý, không gian và dynamics đến bản master sẵn sàng phát hành.',
      subEn: 'Master the final stages of music production — from balance, processing, space and dynamics to a release-ready master.',
      outcomesVi: [
        'Mixing fundamentals: làm chủ EQ, nén (Compression), Reverb & Delay đa chiều',
        'Kỹ thuật xử lý giọng hát (Vocal Processing), chiều sâu không gian & trường âm stereo',
        'Kiểm soát Dynamics, Mastering fundamentals và chuẩn hóa bản master sẵn sàng phát hành',
      ],
      outcomesEn: [
        'Mixing fundamentals: deep command of EQ, surgical compression, reverb & delay',
        'Advanced vocal processing, spatial depth staging & stereo image widening',
        'Dynamics control, mastering fundamentals & preparing music for global DSP release',
      ],
      image: ASSETS.studioMastering,
    },
  ];

  const sparkMethod = [
    {
      num: '01',
      title: lang === 'vi' ? 'HỌC HỎI' : 'LEARN',
      tagVi: 'NỀN TẢNG KỸ NGHỆ',
      tagEn: 'TECHNICAL MASTERY',
      descVi: 'Xây dựng nền tảng nhạc lý, giải phẫu kỹ thuật và thói quen thực hành bền vững cùng các chuyên gia hàng đầu.',
      descEn: 'Build uncompromising music theory, physical mechanics, and sustainable practice habits guided by active creators.',
    },
    {
      num: '02',
      title: lang === 'vi' ? 'SÁNG TẠO' : 'CREATE',
      tagVi: 'SÁNG TẠO THỰC CHIẾN',
      tagEn: 'REAL PRODUCTION',
      descVi: 'Áp dụng kiến thức trực tiếp vào sản xuất âm nhạc thực tế trong không gian phòng thu thương mại Spark Studio.',
      descEn: 'Apply theoretical knowledge immediately inside active commercial sessions and state-of-the-art live tracking rooms.',
    },
    {
      num: '03',
      title: lang === 'vi' ? 'TRÌNH DIỄN' : 'PERFORM',
      tagVi: 'ĐỊNH HÌNH BẢN SẮC',
      tagEn: 'ARTISTIC IDENTITY',
      descVi: 'Phát triển sự tự tin biểu diễn, bản sắc nghệ sĩ và phong thái chuyên nghiệp trước công chúng và sân khấu.',
      descEn: 'Cultivate commanding stage presence, authentic artistic confidence, and real-world performance resilience.',
    },
  ];

  const learningEcosystemSteps = lang === 'vi' ? [
    { step: 'HỌC HỎI', label: 'NỀN TẢNG KỸ NGHỆ' },
    { step: 'SÁNG TẠO', label: 'MUSIC PRODUCER' },
    { step: 'SẢN XUẤT', label: 'SPARK STUDIO' },
    { step: 'HOÀN THIỆN', label: 'MIX & MASTER' },
    { step: 'PHÁT HÀNH', label: 'SPARK LABEL' },
  ] : [
    { step: 'LEARN', label: 'CRAFT FOUNDATION' },
    { step: 'CREATE', label: 'MUSIC PRODUCER' },
    { step: 'PRODUCE', label: 'SPARK STUDIO' },
    { step: 'REFINE', label: 'MIX & MASTER' },
    { step: 'RELEASE', label: 'SPARK LABEL' },
  ];

  const targetAudiences = lang === 'vi' ? [
    { title: 'NGƯỜI MỚI BẮT ĐẦU', desc: 'Xây dựng nền tảng âm nhạc chuẩn xác từ ngày đầu cùng phương pháp bài bản.' },
    { title: 'NGHỆ SĨ BIỂU DIỄN', desc: 'Nâng cấp phong thái, kỹ thuật và sự tự tin sân khấu trước công chúng.' },
    { title: 'CA SĨ', desc: 'Làm chủ buồng thu âm, kiểm soát hơi thở và định hình màu giọng đặc trưng.' },
    { title: 'NHẠC CÔNG', desc: 'Mở rộng ngôn ngữ hòa thanh đương đại và khả năng hòa tấu linh hoạt.' },
    { title: 'NHÀ SẢN XUẤT', desc: 'Tinh chỉnh cấu trúc beat, thiết kế âm thanh và kỹ thuật mixing hoàn chỉnh.' },
    { title: 'NGHỆ SĨ ĐỘC LẬP', desc: 'Tìm kiếm định hướng phát triển sự nghiệp lâu dài trong hệ sinh thái Spark.' },
  ] : [
    { title: 'BEGINNERS', desc: 'Dedicated newcomers seeking rigorous foundational principles and proper physical habits.' },
    { title: 'PERFORMERS', desc: 'Stage performers refining delivery, tonal flexibility, and audience engagement.' },
    { title: 'SINGERS', desc: 'Vocalists mastering studio tracking techniques and defining distinct tonal color.' },
    { title: 'MUSICIANS', desc: 'Instrumentalists expanding contemporary harmonic grammar and session agility.' },
    { title: 'PRODUCERS', desc: 'Emerging producers mastering sonic architecture, arrangement, and mixing.' },
    { title: 'ARTISTS', desc: 'Independent singer-songwriters seeking holistic guidance connected to a label.' },
  ];

  const faqs = lang === 'vi' ? [
    {
      q: 'Spark Academy có yêu cầu kinh nghiệm trước khi tham gia không?',
      a: 'Các chương trình tại Spark Academy được thiết kế linh hoạt từ nền tảng cơ bản đến chuyên sâu thực chiến. Học viên sẽ được đánh giá kỹ năng ban đầu để có lộ trình phù hợp nhất. Liên hệ Spark Academy để biết tình trạng lớp hiện tại.',
    },
    {
      q: 'Hình thức học tập tại Spark Academy được tổ chức như thế nào?',
      a: 'Chương trình kết hợp hướng dẫn 1-1 chuyên sâu cùng các buổi thực hành phòng thu trực tiếp tại Spark Studio, đảm bảo học viên cọ xát với thiết bị tiêu chuẩn công nghiệp.',
    },
    {
      q: 'Học viên có được thực hành trên thiết bị của Spark Studio không?',
      a: 'Có. Tất cả học viên các bộ môn nhạc cụ, thanh nhạc và sản xuất đều được tiếp cận phòng thu âm, micro tiêu chuẩn và hệ thống kiểm âm trong quá trình học.',
    },
    {
      q: 'Làm thế nào để đăng ký tư vấn và đánh giá năng lực?',
      a: 'Bạn có thể điền thông tin vào biểu mẫu đăng ký bên dưới. Đội ngũ đào tạo của Spark Academy sẽ liên hệ trực tiếp để sắp xếp buổi gặp gỡ và tư vấn chi tiết.',
    },
  ] : [
    {
      q: 'Does Spark Academy require prior musical experience?',
      a: 'Spark Academy programs accommodate dedicated beginners through advanced practitioners. Each applicant receives a personalized orientation to determine the most effective roadmap. Contact Spark Academy for current program availability.',
    },
    {
      q: 'What is the format of learning at Spark Academy?',
      a: 'Programs blend intensive 1-on-1 mentorship with direct acoustic tracking lab sessions inside Spark Studio facilities.',
    },
    {
      q: 'Do students get hands-on access to Spark Studio facilities?',
      a: 'Yes. Students across performance and production disciplines train directly within acoustic-treated live rooms and professional production suites.',
    },
    {
      q: 'How can I schedule a consultation and skill assessment?',
      a: 'Please submit the consultation form below. The Spark Academy academic team will respond directly to schedule your orientation.',
    },
  ];

  return (
    <div className="bg-white text-[#0A0A0A] min-h-screen relative selection:bg-[#7C3AED]/20 selection:text-[#0A0A0A] overflow-x-hidden">
      {/* Precision Global Nav */}
      <MinimalNav />

      {/* 01 — HERO */}
      <section
        id="academy-hero"
        className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-white text-[#0A0A0A] pt-28 pb-16"
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#E5E5E5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 md:px-12 lg:px-20 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.34em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            SPARK ACADEMY · MUSIC EDUCATION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-condensed font-extrabold text-[clamp(2.75rem,8.2vw,9.2rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.04] sm:leading-[1.0] select-none max-w-6xl h-auto"
          >
            {lang === 'vi' ? (
              <>
                LÀM CHỦ KỸ NGHỆ.<br />
                <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">ĐỊNH HÌNH CHẤT RIÊNG.</span>
              </>
            ) : (
              <>
                MASTER THE CRAFT.<br />
                <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">BUILD YOUR SOUND.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-11 font-condensed text-xs md:text-sm tracking-[0.28em] uppercase text-[#666666] font-semibold max-w-2xl leading-relaxed"
          >
            {lang === 'vi'
              ? 'Điểm khởi đầu bước vào hệ sinh thái âm nhạc thế hệ mới của Spark: học hỏi, rèn luyện thực chiến và khai phóng tài năng.'
              : 'The entry point to Spark’s next-generation music ecosystem: learning, hands-on studio creation, and unlocking artistic potential.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <a
              href="#disciplines"
              className="px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-lg hover:shadow-[#7C3AED]/20"
            >
              <span>{lang === 'vi' ? 'KHÁM PHÁ CHƯƠNG TRÌNH' : 'EXPLORE PROGRAMS'}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="px-8 py-3.5 rounded-full border border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300"
            >
              <span>{lang === 'vi' ? 'ĐĂNG KÝ TƯ VẤN' : 'BOOK A CONSULTATION'}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 02 — ABOUT SPARK ACADEMY */}
      <section
        id="about-academy"
        className="relative w-full bg-[#F6F6F4] py-28 md:py-40 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
              >
                {lang === 'vi' ? '02 / TRIẾT LÝ' : '02 / PHILOSOPHY'}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-condensed font-extrabold text-[clamp(2.5rem,7vw,7.2rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
              >
                {lang === 'vi' ? (
                  <>
                    VƯỢT TRÊN<br />
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">MỘT TRƯỜNG NHẠC.</span>
                  </>
                ) : (
                  <>
                    MORE THAN<br />
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">A MUSIC SCHOOL.</span>
                  </>
                )}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="mt-8 md:mt-12 space-y-6 text-base md:text-xl text-[#666666] font-normal leading-relaxed max-w-2xl"
              >
                <p>
                  {lang === 'vi'
                    ? 'Spark Academy không vận hành như một trường nhạc truyền thống. Chúng tôi xây dựng môi trường đào tạo đương đại xoay quanh sản xuất âm nhạc thực tế, kỹ thuật phòng thu chuyên nghiệp và bản sắc trình diễn sống động.'
                    : 'Spark Academy is a contemporary music education environment built around real music production, performance, and professional studio practice.'}
                </p>
                <p className="text-sm md:text-base text-[#0A0A0A] font-medium">
                  {lang === 'vi'
                    ? 'Mỗi học viên tại Spark Academy được kết nối trực tiếp với không gian phòng thu Spark Studio và hệ sinh thái Spark Entertainment, giúp thu hẹp khoảng cách giữa lý thuyết bài học và ngành công nghiệp âm nhạc thực thụ.'
                    : 'The Academy connects education directly with Spark Studio and the wider Spark Entertainment ecosystem, bridging the gap between practice and industry delivery.'}
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-5 pt-4 lg:pt-14">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white border border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <ImageWithFallback
                  src={ASSETS.studioVocalBooth}
                  alt="Spark Studio Vocal Suite"
                  fallbackLabel="SPARK SUITE"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — FIVE DISCIPLINES */}
      <section
        id="disciplines"
        className="relative w-full bg-white py-28 md:py-40 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="mb-24 md:mb-32">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
            >
              {lang === 'vi' ? '03 / CÁC BỘ MÔN ĐÀO TẠO' : '03 / DISCIPLINES'}
            </motion.span>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D9D9] pb-10">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-condensed font-extrabold text-[clamp(2.5rem,5.5vw,5.5rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[0.98] select-none"
              >
                {lang === 'vi' ? (
                  <>
                    LÀM CHỦ<br />
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight">KỸ NGHỆ.</span>
                  </>
                ) : (
                  <>
                    WHAT YOU<br />
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight">CAN MASTER.</span>
                  </>
                )}
              </motion.h2>

              <div className="max-w-md">
                <p className="text-sm md:text-base text-[#444444] font-normal leading-relaxed">
                  {lang === 'vi'
                    ? 'Chương trình đào tạo chuyên sâu kết hợp trực tiếp giữa tư duy nghệ thuật, kỹ nghệ thực chiến và hệ sinh thái sản xuất âm thanh chuyên nghiệp.'
                    : 'Intensive disciplines bridging artistic identity, real-world execution, and professional audio production.'}
                </p>
                <span className="text-[11px] tracking-[0.24em] uppercase text-[#666666] font-mono font-bold block mt-2">
                  {lang === 'vi' ? 'BIỂU DIỄN & SẢN XUẤT CHUYÊN SÂU' : 'PERFORMANCE & PRODUCTION DISCIPLINES'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-28 md:space-y-40">
            {disciplines.map((item, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#F6F6F4] border border-[#E5E5E5] group shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        fallbackLabel={item.title}
                        className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter contrast-[1.04]"
                      />
                      <div className="absolute top-6 left-6 px-3 py-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E5] text-xs font-condensed tracking-widest text-[#0A0A0A] uppercase font-bold">
                        {item.id}
                      </div>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                    <div>
                      <span className="font-condensed text-[12px] tracking-[0.32em] uppercase text-[#7C3AED] block mb-2 font-bold">
                        {lang === 'vi' ? `BỘ MÔN ${item.id}` : `DISCIPLINE ${item.id}`}
                      </span>
                      <h3 className="font-condensed text-4xl md:text-6xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] leading-[0.92]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-base text-[#444444] font-normal leading-relaxed">
                      {lang === 'vi' ? item.subVi : item.subEn}
                    </p>

                    <div className="pt-2 border-t border-[#D9D9D9] space-y-2.5">
                      <span className="font-condensed text-[11px] tracking-[0.28em] uppercase text-[#0A0A0A] font-bold block">
                        {lang === 'vi' ? 'KẾT QUẢ ĐÀO TẠO TRỌNG TÂM' : 'CORE OUTCOMES'}
                      </span>
                      <ul className="space-y-2 text-xs md:text-sm text-[#555555] font-normal">
                        {(lang === 'vi' ? item.outcomesVi : item.outcomesEn).map((outcome, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-3">
                            <span className="text-[#7C3AED] text-xs mt-0.5 font-bold">✦</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      {/* Contextual Direct Booking Action: Trial or Lesson */}
                      <button
                        type="button"
                        onClick={() => {
                          if (item.id === '01') openBooking('piano');
                          else if (item.id === '02') openBooking('vocal');
                          else if (item.id === '03') openBooking('guitar');
                          else if (item.id === '04') openBooking('producer');
                          else if (item.id === '05') openBooking('mixmaster');
                        }}
                        className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#7C3AED]/20"
                      >
                        <Calendar size={13} />
                        <span>
                          {item.id === '01' && (lang === 'vi' ? 'HỌC THỬ PIANO →' : 'BOOK A PIANO TRIAL →')}
                          {item.id === '02' && (lang === 'vi' ? 'ĐẶT LỊCH THỬ GIỌNG →' : 'BOOK VOICE AUDITION →')}
                          {item.id === '03' && (lang === 'vi' ? 'HỌC THỬ GUITAR →' : 'GUITAR TRIAL LESSON →')}
                          {item.id === '04' && (lang === 'vi' ? 'ĐẶT LỊCH MUSIC PRODUCER →' : 'BOOK MUSIC PRODUCER →')}
                          {item.id === '05' && (lang === 'vi' ? 'ĐẶT LỊCH MIX & MASTER →' : 'BOOK MIX & MASTER →')}
                        </span>
                      </button>

                      <a
                        href="#consultation"
                        className="inline-flex items-center gap-2 font-condensed text-xs tracking-[0.26em] uppercase text-[#666666] hover:text-[#0A0A0A] group font-bold py-2 px-2"
                      >
                        <span className="group-hover:text-[#0A0A0A] transition-colors duration-300">
                          {lang === 'vi' ? 'TƯ VẤN LỘ TRÌNH' : 'REQUEST ORIENTATION'}
                        </span>
                        <span className="text-xs transition-transform duration-300 group-hover:translate-x-1.5 text-[#7C3AED]">→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 — THE SPARK METHOD */}
      <section
        id="method"
        className="relative w-full bg-[#F6F6F4] py-28 md:py-40 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#D9D9D9]"
      >
        <div className="max-w-[1720px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '04 / PHƯƠNG PHÁP ĐÀO TẠO' : '04 / METHODOLOGY'}
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end mb-16">
            <div className="lg:col-span-7">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-condensed font-extrabold text-[clamp(2.4rem,5.2vw,5.2rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.04] select-none"
              >
                {lang === 'vi' ? (
                  <>
                    <span className="block mb-1">HỌC HỎI.</span>
                    <span className="block mb-1">SÁNG TẠO.</span>
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight block">TRÌNH DIỄN.</span>
                  </>
                ) : (
                  <>
                    <span className="block mb-1">LEARN.</span>
                    <span className="block mb-1">CREATE.</span>
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight block">PERFORM.</span>
                  </>
                )}
              </motion.h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-[#444444] font-normal leading-relaxed">
                {lang === 'vi'
                  ? 'Triết lý học tập tại Spark Academy tập trung vào sự liền mạch giữa việc làm chủ kỹ thuật, đưa kiến thức vào bài hát thực tế và trình diễn với bản lĩnh nghệ sĩ.'
                  : 'The Academy learning philosophy builds upon technical mastery, direct production execution, and commanding artistic performance.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#D9D9D9] pt-12">
            {sparkMethod.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 1.1 }}
                className="space-y-4 bg-white p-8 rounded-lg border border-[#E5E5E5] shadow-sm"
              >
                <span className="text-xs font-mono tracking-widest text-[#7C3AED] font-bold block">
                  {item.num}
                </span>
                <h3 className="font-condensed text-2xl md:text-3xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A]">
                  {item.title}
                </h3>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block font-mono font-bold">
                  {lang === 'vi' ? item.tagVi : item.tagEn}
                </span>
                <p className="text-sm text-[#555555] font-normal leading-relaxed">
                  {lang === 'vi' ? item.descVi : item.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — LEARNING EXPERIENCE: Ecosystem Flow */}
      <section
        id="experience"
        className="relative w-full bg-[#F6F6F4] py-28 md:py-40 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
      >
        <div className="max-w-[1720px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '05 / KẾT NỐI HỆ SINH THÁI' : '05 / THE ECOSYSTEM CONNECTION'}
          </motion.span>

          <div className="mb-16">
            <h2 className="font-condensed font-extrabold text-[clamp(2.5rem,6.5vw,6.5rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto">
              {lang === 'vi' ? (
                <>
                  KIẾN TẠO CÙNG<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">ÂM NHẠC THỰC CHIẾN.</span>
                </>
              ) : (
                <>
                  BUILT AROUND<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">REAL MUSIC.</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-sm md:text-base text-[#666666] font-normal max-w-xl">
              {lang === 'vi'
                ? 'Quy trình đào tạo gắn liền trực tiếp với hạ tầng phòng thu và các dự án phát hành thực thụ.'
                : 'Education connected continuously to commercial tracking, mixing, and artist releases.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 border-y border-[#E5E5E5] py-12">
            {learningEcosystemSteps.map((stepItem, idx) => (
              <div key={stepItem.step} className="space-y-3 relative group">
                <span className="text-[10px] tracking-[0.2em] font-mono text-[#7C3AED] block font-bold">
                  {lang === 'vi' ? `BƯỚC 0${idx + 1}` : `STEP 0${idx + 1}`}
                </span>
                <h4 className="font-condensed text-xl md:text-2xl font-extrabold tracking-[0.06em] uppercase text-[#0A0A0A]">
                  {stepItem.step}
                </h4>
                <p className="font-condensed text-xs tracking-[0.16em] uppercase text-[#666666] font-semibold">
                  {stepItem.label}
                </p>
                {idx < learningEcosystemSteps.length - 1 && (
                  <span className="hidden lg:block absolute -right-3 top-8 text-[#D1D1D6] text-xs font-mono">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — WHO IS IT FOR? */}
      <section
        id="audience"
        className="relative w-full bg-[#F6F6F4] py-28 md:py-40 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#D9D9D9]"
      >
        <div className="max-w-[1720px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '07 / ĐỐI TƯỢNG PHÙ HỢP' : '07 / APPLICANTS'}
          </motion.span>

          <div className="mb-16">
            <h2 className="font-condensed font-extrabold text-[clamp(2.4rem,5.2vw,5.2rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[0.98] select-none">
              {lang === 'vi' ? (
                <>
                  CHINH PHỤC<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight">TẦM CAO MỚI.</span>
                </>
              ) : (
                <>
                  FIND YOUR<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight">NEXT LEVEL.</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 border-t border-[#D9D9D9] pt-12">
            {targetAudiences.map((aud, idx) => (
              <div key={aud.title} className="space-y-3 bg-white p-8 rounded-lg border border-[#E5E5E5] shadow-sm">
                <span className="text-xs font-mono tracking-widest text-[#7C3AED] font-bold block">
                  0{idx + 1}
                </span>
                <h4 className="font-condensed text-2xl font-extrabold tracking-[-0.01em] uppercase text-[#111111]">
                  {aud.title}
                </h4>
                <p className="text-sm text-[#555555] font-normal leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — FAQ */}
      <section
        id="faq"
        className="relative w-full bg-[#F6F6F4] py-28 md:py-40 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
      >
        <div className="max-w-[1720px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-6 font-bold"
          >
            {lang === 'vi' ? '08 / CÂU HỎI THƯỜNG GẶP' : '08 / FREQUENTLY ASKED QUESTIONS'}
          </motion.span>

          <div className="mb-16">
            <h2 className="font-condensed font-extrabold text-[clamp(2.5rem,6.5vw,6.5rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto">
              {lang === 'vi' ? (
                <>
                  THẮC MẮC<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">PHỔ BIẾN.</span>
                </>
              ) : (
                <>
                  COMMON<br />
                  <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">INQUIRIES.</span>
                </>
              )}
            </h2>
          </div>

          <div className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-8 md:py-10">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="font-condensed text-xl md:text-3xl font-extrabold tracking-[-0.01em] uppercase text-[#0A0A0A] group-hover:text-[#7C3AED] transition-colors duration-300">
                      {faq.q}
                    </span>
                    <span className="p-2 text-[#666666] group-hover:text-[#7C3AED] transition-colors">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm md:text-base text-[#666666] font-normal leading-relaxed max-w-3xl">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09 — FINAL CTA & CONSULTATION FORM */}
      <section
        id="consultation"
        className="relative w-full bg-white py-28 md:py-44 px-6 md:px-12 lg:px-20 text-[#0A0A0A] border-t border-[#E5E5E5]"
      >
        <div className="max-w-[1720px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-condensed text-xs tracking-[0.32em] uppercase text-[#7C3AED] block mb-8 font-bold"
          >
            {lang === 'vi' ? '09 / ĐĂNG KÝ HỌC' : '09 / ENROLLMENT'}
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-7">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-condensed font-extrabold text-[clamp(2.5rem,7vw,7.6rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
              >
                {lang === 'vi' ? (
                  <>
                    SẴN SÀNG<br />
                    <span className="font-extrabold text-[#0A0A0A]">ĐỊNH HÌNH</span><br />
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">CHẤT ÂM?</span>
                  </>
                ) : (
                  <>
                    READY TO<br />
                    <span className="font-extrabold text-[#0A0A0A]">BUILD YOUR</span><br />
                    <span className="font-extrabold italic text-[#7C3AED] tracking-tight inline-block pt-1">SOUND?</span>
                  </>
                )}
              </motion.h2>

              <p className="mt-8 md:mt-12 text-base md:text-xl text-[#666666] font-normal leading-relaxed max-w-xl">
                {lang === 'vi'
                  ? 'Bắt đầu hành trình phát triển âm nhạc cùng Spark Academy. Đội ngũ đào tạo sẽ liên hệ trực tiếp để sắp xếp buổi trao đổi định hướng.'
                  : 'Start your journey with Spark Academy. Contact Spark Academy for current program availability and custom roadmap guidance.'}
              </p>

              {/* Instant Booking Trigger Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openBooking('piano')}
                  className="px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] text-white text-xs font-condensed tracking-[0.24em] uppercase font-bold transition-all duration-300 shadow-md flex items-center gap-2.5"
                >
                  <Calendar size={14} />
                  <span>{lang === 'vi' ? 'ĐẶT LỊCH HỌC THỬ TRỰC TUYẾN ↗' : 'BOOK A TRIAL LESSON ONLINE ↗'}</span>
                </button>
              </div>

              <div className="mt-12 pt-10 border-t border-[#E5E5E5] text-xs tracking-[0.18em] uppercase text-[#666666] space-y-4">
                <div>
                  <span className="text-[#8E8E93] block mb-1.5 text-[10px] font-mono font-bold">
                    {lang === 'vi' ? 'BAN TUYỂN SINH ACADEMY' : 'ACADEMY ADMISSIONS'}
                  </span>
                  <a
                    href="mailto:academy@sparkent.vn"
                    className="text-[#0A0A0A] text-sm md:text-base hover:text-[#7C3AED] transition-colors duration-300 font-semibold block"
                  >
                    academy@sparkent.vn
                  </a>
                </div>
                <div>
                  <span className="text-[#8E8E93] block mb-1 text-[10px] font-mono font-bold">
                    HOTLINE
                  </span>
                  <a
                    href="tel:+84911534666"
                    className="text-[#0A0A0A] text-base md:text-lg hover:text-[#7C3AED] transition-colors duration-300 font-bold font-mono tracking-wider inline-block"
                  >
                    0911 534 666
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 pt-4 lg:pt-0">
              <div className="bg-[#F6F6F4] border border-[#E5E5E5] p-8 md:p-12 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
                <AnimatePresence mode="wait">
                  {consultationSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-10 h-10 rounded-full border border-[#8B5CF6] text-[#8B5CF6] mx-auto flex items-center justify-center text-sm">
                        ✓
                      </div>
                      <h3 className="text-xl font-light uppercase tracking-[0.08em] text-[#F2F0EA]">
                        {lang === 'vi' ? 'ĐÃ NHẬN ĐĂNG KÝ TƯ VẤN' : 'CONSULTATION REQUESTED'}
                      </h3>
                      <p className="text-xs text-[#A7A8AE] font-light leading-relaxed max-w-xs mx-auto">
                        {lang === 'vi'
                          ? 'Đội ngũ Spark Academy sẽ liên hệ trực tiếp qua email hoặc số điện thoại trong vòng 24 giờ.'
                          : 'Our academic coordinator will reach out directly within 24 hours to arrange your orientation.'}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleConsultationSubmit} className="space-y-7">
                      <div>
                        <label className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                          {lang === 'vi' ? 'HỌ & TÊN HỌC VIÊN' : 'YOUR NAME'}
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border-b border-[#D1D1D6] pb-2 text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#7C3AED] transition-colors"
                          placeholder={lang === 'vi' ? 'Nhập tên của bạn' : 'Enter your name'}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                          EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border-b border-[#D1D1D6] pb-2 text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#7C3AED] transition-colors"
                          placeholder="email@address.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="academy-discipline-select" className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                          {lang === 'vi' ? 'BỘ MÔN QUAN TÂM' : 'DISCIPLINE OF INTEREST'}
                        </label>
                        <select
                          id="academy-discipline-select"
                          name="discipline"
                          aria-label={lang === 'vi' ? 'Bộ môn quan tâm' : 'Discipline of interest'}
                          value={form.discipline}
                          onChange={(e) => setForm({ ...form, discipline: e.target.value })}
                          className="w-full bg-white border border-[#E5E5E5] p-2 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#7C3AED] rounded-sm transition-colors"
                        >
                          {lang === 'vi' ? (
                            <>
                              <option value="PIANO">01 — PIANO (BIỂU DIỄN & HÒA THANH)</option>
                              <option value="VOCAL">02 — THANH NHẠC (KỸ THUẬT & PHÒNG THU)</option>
                              <option value="GUITAR">03 — GUITAR (ACOUSTIC & ELECTRIC)</option>
                              <option value="MUSIC_PRODUCER">04 — MUSIC PRODUCER (SÁNG TẠO & HOÀN THIỆN TRACK)</option>
                              <option value="MIX_MASTER">05 — MIX & MASTER (CÂN BẰNG & PHÁT HÀNH THƯƠNG MẠI)</option>
                            </>
                          ) : (
                            <>
                              <option value="PIANO">01 — PIANO (PERFORMANCE & HARMONY)</option>
                              <option value="VOCAL">02 — VOCAL (TECHNIQUE & STUDIO DELIVERY)</option>
                              <option value="GUITAR">03 — GUITAR (ACOUSTIC & ELECTRIC)</option>
                              <option value="MUSIC_PRODUCER">04 — MUSIC PRODUCER (CREATIVE & FINISHED TRACK)</option>
                              <option value="MIX_MASTER">05 — MIX & MASTER (ACOUSTIC & RELEASE-READY)</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="academy-level-select" className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                          {lang === 'vi' ? 'TRÌNH ĐỘ HIỆN TẠI' : 'CURRENT EXPERIENCE'}
                        </label>
                        <select
                          id="academy-level-select"
                          name="level"
                          aria-label={lang === 'vi' ? 'Trình độ hiện tại' : 'Current experience'}
                          value={form.level}
                          onChange={(e) => setForm({ ...form, level: e.target.value })}
                          className="w-full bg-white border border-[#E5E5E5] p-2 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#7C3AED] rounded-sm transition-colors"
                        >
                          {lang === 'vi' ? (
                            <>
                              <option value="BEGINNER">CHƯA CÓ KINH NGHIỆM / MỚI BẮT ĐẦU</option>
                              <option value="INTERMEDIATE">CƠ BẢN / ĐÃ TỰ HỌC HOẶC TẬP LUYỆN</option>
                              <option value="ADVANCED">NÂNG CAO / MUỐN ĐỊNH HƯỚNG CHUYÊN NGHIỆP</option>
                            </>
                          ) : (
                            <>
                              <option value="BEGINNER">BEGINNER / NO PRIOR EXPERIENCE</option>
                              <option value="INTERMEDIATE">INTERMEDIATE / SOME PRACTICE</option>
                              <option value="ADVANCED">ADVANCED / PURSUING PROFESSIONAL CRAFT</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                          {lang === 'vi' ? 'MỤC TIÊU CỦA BẠN' : 'YOUR GOALS'}
                        </label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-transparent border-b border-[#D1D1D6] pb-2 text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#7C3AED] transition-colors resize-none"
                          placeholder={
                            lang === 'vi'
                              ? 'Ví dụ: định hướng sản xuất âm nhạc, chuẩn bị thi tuyển, thu âm sản phẩm cá nhân...'
                              : 'E.g., music production, performance preparation, original song release...'
                          }
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm hover:shadow-lg hover:shadow-[#7C3AED]/20"
                        >
                          <span>{lang === 'vi' ? 'GỬI YÊU CẦU TƯ VẤN' : 'SUBMIT CONSULTATION REQUEST'}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Minimal Footer */}
      <MinimalFooter />
    </div>
  );
}
