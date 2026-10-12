// Content for the four intro pillars (LEARN / CREATE / DEVELOP / RELEASE)
// and their sub-pages at /about/:pillar.
// Facts summarize descriptions already used on these pages; prices, hours and terms are omitted.
// Note: ASSETS.studioVocalBooth shows a piano room and ASSETS.studioMastering shows a
// performer portrait, so captions below describe what the photos actually show.

import { ASSETS } from '@/lib/data';
import type { BookingServiceType } from '@/lib/BookingContext';

export type PillarSlug = 'learn' | 'create' | 'develop' | 'release';

export type PillarAction =
  | { kind: 'link'; href: string }
  | { kind: 'booking'; service?: BookingServiceType };

export interface PillarCta {
  labelVi: string;
  labelEn: string;
  action: PillarAction;
}

export interface PillarFact {
  labelVi: string;
  labelEn: string;
  valueVi: string;
  valueEn: string;
}

export interface PillarData {
  slug: PillarSlug;
  num: string;
  word: string;
  unit: string;
  subVi: string;
  subEn: string;
  summaryVi: string;
  summaryEn: string;
  leadTitle?: { vi: string; en: string };
  leadVi: string;
  leadEn: string;
  /** Thumbnail in the home intro accordion */
  image: string;
  imageAltVi: string;
  imageAltEn: string;
  /** Full-bleed photo behind the sub-page hero */
  heroImage: string;
  /** CSS object-position for the hero photo */
  heroFocus: string;
  facts: PillarFact[];
  primaryCta: PillarCta;
  secondaryCta: PillarCta;
  closing: {
    titleVi: [string, string];
    titleEn: [string, string];
    bodyVi: string;
    bodyEn: string;
    primary: PillarCta;
    secondary: PillarCta;
  };
}

const ACADEMY_LINK: PillarCta = { labelVi: 'XEM SPARK ACADEMY', labelEn: 'EXPLORE ACADEMY', action: { kind: 'link', href: '/academy' } };
const TRIAL_BOOKING: PillarCta = { labelVi: 'ĐĂNG KÝ HỌC THỬ', labelEn: 'BOOK A TRIAL LESSON', action: { kind: 'booking' } };
const STUDIO_BOOKING: PillarCta = { labelVi: 'ĐẶT LỊCH PHÒNG THU ↗', labelEn: 'BOOK A RECORDING SESSION ↗', action: { kind: 'booking', service: 'recording' } };
const AUDITION_BOOKING: PillarCta = { labelVi: 'ĐẶT LỊCH THỬ GIỌNG ↗', labelEn: 'BOOK VOICE AUDITION ↗', action: { kind: 'booking', service: 'vocal' } };
const WORKS_LINK: PillarCta = { labelVi: 'XEM DỰ ÁN', labelEn: 'VIEW WORKS', action: { kind: 'link', href: '/#works' } };
const ARTISTS_LINK: PillarCta = { labelVi: 'XEM NGHỆ SĨ', labelEn: 'VIEW ARTISTS', action: { kind: 'link', href: '/#artists' } };
const RELEASE_CONTACT: PillarCta = { labelVi: 'LIÊN HỆ PHÁT HÀNH', labelEn: 'DISCUSS A RELEASE', action: { kind: 'link', href: '/#contact' } };

