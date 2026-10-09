// Shared class strings for the /about/:pillar pages

export const EASE = [0.16, 1, 0.3, 1] as const;

export const SECTION = 'w-full px-6 md:px-12 lg:px-20 py-24 md:py-36';

const BTN =
  'inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 rounded-full font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]';

// On light sections
export const BTN_DARK = `${BTN} bg-[#0A0A0A] text-white hover:bg-[#7C3AED]`;
// On dark sections (hero, closing call to action)
export const BTN_LIGHT = `${BTN} bg-[#F4F1E8] text-[#0A0A0A] hover:bg-[#7C3AED] hover:text-white`;
export const BTN_GHOST = `${BTN} border border-[#F4F1E8]/50 text-[#F4F1E8] hover:bg-[#F4F1E8] hover:text-[#0A0A0A]`;
