import microphone from '@/assets/equipment/neumann-m149.webp';
import preamp from '@/assets/equipment/manley-voxbox.webp';
import interfaceImage from '@/assets/equipment/apollo-x8.webp';
import dynamics from '@/assets/equipment/ua-1176.webp';
import equalizer from '@/assets/equipment/tube-tech-pe1c.webp';
import monitors from '@/assets/equipment/genelec-8050b-transparent.png';
import headphones from '@/assets/equipment/dt1990-pro.webp';
import workstation from '@/assets/equipment/mac-studio.webp';

// Product reference photos, rather than photographs of Spark's installed equipment.
export const STUDIO_EQUIPMENT = [
  {
    id: 'microphone',
    category: 'MICROPHONE',
    models: 'Neumann M 149 Tube',
    descVi: 'Micro thu âm tube cao cấp, là thiết bị nổi bật trong hệ thống thu vocal của Spark Studio.',
    descEn: 'A premium tube recording microphone, a standout in Spark Studio’s vocal recording system.',
    image: microphone,
    imageAlt: 'Neumann M 149 Tube',
  },
  {
    id: 'preamp',
    category: 'PREAMP & VOCAL PROCESSING',
    models: 'Manley VOXBOX · Neve 1073',
    descVi: 'Hệ thống tiền khuếch đại và xử lý tín hiệu analog phục vụ quá trình thu âm vocal.',
    descEn: 'Analog preamplification and signal processing for vocal recording.',
    image: preamp,
    imageAlt: 'Manley VOXBOX',
  },
  {
    id: 'interface',
    category: 'AUDIO INTERFACE',
    models: 'Universal Audio Apollo x8',
    descVi: 'Trung tâm kết nối âm thanh và làm việc với hệ thống thu âm, sản xuất trên máy tính.',
    descEn: 'The audio connection hub for computer-based recording and production.',
    image: interfaceImage,
    imageAlt: 'Universal Audio Apollo x8',
  },
  {
    id: 'dynamics',
    category: 'DYNAMICS PROCESSING',
    models: 'UA 1176 · Teletronix LA-2A · Avalon 2044',
    descVi: 'Các thiết bị xử lý dynamics phục vụ kiểm soát tín hiệu và định hình chất âm.',
    descEn: 'Dynamics processors for controlling signals and shaping sonic character.',
    image: dynamics,
    imageAlt: 'Universal Audio 1176',
  },
  {
    id: 'equalizer',
    category: 'ANALOG EQUALIZATION',
    models: 'Tube-Tech PE 1C',
    descVi: 'Equalizer analog phục vụ quá trình định hình tonal balance và hoàn thiện âm sắc.',
    descEn: 'Analog equalization for shaping tonal balance and refining timbre.',
    image: equalizer,
    imageAlt: 'Tube-Tech PE 1C',
  },
  {
    id: 'monitors',
    category: 'MONITORING SYSTEM',
    models: 'Genelec 8050B · Genelec 7060B',
    descVi: 'Hệ thống loa kiểm âm và subwoofer phục vụ nghe đánh giá bản phối, cân bằng dải tần và kiểm soát âm thanh.',
    descEn: 'Studio monitors and a subwoofer for evaluating mixes, balancing frequencies and monitoring sound.',
    image: monitors,
    imageAlt: 'Genelec 8050B',
  },
  {
    id: 'headphones',
    category: 'HEADPHONE MONITORING',
    models: 'beyerdynamic DT 1990 PRO',
    descVi: 'Tai nghe kiểm âm phục vụ tham chiếu chi tiết trong quá trình thu âm và xử lý âm thanh.',
    descEn: 'Reference headphones for detailed listening during recording and audio processing.',
    image: headphones,
    imageAlt: 'beyerdynamic DT 1990 PRO',
  },
  {
    id: 'workstation',
    category: 'PRODUCTION WORKSTATION',
    models: 'Mac Studio M5',
    descVi: 'Nền tảng máy tính cho quy trình sản xuất, xử lý và hoàn thiện các dự án âm nhạc.',
    descEn: 'The computing platform for producing, processing and finishing music projects.',
    image: workstation,
    imageAlt: 'Mac Studio',
  },
];