export const PILLARS: PillarData[] = [
  {
    slug: 'learn',
    num: '01',
    word: 'LEARN',
    unit: 'SPARK ACADEMY',
    subVi: 'XÂY DỰNG NỀN TẢNG ÂM NHẠC',
    subEn: 'BUILD YOUR MUSICAL FOUNDATION',
    summaryVi: 'Piano, thanh nhạc, guitar, music producer, mix & master. Xây nền tảng bài bản cùng Spark Academy.',
    summaryEn: 'Piano, vocal, guitar, music production, mix & master. Build a solid foundation with Spark Academy.',
    leadTitle: {
      vi: 'HỌC NHẠC BÀI BẢN. PHÁT TRIỂN CHẤT RIÊNG.',
      en: 'LEARN MUSIC WITH A SOLID FOUNDATION. DEVELOP YOUR OWN SOUND.',
    },
    leadVi: 'Từ Piano, Thanh nhạc đến Music Production và Mixing & Mastering, Spark Academy giúp bạn phát triển kỹ năng âm nhạc qua lộ trình học tập bài bản, thực hành trực tiếp và định hướng phù hợp với mục tiêu của mình.',
    leadEn: 'From Piano and Vocal Training to Music Production and Mixing & Mastering, Spark Academy helps you develop your musical skills through a structured learning path, hands-on practice and guidance tailored to your goals.',
    image: ASSETS.studioVocalBooth,
    imageAltVi: 'Phòng piano tại Spark',
    imageAltEn: 'The piano room at Spark',
    heroImage: ASSETS.studioVocalBooth,
    heroFocus: '50% 55%',
    facts: [
      { labelVi: 'DÀNH CHO', labelEn: 'FOR', valueVi: 'Mọi lứa tuổi, từ người yêu âm nhạc đến nghệ sĩ theo đuổi con đường chuyên nghiệp.', valueEn: 'All ages, from music lovers to artists pursuing a professional career.' },
      { labelVi: 'BỘ MÔN', labelEn: 'DISCIPLINES', valueVi: 'Piano, Thanh nhạc, Guitar, Music Production, Mixing & Mastering.', valueEn: 'Piano, Vocal Training, Guitar, Music Production, Mixing & Mastering.' },
      { labelVi: 'HÌNH THỨC', labelEn: 'FORMAT', valueVi: 'Đào tạo trong môi trường chuyên nghiệp', valueEn: 'Training in a professional environment' },
      { labelVi: 'LỘ TRÌNH', labelEn: 'PATHWAY', valueVi: 'Học phù hợp với từng trình độ, từ làm quen với âm nhạc đến rèn luyện chuyên sâu và thực hành thực tế.', valueEn: 'Learning tailored to each level, from an introduction to music to advanced training and hands-on practice.' },
    ],
    primaryCta: ACADEMY_LINK,
    secondaryCta: TRIAL_BOOKING,
    closing: {
      titleVi: ['SẴN SÀNG', 'BẮT ĐẦU?'],
      titleEn: ['READY', 'TO BEGIN?'],
      bodyVi: 'Chọn bộ môn bạn quan tâm và đăng ký một buổi học thử cùng Spark Academy.',
      bodyEn: 'Pick the discipline you care about and book a trial lesson with Spark Academy.',
      primary: TRIAL_BOOKING,
      secondary: ACADEMY_LINK,
    },
  },
  {
    slug: 'create',
    num: '02',
    word: 'CREATE',
    unit: 'SPARK STUDIO',
    subVi: 'SÁNG TẠO & SẢN XUẤT',
    subEn: 'PRODUCTION & RECORDING',
    summaryVi: 'Biến ý tưởng thành bản thu hoàn chỉnh tại Spark Studio: thu âm, sản xuất, mix & master và hình ảnh.',
    summaryEn: 'Turn ideas into finished records at Spark Studio: recording, production, mix & master and visuals.',
    leadVi: 'Từ giai điệu phác thảo đến bản thu chuẩn thương mại. Spark Studio đồng hành cùng bạn qua từng bước sản xuất.',
    leadEn: 'From a rough melody to a commercial-grade record. Spark Studio works with you through every step of production.',
    image: ASSETS.studioMain,
    imageAltVi: 'Phòng sản xuất Spark Studio',
    imageAltEn: 'Spark Studio production room',
    heroImage: ASSETS.studioMain,
    heroFocus: '50% 45%',
    facts: [
      { labelVi: 'DỊCH VỤ', labelEn: 'SERVICES', valueVi: 'Sáng tác, thu âm, sản xuất âm nhạc, mixing & mastering, sản xuất MV và nội dung hình ảnh.', valueEn: 'Songwriting, recording, music production, mixing & mastering, music video production and visual content.' },
      { labelVi: 'THIẾT BỊ', labelEn: 'EQUIPMENT', valueVi: 'Hệ thống thiết bị thu âm, xử lý tín hiệu analog và kiểm âm chuyên nghiệp, với những thiết bị tiêu biểu từ Neumann, Manley, Neve, Universal Audio, Tube-Tech và Genelec — phục vụ toàn bộ quy trình sản xuất âm nhạc tại Spark Studio.', valueEn: 'Professional recording, analog signal processing and monitoring systems, featuring equipment from Neumann, Manley, Neve, Universal Audio, Tube-Tech and Genelec — supporting the entire music production workflow at Spark Studio.' },
      { labelVi: 'QUY TRÌNH', labelEn: 'PROCESS', valueVi: 'Từ ý tưởng, sản xuất và thu âm đến mix & master.', valueEn: 'From idea and production through recording, mix and master.' },
      { labelVi: 'HÌNH ẢNH', labelEn: 'VISUALS', valueVi: 'MV, visualizer và hình ảnh truyền thông.', valueEn: 'Music videos, visualizers and promotional imagery.' },
    ],
    primaryCta: STUDIO_BOOKING,
    secondaryCta: WORKS_LINK,
    closing: {
      titleVi: ['SẴN SÀNG VÀO', 'PHÒNG THU?'],
      titleEn: ['READY FOR', 'THE STUDIO?'],
      bodyVi: 'Chọn dịch vụ, khung giờ và gửi yêu cầu. Spark sẽ liên hệ xác nhận lịch với bạn.',
      bodyEn: 'Pick a service and time slot and send your request. Spark will get in touch to confirm.',
      primary: STUDIO_BOOKING,
      secondary: WORKS_LINK,
    },
  },
  {
    slug: 'develop',
    num: '03',
    word: 'DEVELOP',
    unit: 'SPARK LABEL',
    subVi: 'PHÁT TRIỂN NGHỆ SĨ',
    subEn: 'TALENT & ARTISTRY',
    summaryVi: 'Định hình bản sắc, phong cách và bản lĩnh sân khấu cùng chương trình phát triển nghệ sĩ của Spark Label.',
    summaryEn: 'Shape your identity, style and stage presence through Spark Label’s artist development programme.',
    leadVi: 'Bệ phóng cho nghệ sĩ trẻ dám bước xa hơn. Spark Label giúp bạn định hình phong cách và xây dựng sự nghiệp dài lâu.',
    leadEn: 'A launchpad for young artists ready to go further. Spark Label helps you define your style and build a lasting career.',
    image: ASSETS.studioMastering,
    imageAltVi: 'Nghệ sĩ biểu diễn dưới ánh đèn sân khấu',
    imageAltEn: 'A performer under stage lights',
    heroImage: ASSETS.studioMastering,
    heroFocus: '62% 30%',
    facts: [
      { labelVi: 'DÀNH CHO', labelEn: 'FOR', valueVi: 'Ca sĩ, nhạc sĩ và nghệ sĩ độc lập muốn đi đường dài.', valueEn: 'Singers, songwriters and independent artists in it for the long run.' },
      { labelVi: 'TUYỂN CHỌN', labelEn: 'SELECTION', valueVi: 'Qua buổi thử giọng tại Spark.', valueEn: 'Through an audition at Spark.' },
      { labelVi: 'ĐÀO TẠO', labelEn: 'TRAINING', valueVi: 'Thanh nhạc, sáng tác và biểu diễn tại Spark Academy.', valueEn: 'Vocals, songwriting and performance at Spark Academy.' },
      { labelVi: 'ĐỊNH HƯỚNG', labelEn: 'PATHWAY', valueVi: 'Định hình bản sắc, phát hành và xây dựng sự nghiệp dài lâu.', valueEn: 'Shape an identity, release music and build a lasting career.' },
    ],
    primaryCta: AUDITION_BOOKING,
    secondaryCta: ARTISTS_LINK,
    closing: {
      titleVi: ['THỬ GIỌNG', 'CÙNG SPARK.'],
      titleEn: ['AUDITION', 'WITH SPARK.'],
      bodyVi: 'Gửi một bản thu giọng hát qua form đặt lịch. Đội ngũ Spark sẽ nghe và phản hồi bạn.',
      bodyEn: 'Send a voice recording through the booking form. The Spark team will listen and get back to you.',
      primary: AUDITION_BOOKING,
      secondary: ARTISTS_LINK,
    },
  },
  {
    slug: 'release',
    num: '04',
    word: 'RELEASE',
    unit: 'SPARK LABEL',
    subVi: 'PHÁT HÀNH TOÀN CẦU',
    subEn: 'GLOBAL DISTRIBUTION',
    summaryVi: 'Phát hành nhạc số toàn cầu, xây dựng chiến dịch ra mắt và một sự nghiệp âm nhạc dài lâu.',
    summaryEn: 'Release music worldwide, plan launch campaigns and build a lasting music career.',
    leadVi: 'Đưa âm nhạc của bạn đến khán giả trong và ngoài nước, với chiến lược phát hành nhạc số bài bản.',
    leadEn: 'Take your music to listeners at home and abroad with a structured digital release strategy.',
    image: ASSETS.projectNeon,
    imageAltVi: 'Dự án Neon Horizons',
    imageAltEn: 'The Neon Horizons project',
    heroImage: ASSETS.projectNeon,
    heroFocus: '50% 50%',
    facts: [
      { labelVi: 'HỖ TRỢ', labelEn: 'SUPPORT', valueVi: 'Kế hoạch ra mắt, MV và truyền thông.', valueEn: 'Launch planning, music videos and promotion.' },
      { labelVi: 'PHÂN PHỐI', labelEn: 'DISTRIBUTION', valueVi: 'Phát hành trên các nền tảng nhạc số.', valueEn: 'Release across digital music platforms.' },
      { labelVi: 'LỘ TRÌNH', labelEn: 'PATHWAY', valueVi: 'Đồng hành trước, trong và sau ngày ra mắt.', valueEn: 'Support before, during and after release day.' },
      { labelVi: 'SỐ LIỆU', labelEn: 'ANALYTICS', valueVi: 'Theo dõi số liệu nghe và khán giả.', valueEn: 'Track listening and audience analytics.' },
    ],
    primaryCta: RELEASE_CONTACT,
    secondaryCta: WORKS_LINK,
    closing: {
      titleVi: ['CÓ BẢN NHẠC', 'SẴN SÀNG RA MẮT?'],
      titleEn: ['GOT A TRACK', 'READY TO RELEASE?'],
      bodyVi: 'Kể cho Spark về dự án của bạn. Đội ngũ Spark Label sẽ liên hệ để trao đổi kế hoạch phát hành.',
      bodyEn: 'Tell Spark about your project. The Spark Label team will get in touch to plan the release.',
      primary: RELEASE_CONTACT,
      secondary: WORKS_LINK,
    },
  },
];

