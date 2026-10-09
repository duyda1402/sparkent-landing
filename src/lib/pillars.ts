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
    subVi: 'HỌC HỎI & NỀN TẢNG',
    subEn: 'CRAFT & FOUNDATION',
    summaryVi: 'Piano, thanh nhạc, guitar, music producer, mix & master. Xây nền tảng bài bản cùng Spark Academy.',
    summaryEn: 'Piano, vocal, guitar, music production, mix & master. Build a solid foundation with Spark Academy.',
    leadVi: 'Mọi nghệ sĩ đều bắt đầu từ nền tảng. Tại Spark Academy, bạn học kỹ thuật và nhạc lý cùng những người đang làm nghề.',
    leadEn: 'Every artist starts with the fundamentals. At Spark Academy, you learn technique and theory from working musicians.',
    image: ASSETS.studioVocalBooth,
    imageAltVi: 'Phòng piano tại Spark',
    imageAltEn: 'The piano room at Spark',
    heroImage: ASSETS.studioVocalBooth,
    heroFocus: '50% 55%',
    facts: [
      { labelVi: 'DÀNH CHO', labelEn: 'FOR', valueVi: 'Người mới bắt đầu, ca sĩ, nhạc công, nhà sản xuất và nghệ sĩ độc lập.', valueEn: 'Beginners, singers, musicians, producers and independent artists.' },
      { labelVi: 'BỘ MÔN', labelEn: 'DISCIPLINES', valueVi: 'Piano, thanh nhạc, guitar, music producer, mix & master.', valueEn: 'Piano, vocal, guitar, music production, mix & master.' },
      { labelVi: 'HÌNH THỨC', labelEn: 'FORMAT', valueVi: 'Học kỹ thuật, thực hành tại phòng thu và rèn luyện biểu diễn.', valueEn: 'Technique, studio practice and performance training.' },
      { labelVi: 'LỘ TRÌNH', labelEn: 'PATHWAY', valueVi: 'Từ nền tảng đến sản xuất và biểu diễn thực tế.', valueEn: 'From fundamentals to real production and performance.' },
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
      { labelVi: 'DỊCH VỤ', labelEn: 'SERVICES', valueVi: 'Thu âm, sản xuất, mix & master, hình ảnh và MV.', valueEn: 'Recording, production, mix & master, visuals and music videos.' },
      { labelVi: 'THIẾT BỊ', labelEn: 'EQUIPMENT', valueVi: 'Signal path Neve, micro Neumann, vocal booth riêng.', valueEn: 'Neve signal path, Neumann microphones, dedicated vocal booth.' },
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

// LEARN: the five Academy disciplines (copy mirrors pages/Academy)
export interface Discipline {
  id: string;
  titleVi: string;
  titleEn: string;
  subVi: string;
  subEn: string;
  outcomesVi: string[];
  outcomesEn: string[];
  image: string;
  service: BookingServiceType;
}

export const LEARN_DISCIPLINES: Discipline[] = [
  {
    id: '01',
    titleVi: 'PIANO',
    titleEn: 'PIANO',
    subVi: 'Cổ điển và Jazz đương đại, hòa thanh và cảm thụ phím đàn.',
    subEn: 'Classical and contemporary jazz touch, harmonic voicing and performance posture.',
    outcomesVi: [
      'Kỹ thuật ngón, thị tấu và phản xạ hợp âm đương đại',
      'Cấu trúc hòa thanh ứng dụng trong sản xuất âm nhạc',
      'Thực hành biểu diễn và tương tác với ban nhạc trực tiếp',
    ],
    outcomesEn: [
      'Contemporary finger technique, sight reading and harmonic reflex',
      'Harmonic structures applied to modern music production',
      'Live performance dynamics and real band accompaniment',
    ],
    image: ASSETS.studioVocalBooth,
    service: 'piano',
  },
  {
    id: '02',
    titleVi: 'THANH NHẠC',
    titleEn: 'VOCAL',
    subVi: 'Giải phẫu thanh nhạc, kỹ thuật hơi thở, phong thái và bản sắc giọng.',
    subEn: 'Vocal anatomy, breath control, stage presence and a unique vocal identity.',
    outcomesVi: [
      'Làm chủ cột hơi, cao độ, mở rộng quãng giọng an toàn',
      'Xử lý ca từ và cảm xúc trong phòng thu chuyên nghiệp',
      'Định hình màu giọng đặc trưng của từng nghệ sĩ',
    ],
    outcomesEn: [
      'Breath support, pitch accuracy and safe range expansion',
      'Studio microphone delivery and emotional phrasing',
      'Shaping a distinct signature tone',
    ],
    image: ASSETS.studioMastering,
    service: 'vocal',
  },
  {
    id: '03',
    titleVi: 'GUITAR',
    titleEn: 'GUITAR',
    subVi: 'Acoustic và Electric Guitar, phong cách đệm hát và solo biểu diễn.',
    subEn: 'Acoustic and electric guitar, accompaniment styles and expressive soloing.',
    outcomesVi: [
      'Hệ thống gam, pentatonic, modal và rải ngón chuẩn xác',
      'Đệm hát đương đại, solo giai điệu và sáng tác riff',
      'Thu âm guitar mộc và guitar điện chuẩn studio',
    ],
    outcomesEn: [
      'Scale systems, chord melody voicings and articulate picking',
      'Contemporary rhythm backing, soloing and riff writing',
      'Acoustic and electric guitar tracking in professional rooms',
    ],
    // TODO: replace with a guitar photo when the client provides one
    image: ASSETS.projectIgnition,
    service: 'guitar',
  },
  {
    id: '04',
    titleVi: 'MUSIC PRODUCER',
    titleEn: 'MUSIC PRODUCER',
    subVi: 'Biến ý tưởng thành sản phẩm âm nhạc hoàn chỉnh: arrangement, sound selection và production.',
    subEn: 'Turn an idea into a complete production: arrangement, sound selection and production.',
    outcomesVi: [
      'Quy trình làm việc trên DAW chuyên nghiệp',
      'Cấu trúc arrangement, chọn âm sắc và thiết kế beat',
      'Thu âm nền tảng và hoàn thiện một finished track',
    ],
    outcomesEn: [
      'Production fundamentals and a professional DAW workflow',
      'Arrangement, sound selection and beat craft',
      'Recording fundamentals and a finished track',
    ],
    image: ASSETS.studioMain,
    service: 'producer',
  },
  {
    id: '05',
    titleVi: 'MIX & MASTER',
    titleEn: 'MIX & MASTER',
    subVi: 'Hoàn thiện âm thanh từ cân bằng, xử lý, không gian đến bản master sẵn sàng phát hành.',
    subEn: 'Finish your sound, from balance, processing and space to a release-ready master.',
    outcomesVi: [
      'EQ, compression, reverb và delay',
      'Vocal processing, chiều sâu không gian và trường âm stereo',
      'Kiểm soát dynamics và chuẩn hóa bản master',
    ],
    outcomesEn: [
      'EQ, compression, reverb and delay',
      'Vocal processing, spatial depth and stereo image',
      'Dynamics control and a release-ready master',
    ],
    image: ASSETS.studioAcoustic,
    service: 'mixmaster',
  },
];

// LEARN: the Academy method (copy mirrors pages/Academy)
export const LEARN_METHOD = [
  {
    titleVi: 'HỌC HỎI', titleEn: 'STUDY', tagVi: 'NỀN TẢNG KỸ NGHỆ', tagEn: 'TECHNICAL MASTERY',
    descVi: 'Xây dựng nền tảng nhạc lý, giải phẫu kỹ thuật và thói quen thực hành bền vững cùng các chuyên gia hàng đầu.',
    descEn: 'Build music theory, physical technique and sustainable practice habits, guided by active creators.',
  },
  {
    titleVi: 'SÁNG TẠO', titleEn: 'PRODUCE', tagVi: 'SÁNG TẠO THỰC CHIẾN', tagEn: 'REAL PRODUCTION',
    descVi: 'Áp dụng kiến thức trực tiếp vào sản xuất âm nhạc thực tế trong không gian phòng thu thương mại Spark Studio.',
    descEn: 'Apply what you learn straight away in real sessions inside Spark Studio’s commercial rooms.',
  },
  {
    titleVi: 'TRÌNH DIỄN', titleEn: 'PERFORM', tagVi: 'ĐỊNH HÌNH BẢN SẮC', tagEn: 'ARTISTIC IDENTITY',
    descVi: 'Phát triển sự tự tin biểu diễn, bản sắc nghệ sĩ và phong thái chuyên nghiệp trước công chúng và sân khấu.',
    descEn: 'Grow stage confidence, artistic identity and a professional presence in front of an audience.',
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
