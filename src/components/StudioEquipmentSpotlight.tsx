import { useRef, useState, type SyntheticEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { STUDIO_EQUIPMENT } from '@/lib/studioEquipment';

const EASE = [0.16, 1, 0.3, 1] as const;

// Grouped in signal-chain order. Images and descriptions come from STUDIO_EQUIPMENT.
const EQUIPMENT_GROUPS = [
  {
    labelVi: 'Thu âm',
    labelEn: 'Recording',
    items: [
      { id: 'microphone', category: 'Microphone', models: 'Neumann M 149 Tube' },
      { id: 'preamp', category: 'Preamp & Vocal Processing', models: 'Manley VOXBOX, Neve 1073' },
    ],
  },
  {
    labelVi: 'Xử lý analog',
    labelEn: 'Analog processing',
    items: [
      { id: 'dynamics', category: 'Analog Dynamics Processing', models: 'Universal Audio 1176, Teletronix LA-2A, Avalon AD2044' },
      { id: 'equalizer', category: 'Analog Equalization', models: 'Tube-Tech PE 1C' },
    ],
  },
  {
    labelVi: 'Chuyển đổi & sản xuất',
    labelEn: 'Conversion & production',
    items: [
      { id: 'interface', category: 'Audio Interface', models: 'Universal Audio Apollo x8' },
      { id: 'workstation', category: 'Production Workstation', models: 'Apple Mac Studio M5' },
    ],
  },
  {
    labelVi: 'Kiểm âm',
    labelEn: 'Monitoring',
    items: [
      { id: 'monitors', category: 'Studio Monitoring', models: 'Genelec 8050B Studio Monitors, Genelec 7060B Subwoofer' },
      { id: 'headphones', category: 'Reference Headphones', models: 'beyerdynamic DT 1990 PRO' },
    ],
  },
];

const EQUIPMENT_ORDER = EQUIPMENT_GROUPS.flatMap((group) => group.items);
const EQUIPMENT_DETAILS = new Map(STUDIO_EQUIPMENT.map((equipment) => [equipment.id, equipment]));

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]';

interface StudioEquipmentSpotlightProps {
  className?: string;
}