export const getPillar = (slug?: string): PillarData | undefined =>
  PILLARS.find((p) => p.slug === slug);

export const pillarPath = (slug: PillarSlug) => `/about/${slug}`;

// LEARN: four Academy categories, with Piano and Guitar grouped as Instruments.
export interface Discipline {
  id: string;
  titleVi: string;
  titleEn: string;
  subVi: string;
  subEn: string;
  outcomesVi: string[];
  outcomesEn: string[];
  image: string;
  service?: BookingServiceType;
}

export const LEARN_DISCIPLINES: Discipline[] = [
  {
    id: '01',
    titleVi: 'NHẠC CỤ',
    titleEn: 'INSTRUMENTS',
    subVi: 'Học Piano, Guitar và phát triển tư duy âm nhạc trong môi trường đào tạo chuyên nghiệp, với hệ thống nhạc cụ và thiết bị chất lượng cao.',
    subEn: 'Learn Piano and Guitar and develop your musical thinking in a professional training environment with high-quality instruments and equipment.',
    outcomesVi: [
      'Piano, Acoustic Guitar và Electric Guitar',
      'Hệ thống nhạc cụ và thiết bị âm thanh cao cấp phục vụ học tập, luyện tập và biểu diễn',
      'Phát triển kỹ thuật, cảm âm, nhịp điệu và khả năng biểu diễn',
      'Thực hành trong môi trường studio, kết nối với sáng tạo và sản xuất âm nhạc',
    ],
    outcomesEn: [
      'Piano, Acoustic Guitar and Electric Guitar',
      'Premium instruments and audio equipment for learning, practice and performance',
      'Develop technique, aural skills, rhythm and performance ability',
      'Hands-on studio practice connected to creativity and music production',
    ],
    image: ASSETS.studioVocalBooth,
  },
  {
    id: '02',
    titleVi: 'THANH NHẠC',
    titleEn: 'VOCAL',
    subVi: 'Phát triển kỹ thuật thanh nhạc, làm chủ giọng hát và định hình màu sắc riêng qua lộ trình đào tạo bài bản và kết hợp thực hành',
    subEn: 'Develop vocal technique, master your voice and shape your unique vocal character through structured training combined with hands-on practice.',
    outcomesVi: [
      'Làm chủ hơi thở, cao độ, cộng hưởng và mở rộng quãng giọng',
      'Phát triển màu sắc giọng hát, khả năng xử lý ca từ và biểu đạt cảm xúc',
      'Thực hành thu vocal với hệ thống micro, thiết bị âm thanh và không gian studio chuyên nghiệp',
      'Rèn luyện kỹ năng biểu diễn và ứng dụng thanh nhạc vào sản phẩm âm nhạc thực tế',
    ],
    outcomesEn: [
      'Master breath control, pitch and resonance, and expand your vocal range',
      'Develop your vocal character, lyrical phrasing and emotional expression',
      'Practice vocal recording with professional microphones, audio equipment and studio spaces',
      'Build performance skills and apply vocal techniques to real music projects',
    ],
    image: ASSETS.studioMastering,
    service: 'vocal',
  },
  {
    id: '03',
    titleVi: 'MUSIC PRODUCTION',
    titleEn: 'MUSIC PRODUCTION',
    subVi: 'Phát triển ý tưởng thành sản phẩm âm nhạc hoàn chỉnh thông qua phối khí, thiết kế âm thanh và thực hành sản xuất trên hệ thống thiết bị chuyên nghiệp.',
    subEn: 'Develop ideas into complete music productions through arrangement, sound design and hands-on production with professional equipment.',
    outcomesVi: [
      'Làm chủ DAW, MIDI, nhạc cụ ảo và quy trình sản xuất âm nhạc',
      'Phát triển ý tưởng, phối khí và thiết kế beat',
      'Lựa chọn âm sắc, xây dựng cấu trúc và phát triển bản phối',
      'Thực hành trên hệ thống studio chuyên nghiệp, hoàn thiện sản phẩm âm nhạc thực tế',
    ],
    outcomesEn: [
      'Master DAWs, MIDI, virtual instruments and the music production workflow',
      'Develop ideas, arrangements and beats',
      'Select sounds, build song structures and develop arrangements',
      'Practice with a professional studio setup and complete real music productions',
    ],
    image: ASSETS.studioMain,
    service: 'producer',
  },
  {
    id: '04',
    titleVi: 'MIXING & MASTERING',
    titleEn: 'MIXING & MASTERING',
    subVi: 'Làm chủ quy trình mixing và mastering, từ cân bằng âm thanh, định hình không gian đến hoàn thiện bản thu với chất lượng chuyên nghiệp trên hệ thống thiết bị studio cao cấp.',
    subEn: 'Master the mixing and mastering workflow, from balancing sound and shaping space to finishing professional-quality recordings with premium studio equipment.',
    outcomesVi: [
      'Làm chủ EQ, compression, reverb, delay, automation và các công cụ xử lý âm thanh',
      'Xử lý vocal, cân bằng nhạc cụ và xây dựng chiều sâu, không gian stereo',
      'Kiểm soát dynamics, cân bằng tonal và tối ưu loudness cho bản master',
      'Thực hành trên hệ thống monitoring và thiết bị xử lý âm thanh chuyên nghiệp, hoàn thiện sản phẩm theo yêu cầu phát hành',
    ],
    outcomesEn: [
      'Master EQ, compression, reverb, delay, automation and audio processing tools',
      'Process vocals, balance instruments and build depth and stereo space',
      'Control dynamics, balance tone and optimize loudness for the master',
      'Practice with professional monitoring systems and audio processing equipment to finish productions that meet release requirements',
    ],
    image: ASSETS.studioAcoustic,
    service: 'mixmaster',
  },
];

