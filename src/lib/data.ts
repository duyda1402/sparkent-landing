// Central verified data repository for Spark Entertainment
// Real brand assets, neutral aesthetic fallbacks, artists, and case study records

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  cat: 'MUSIC' | 'MUSIC VIDEO' | 'COMMERCIAL' | 'EVENT' | 'MEDIA';
  year: string;
  client: string;
  desc: string;
  cover: string;
  concept: string;
  creativeDirection: string;
  production: string;
  result: string;
  videoPlaceholder: string;
  gallery: string[];
  credits: { role: string; name: string }[];
}

export interface ArtistData {
  id: string;
  slug: string;
  name: string;
  role: string;
  genre: string;
  releasesCount: string;
  latestRelease: {
    title: string;
    type: string;
    year: string;
    duration: string;
  };
  portrait: string;
  bio: string[];
  discography: { title: string; year: string; type: string; streams?: string }[];
  socials: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    instagram?: string;
  };
  featuredVideos: { title: string; year: string; views?: string }[];
  gallery: string[];
}

// Verified photography & neutral dark-cinematic imagery with fallback guarantee
export const ASSETS = {
  logo: '/spark-logo-dark.png',
  logoDark: '/spark-logo-dark.png',
  logoLight: '/spark-logo-master.png',
  heroVideo: 'https://cdn.wegic.ai/assets/onepage/agent/videos/1782610166837.webm',
  
  // Real studio spaces
  studioMain: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597064344_0.jpg?imageMogr2/format/webp',
  studioVocalBooth: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597069149_0.jpg?imageMogr2/format/webp',
  studioSuite: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597064346_0.jpg?imageMogr2/format/webp',
  studioMastering: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597064847_0.jpg?imageMogr2/format/webp',
  studioAcoustic: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597064345_0.jpg?imageMogr2/format/webp',
  
  // Artist portraits
  artistMinh: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597082990_0.jpg?imageMogr2/format/webp',
  artistLyra: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597086817_0.jpg?imageMogr2/format/webp',
  
  // Project covers
  projectNeon: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597081789_0.jpg?imageMogr2/format/webp',
  projectIgnition: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597081688_0.jpg?imageMogr2/format/webp',
  projectCity: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597081905_0.jpg?imageMogr2/format/webp',
  projectWave: 'https://cdn.wegic.ai/assets/onepage/agent/images/1782597082004_0.jpg?imageMogr2/format/webp',
};