export const StudioEquipmentSpotlight = ({ className = '' }: StudioEquipmentSpotlightProps) => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(EQUIPMENT_ORDER[0].id);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefetched = useRef(false);

  const activeIndex = Math.max(0, EQUIPMENT_ORDER.findIndex((item) => item.id === activeId));
  const active = EQUIPMENT_ORDER[activeIndex];
  const detail = EQUIPMENT_DETAILS.get(active.id);

  const select = (id: string, revealStage = false) => {
    setActiveId(id);
    // Below lg the stage sits above the list, so bring it back into view after a pick.
    if (revealStage && window.matchMedia('(max-width: 1023px)').matches) {
      stageRef.current?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  const step = (delta: number) => {
    const next = EQUIPMENT_ORDER[(activeIndex + delta + EQUIPMENT_ORDER.length) % EQUIPMENT_ORDER.length];
    select(next.id);
  };

  // Warm the image cache on first open so switching items does not flash an empty stage.
  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    if (!event.currentTarget.open || prefetched.current) return;
    prefetched.current = true;
    EQUIPMENT_ORDER.forEach(({ id }) => {
      const src = EQUIPMENT_DETAILS.get(id)?.image;
      if (src) new Image().src = src;
    });
  };

  return (
    <details onToggle={handleToggle} className={`group/equipment border-y border-[#E5E5E5] ${className}`}>
      <summary className={`group/summary flex min-h-[72px] md:min-h-[96px] items-center justify-between gap-6 py-5 list-none cursor-pointer text-[#0A0A0A] hover:text-[#7C3AED] transition-colors duration-300 group-open/equipment:border-b group-open/equipment:border-[#E5E5E5] [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
        <h4 className="font-condensed text-2xl md:text-[32px] font-bold uppercase tracking-[0.03em] leading-tight">
          {vi ? 'HỆ THỐNG THIẾT BỊ' : 'STUDIO EQUIPMENT'}
        </h4>
        <span className="flex shrink-0 items-center gap-5">
          <span className="hidden sm:inline font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] text-[#666666]">
            {EQUIPMENT_ORDER.length} {vi ? 'thiết bị' : 'items'}
          </span>
          <span className="flex h-11 w-11 items-center justify-center border border-[#E5E5E5] transition-colors duration-300 group-hover/summary:border-[#7C3AED]">
            <Plus size={20} strokeWidth={1.6} aria-hidden="true" className="transition-transform duration-300 group-open/equipment:rotate-45 motion-reduce:transition-none" />
          </span>
        </span>
      </summary>

      <div className="pb-12 md:pb-16">
        <p className="mt-6 md:mt-8 max-w-[62ch] text-base md:text-[17px] leading-relaxed text-[#555555]">
          {vi
            ? 'Từ thu âm vocal đến mixing & mastering, mỗi thiết bị tại Spark Studio đảm nhận một khâu cụ thể trong chuỗi tín hiệu.'
            : 'From vocal recording to mixing & mastering, each piece of equipment at Spark Studio handles a specific stage of the signal chain.'}
        </p>

        <div className="mt-8 md:mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Stage */}
          <div className="min-w-0 lg:order-2 lg:col-span-7 xl:col-span-8">
            <div ref={stageRef} className="relative h-[280px] sm:h-[380px] lg:h-[540px] overflow-hidden bg-[#F6F6F4] scroll-mt-28">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: EASE }}
                  className="absolute inset-8 sm:inset-12 lg:inset-16 mix-blend-multiply"
                >
                  <img
                    src={detail?.image}
                    alt={detail?.imageAlt ?? active.models}
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 md:mt-7 flex flex-wrap items-end justify-between gap-6 md:gap-8">
              <div aria-live="polite" className="min-w-0 flex-1 basis-[20rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                    transition={{ duration: reduceMotion ? 0.1 : 0.35, ease: EASE }}
                  >
                    <p className="font-condensed text-[13px] md:text-[15px] font-bold uppercase tracking-[0.16em] text-[#7C3AED]">
                      {active.category}
                    </p>
                    <h5 className="mt-2.5 font-condensed text-3xl md:text-[44px] font-extrabold leading-[1.04] text-[#0A0A0A]">
                      {active.models}
                    </h5>
                    <p className="mt-3.5 max-w-[56ch] text-sm md:text-base leading-relaxed text-[#555555]">
                      {vi ? detail?.descVi : detail?.descEn}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={vi ? 'Thiết bị trước' : 'Previous item'}
                  className={`flex h-[52px] w-[52px] items-center justify-center border border-[#E5E5E5] bg-white text-[#0A0A0A] transition-[border-color,transform] duration-300 hover:border-[#0A0A0A] active:scale-[0.97] ${FOCUS_RING}`}
                >
                  <ArrowLeft size={20} strokeWidth={1.6} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={vi ? 'Thiết bị tiếp theo' : 'Next item'}
                  className={`flex h-[52px] w-[52px] items-center justify-center border border-[#0A0A0A] bg-[#0A0A0A] text-white transition-[background-color,border-color,transform] duration-300 hover:border-[#7C3AED] hover:bg-[#7C3AED] active:scale-[0.97] ${FOCUS_RING}`}
                >
                  <ArrowRight size={20} strokeWidth={1.6} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Index */}
          <div className="min-w-0 flex flex-col gap-7 lg:order-1 lg:col-span-5 xl:col-span-4">
            {EQUIPMENT_GROUPS.map((group) => (
              <div key={group.labelEn}>
                <p className="mb-2.5 font-condensed text-[13px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
                  {vi ? group.labelVi : group.labelEn}
                </p>
                <ul>
                  {group.items.map((item) => {
                    const isActive = item.id === active.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => select(item.id, true)}
                          className={`group/row flex w-full items-center gap-4 border-t border-[#E5E5E5] px-4 py-3.5 text-left transition-colors duration-300 motion-reduce:transition-none ${FOCUS_RING} ${
                            isActive ? 'bg-[#F6F6F4]' : 'bg-transparent'
                          }`}
                        >
                          <span className="flex min-w-0 flex-1 flex-col gap-1">
                            <span className="font-condensed text-[13px] font-semibold uppercase tracking-[0.14em] text-[#666666]">
                              {item.category}
                            </span>
                            <span
                              className={`font-condensed text-xl md:text-2xl font-bold leading-tight transition-colors duration-300 ${
                                isActive ? 'text-[#0A0A0A]' : 'text-[#6B6B6B] group-hover/row:text-[#0A0A0A]'
                              }`}
                            >
                              {item.models}
                            </span>
                          </span>
                          <ArrowRight
                            size={20}
                            strokeWidth={1.6}
                            aria-hidden="true"
                            className={`shrink-0 text-[#7C3AED] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                              isActive ? 'translate-x-0 opacity-100' : '-translate-x-1.5 opacity-0'
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
};