// LEARN: the four stages of the Academy learning journey.
export const LEARN_METHOD = [
  {
    titleVi: 'HỌC HỎI', titleEn: 'LEARN', tagVi: 'BUILD YOUR FOUNDATION', tagEn: 'BUILD YOUR FOUNDATION',
    descVi: 'Xây dựng nền tảng nhạc lý, kỹ thuật và tư duy âm nhạc với lộ trình phù hợp cùng sự hướng dẫn chuyên môn.',
    descEn: 'Build a foundation in music theory, technique and musical thinking through a suitable learning path and expert guidance.',
  },
  {
    titleVi: 'THỰC HÀNH', titleEn: 'PRACTICE', tagVi: 'PRACTICE IN STUDIO', tagEn: 'PRACTICE IN STUDIO',
    descVi: 'Rèn luyện kỹ năng với nhạc cụ, thiết bị âm thanh và hệ thống studio chuyên nghiệp, gắn với quy trình làm việc thực tế.',
    descEn: 'Develop your skills with instruments, audio equipment and professional studio systems through real-world workflows.',
  },
  {
    titleVi: 'SÁNG TẠO', titleEn: 'CREATE', tagVi: 'CREATE YOUR WORK', tagEn: 'CREATE YOUR WORK',
    descVi: 'Ứng dụng kiến thức để tạo ra sản phẩm âm nhạc, phát triển kỹ năng biểu diễn hoặc hoàn thiện dự án cá nhân.',
    descEn: 'Apply your knowledge to create music, develop performance skills or complete a personal project.',
  },
  {
    titleVi: 'PHÁT TRIỂN', titleEn: 'GROW', tagVi: 'GROW YOUR OWN WAY', tagEn: 'GROW YOUR OWN WAY',
    descVi: 'Tiếp tục nâng cao chuyên môn, định hình bản sắc và lựa chọn hướng đi phù hợp — từ đam mê cá nhân đến con đường nghệ sĩ chuyên nghiệp.',
    descEn: 'Continue developing your expertise, shaping your identity and choosing the right path — from a personal passion to a professional career as an artist.',
  },
];

