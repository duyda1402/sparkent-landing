import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { STUDIO_EQUIPMENT } from '@/lib/studioEquipment';

const EASE = [0.16, 1, 0.3, 1] as const;

export const StudioEquipmentSection = () => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';

  return (
    <section aria-labelledby="studio-equipment-title" className="w-full px-6 md:px-12 lg:px-20 py-24 md:py-36 bg-[#F6F6F4] border-t border-[#E5E5E5]">
      <div className="max-w-[1720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <h2 id="studio-equipment-title" className="font-condensed font-extrabold uppercase text-[clamp(2.75rem,5.6vw,5.5rem)] leading-[1.02] tracking-[-0.015em] text-[#0A0A0A]">
            ENGINEERED FOR SOUND.
          </h2>
          <p className="mt-3 font-condensed font-bold italic uppercase text-[clamp(1.5rem,2.8vw,2.75rem)] leading-tight text-[#7C3AED]">
            {vi ? 'ĐƯỢC ĐẦU TƯ CHO CHẤT ÂM.' : 'INVESTED IN THE SOUND.'}
          </p>
          <p className="mt-6 max-w-[76ch] text-base md:text-lg leading-relaxed text-[#555555]">
            {vi
              ? 'Từ thu âm vocal đến xử lý tín hiệu và kiểm âm, hệ thống thiết bị tại Spark Studio được lựa chọn để phục vụ từng giai đoạn của quá trình sản xuất âm nhạc.'
              : 'From vocal recording to signal processing and monitoring, Spark Studio’s equipment is selected to support every stage of music production.'}
          </p>
        </motion.div>

        <h3 className="mt-14 md:mt-20 font-condensed text-xl md:text-2xl font-bold uppercase tracking-[0.04em] text-[#0A0A0A]">
          {vi ? 'HỆ THỐNG THIẾT BỊ' : 'THE EQUIPMENT'}
        </h3>
        <ol className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-20">
          {STUDIO_EQUIPMENT.map((equipment, i) => (
            <motion.li
              key={equipment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group grid grid-cols-[5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] xl:grid-cols-[10rem_minmax(0,1fr)] gap-4 sm:gap-6 py-7 md:py-9 border-t border-[#D4D4D4]"
            >
              <div className="h-28 sm:h-40 xl:h-44 overflow-hidden">
                <img
                  src={equipment.image}
                  alt={equipment.imageAlt}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="min-w-0 self-center">
                <p className="flex gap-2 font-condensed text-xs sm:text-sm font-semibold tracking-[0.12em] text-[#7C3AED]">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{equipment.category}</span>
                </p>
                <h4 className="mt-2 font-condensed text-2xl md:text-3xl font-bold leading-tight text-[#0A0A0A]">
                  {equipment.models}
                </h4>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-[#555555]">
                  {vi ? equipment.descVi : equipment.descEn}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