export const ARTISTS_DATA: ArtistData[] = [
  {
    id: 'minh',
    slug: 'minh',
    name: 'MINH',
    role: 'PRODUCER / ARTIST',
    genre: 'R&B · NEO-SOUL',
    releasesCount: '6 RELEASES',
    portrait: ASSETS.artistMinh,
    latestRelease: {
      title: 'SILENT SHADOWS',
      type: 'Single',
      year: '2026',
      duration: '3:42',
    },
    bio: [
      'MINH is a multi-instrumentalist producer and recording artist at the forefront of Vietnam’s new R&B and contemporary soul sound. Trained in acoustic theory and analog tape recording, his arrangements fuse organic warmth with surgical electronic micro-textures.',
      'Under Spark Label, MINH serves both as a lead recording artist and as an executive vocal arranger for collaborative studio residencies, establishing sonic benchmarks for the label’s international pipeline.',
    ],
    discography: [
      { title: 'SILENT SHADOWS', year: '2026', type: 'Single' },
      { title: 'MIDNIGHT MONOLITH', year: '2025', type: 'EP' },
      { title: 'AFTER THE RAIN', year: '2025', type: 'Single' },
      { title: 'RESONANCE 01', year: '2024', type: 'Album' },
      { title: 'SLOW VELOCITY', year: '2024', type: 'Single' },
      { title: 'ECHO CHAMBER', year: '2024', type: 'EP' },
    ],
    socials: {
      spotify: 'https://spotify.com',
      appleMusic: 'https://music.apple.com',
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
    },
    featuredVideos: [
      { title: 'SILENT SHADOWS (Official Cinematic Visualizer)', year: '2026' },
      { title: 'SPARK STUDIO SESSIONS: MINH LIVE AT CONTROL ROOM A', year: '2025' },
    ],
    gallery: [
      ASSETS.artistMinh,
      ASSETS.studioVocalBooth,
      ASSETS.studioMain,
    ],
  },
  {
    id: 'lyra',
    slug: 'lyra',
    name: 'LYRA',
    role: 'VOCALIST / SONGWRITER',
    genre: 'POP · ELECTRONIC',
    releasesCount: '4 RELEASES',
    portrait: ASSETS.artistLyra,
    latestRelease: {
      title: 'NEON HORIZONS',
      type: 'Single & MV',
      year: '2026',
      duration: '3:18',
    },
    bio: [
      'LYRA synthesizes classical vocal training with hyper-focused pop songcraft and atmospheric electronica. Her dynamic vocal range spans intimate breath tones to soaring cinematic anthems with unmistakable precision.',
      'Developed through the Spark Label talent incubator, LYRA’s creative direction represents the international aspirations of modern Vietnamese songwriting — bilingual, emotionally resonant, and visually unapologetic.',
    ],
    discography: [
      { title: 'NEON HORIZONS', year: '2026', type: 'Single' },
      { title: 'VELVET SKYLINE', year: '2025', type: 'Single' },
      { title: 'PRISM', year: '2025', type: 'EP' },
      { title: 'LUMINOUS', year: '2024', type: 'Single' },
    ],
    socials: {
      spotify: 'https://spotify.com',
      appleMusic: 'https://music.apple.com',
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
    },
    featuredVideos: [
      { title: 'NEON HORIZONS (Official 4K Music Video)', year: '2026' },
      { title: 'ACOUSTIC REIMAGINED: LIVE AT SPARK GRAND PIANO', year: '2025' },
    ],
    gallery: [
      ASSETS.artistLyra,
      ASSETS.projectNeon,
      ASSETS.studioAcoustic,
    ],
  },
];

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'neon-horizons',
    slug: 'neon-horizons',
    title: 'NEON HORIZONS',
    cat: 'MUSIC VIDEO',
    year: '2026',
    client: 'SPARK LABEL / LYRA',
    desc: 'Cinematic music video directed in-house, exploring nocturnal Saigon through 35mm anamorphic lenses and dynamic purple hues.',
    cover: ASSETS.projectNeon,
    concept: 'A visual meditation on isolation in hyper-connected urban landscapes, contrasting raw vocal presence with architectural scale.',
    creativeDirection: 'Shot on Arri Alexa Mini with vintage anamorphic glass. Low-key lighting anchored by deep charcoal blacks and subtle Spark purple neon accents.',
    production: 'Coordinated between Spark Studio A for spatial audio mix and Spark Media on-location filming units over 5 nights in District 1.',
    result: 'Premiered across international streaming platforms with 2M views within 72 hours and critical acclaim for cinematography.',
    videoPlaceholder: 'https://cdn.wegic.ai/assets/onepage/agent/videos/1782610166837.webm',
    gallery: [
      ASSETS.projectNeon,
      ASSETS.artistLyra,
      ASSETS.studioMain,
    ],
    credits: [
      { role: 'Creative Direction', name: 'Spark Media Group' },
      { role: 'Artist', name: 'LYRA' },
      { role: 'Audio Mix & Master', name: 'Spark Monolith Studio' },
      { role: 'Director of Photography', name: 'Spark Cinema Unit' },
    ],
  },
  {
    id: 'city-of-stars',
    slug: 'city-of-stars',
    title: 'CITY OF STARS',
    cat: 'COMMERCIAL',
    year: '2025',
    client: 'LUXURY AUTOMOTIVE PARTNER',
    desc: '360° sonic and visual branding campaign blending bespoke electronic sound design with minimalist architectural cinematography.',
    cover: ASSETS.projectCity,
    concept: 'Designing the sonic signature of electric luxury — silence, velocity, and resonance.',
    creativeDirection: 'Minimalist industrial interiors, dark metal surfaces, and precision soundscapes recorded in Spark anechoic isolation suites.',
    production: 'Produced by Spark Media with original score and sound mixing completed at Spark Studio A in Dolby Atmos.',
    result: 'Broadcast across Southeast Asian flagship showcases and international luxury design summits.',
    videoPlaceholder: 'https://cdn.wegic.ai/assets/onepage/agent/videos/1782610166837.webm',
    gallery: [
      ASSETS.projectCity,
      ASSETS.studioAcoustic,
      ASSETS.studioMastering,
    ],
    credits: [
      { role: 'Executive Producer', name: 'Spark Commercial Studio' },
      { role: 'Sound Design', name: 'MINH' },
      { role: 'Color Grading', name: 'Spark Media Post' },
    ],
  },
  {
    id: 'infinite-wave',
    slug: 'infinite-wave',
    title: 'INFINITE WAVE',
    cat: 'MUSIC',
    year: '2024',
    client: 'SPARK LABEL',
    desc: 'Debut compilation album and visual identity program establishing Spark Label’s sonic and editorial DNA internationally.',
    cover: ASSETS.projectWave,
    concept: 'Capturing the restless energy of Vietnam’s emerging creative vanguard within an uncompromising luxury production standard.',
    creativeDirection: 'Tactile typography, bespoke wave crest iconography, and uncompressed analog recording passes through vintage tube consoles.',
    production: 'Full album tracked, mixed, and mastered exclusively at Spark Monolith Studio across a 9-month studio residency.',
    result: 'Streamed across 48 countries, featured on premier global editorial playlists, and certified as the definitive sound of modern Saigon.',
    videoPlaceholder: 'https://cdn.wegic.ai/assets/onepage/agent/videos/1782610166837.webm',
    gallery: [
      ASSETS.projectWave,
      ASSETS.studioVocalBooth,
      ASSETS.studioSuite,
    ],
    credits: [
      { role: 'Executive Producer', name: 'Spark Label' },
      { role: 'Mastering Engineer', name: 'Spark Studio A' },
      { role: 'Visual Packaging', name: 'Spark Creative Direction' },
    ],
  },
];