// CREATE: production steps and studio rooms
export const CREATE_STEPS = [
  { titleVi: 'Ý TƯỞNG', titleEn: 'IDEA', descVi: 'Nghe demo, trao đổi và thống nhất định hướng âm nhạc cho dự án.', descEn: 'We listen to your demo, talk it through and agree on a musical direction.' },
  { titleVi: 'SẢN XUẤT', titleEn: 'PRODUCTION', descVi: 'Phối khí, chọn âm sắc và dựng bản beat cùng producer.', descEn: 'Arrangement, sound selection and a finished beat with a producer.' },
  { titleVi: 'THU ÂM', titleEn: 'RECORDING', descVi: 'Thu giọng và nhạc cụ trong vocal booth và phòng thu chính.', descEn: 'Vocals and instruments tracked in the vocal booth and main room.' },
  { titleVi: 'MIX & MASTER', titleEn: 'MIX & MASTER', descVi: 'Cân bằng, xử lý không gian và hoàn thiện bản master sẵn sàng phát hành.', descEn: 'Balance, space and a final master ready for release.' },
  { titleVi: 'HÌNH ẢNH', titleEn: 'VISUALS', descVi: 'MV, visualizer và hình ảnh truyền thông cùng đội ngũ media của Spark.', descEn: 'Music videos, visualizers and promo visuals with Spark’s media team.' },
];

export const CREATE_SPACES = [
  { nameVi: 'PHÒNG THU', nameEn: 'RECORDING ROOM', noteVi: 'Bàn mixer, signal path Neve, micro Neumann', noteEn: 'Mixing console, Neve signal path, Neumann microphones', image: ASSETS.studioAcoustic },
  { nameVi: 'PHÒNG PIANO', nameEn: 'PIANO ROOM', noteVi: 'Đàn grand piano', noteEn: 'Grand piano', image: ASSETS.studioVocalBooth },
];

// DEVELOP: artist pathway
export const DEVELOP_STAGES = [
  { titleVi: 'BẢN SẮC', titleEn: 'IDENTITY', descVi: 'Tìm ra chất giọng, phong cách và câu chuyện riêng qua các buổi làm việc cùng đội ngũ Spark.', descEn: 'Find your voice, style and story through working sessions with the Spark team.', tagsVi: 'ĐỊNH VỊ PHONG CÁCH  /  HÌNH ẢNH NGHỆ SĨ', tagsEn: 'POSITIONING  /  ARTIST IMAGE' },
  { titleVi: 'ĐÀO TẠO', titleEn: 'TRAINING', descVi: 'Rèn kỹ năng thanh nhạc, sáng tác và biểu diễn với lộ trình riêng tại Spark Academy.', descEn: 'Build vocal, songwriting and performance skills on a personal plan at Spark Academy.', tagsVi: 'THANH NHẠC  /  SÁNG TÁC  /  SÂN KHẤU', tagsEn: 'VOCAL  /  SONGWRITING  /  STAGE' },
  { titleVi: 'PHÁT HÀNH', titleEn: 'RELEASE', descVi: 'Sản xuất sản phẩm đầu tay tại Spark Studio và lên chiến lược ra mắt nhạc số.', descEn: 'Produce your debut at Spark Studio and plan a digital launch strategy.', tagsVi: 'SINGLE / EP  /  MV', tagsEn: 'SINGLE / EP  /  MV' },
  { titleVi: 'SỰ NGHIỆP', titleEn: 'CAREER', descVi: 'Xây dựng khán giả, biểu diễn và phát triển sự nghiệp âm nhạc dài lâu cùng Spark.', descEn: 'Grow an audience, perform live and build a lasting music career with Spark.', tagsVi: 'BIỂU DIỄN  /  TRUYỀN THÔNG', tagsEn: 'LIVE  /  PROMOTION' },
];

// RELEASE: release phases
export const RELEASE_PHASES = [
  {
    labelVi: 'GIAI ĐOẠN 1', labelEn: 'PHASE 1', titleVi: 'TRƯỚC PHÁT HÀNH', titleEn: 'BEFORE RELEASE',
    itemsVi: ['Hoàn thiện bản master và thông tin bài hát', 'Đăng ký bản quyền tác phẩm', 'Lên kế hoạch hình ảnh và truyền thông'],
    itemsEn: ['Final master and track metadata', 'Copyright registration', 'Visual and promotion plan'],
  },
  {
    labelVi: 'GIAI ĐOẠN 2', labelEn: 'PHASE 2', titleVi: 'NGÀY RA MẮT', titleEn: 'RELEASE DAY',
    itemsVi: ['Phát hành đồng loạt trên các nền tảng nhạc số', 'Ra mắt MV hoặc visualizer', 'Truyền thông trên mạng xã hội và báo chí'],
    itemsEn: ['Simultaneous release on digital platforms', 'Music video or visualizer premiere', 'Social and press promotion'],
  },
  {
    labelVi: 'GIAI ĐOẠN 3', labelEn: 'PHASE 3', titleVi: 'SAU PHÁT HÀNH', titleEn: 'AFTER RELEASE',
    itemsVi: ['Theo dõi số liệu nghe và khán giả', 'Biểu diễn và quảng bá', 'Chuẩn bị cho bản phát hành tiếp theo'],
    itemsEn: ['Listening and audience analytics', 'Live shows and promotion', 'Preparing the next release'],
  },
];
