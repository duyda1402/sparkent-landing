// Pillar-specific sections for /about/:pillar. Each page renders one module
// between the shared facts strip and the closing call to action.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useLanguage } from '@/lib/LanguageContext';
import { useBookingModal } from '@/lib/BookingContext';
import { ARTISTS_DATA } from '@/lib/data';
import {
  CREATE_SPACES,
  CREATE_STEPS,
  DEVELOP_STAGES,
  LEARN_DISCIPLINES,
  LEARN_METHOD,
  RELEASE_PHASES,
} from '@/lib/pillars';
import { BTN_DARK, EASE, SECTION } from './ui';

const SectionHeading: React.FC<{ lead: string; accent: string; stacked?: boolean; className?: string }> = ({
  lead,
  accent,
  stacked = false,
  className = '',
}) => (
  <motion.h2
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.1, ease: EASE }}
    className={`font-condensed font-extrabold uppercase text-[clamp(2.75rem,5.6vw,5.5rem)] leading-[1.02] tracking-[-0.015em] text-[#0A0A0A] ${className}`}
  >
    {lead}
    <span className={`font-bold italic text-[#7C3AED] ${stacked ? 'block pb-1' : ''}`}>{accent}</span>
  </motion.h2>
);

const Lead: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`max-w-[52ch] text-base md:text-lg leading-relaxed text-[#555555] ${className}`}>{children}</p>
);

const TextLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="group inline-flex items-center gap-2 min-h-[44px] font-condensed text-xs font-bold tracking-[0.26em] uppercase text-[#0A0A0A] hover:text-[#7C3AED] transition-colors duration-300"
  >
    {children}
    <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
);

/* LEARN: disciplines (accordion + photo) and the Academy method */
export const LearnModule: React.FC = () => {
  const { lang } = useLanguage();
  const { openBooking } = useBookingModal();
  const vi = lang === 'vi';
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className={`${SECTION} bg-[#F6F6F4]`}>
        <div className="max-w-[1720px] mx-auto">
          <SectionHeading lead={vi ? 'NĂM BỘ MÔN, ' : 'FIVE DISCIPLINES, '} accent={vi ? 'MỘT NỀN TẢNG.' : 'ONE FOUNDATION.'} />
          <Lead className="mt-6">
            {vi
              ? 'Mỗi khóa học đi từ nền tảng đến biểu diễn và sản xuất thực tế. Chọn một bộ môn để xem bạn sẽ học gì.'
              : 'Every course runs from fundamentals to real performance and production. Pick a discipline to see what you will learn.'}
          </Lead>

          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="relative aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-[#141416]">
                {LEARN_DISCIPLINES.map((d, i) => (
                  <div
                    key={d.id}
                    aria-hidden={i !== open}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${i === open ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <ImageWithFallback src={d.image} alt={vi ? d.titleVi : d.titleEn} loading="lazy" className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 border-t border-[#D4D4D4]">
              {LEARN_DISCIPLINES.map((d, i) => {
                const isOpen = i === open;
                const panelId = `discipline-panel-${d.id}`;
                return (
                  <div key={d.id} className="border-b border-[#D4D4D4]">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(i)}
                        className="group w-full flex items-center gap-5 md:gap-8 py-6 md:py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
                      >
                        <span className={`w-7 shrink-0 font-condensed text-[13px] font-bold tracking-[0.2em] ${isOpen ? 'text-[#7C3AED]' : 'text-[#666666]'}`}>
                          {d.id}
                        </span>
                        <span
                          className={`flex-1 min-w-0 font-condensed font-extrabold uppercase text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[0.02em] transition-colors duration-300 group-hover:text-[#7C3AED] ${
                            isOpen ? 'text-[#7C3AED]' : 'text-[#0A0A0A]'
                          }`}
                        >
                          {vi ? d.titleVi : d.titleEn}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                            isOpen ? 'bg-[#7C3AED] border-[#7C3AED] text-white' : 'border-[#D4D4D4] text-[#0A0A0A]'
                          }`}
                        >
                          <Plus size={16} strokeWidth={1.8} className={`transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      className={`grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                        <div className="pb-9 pl-12 md:pl-[60px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                          <p className="text-base leading-relaxed text-[#555555]">{vi ? d.subVi : d.subEn}</p>
                          <ul className="flex flex-col gap-3">
                            {(vi ? d.outcomesVi : d.outcomesEn).map((o) => (
                              <li key={o} className="flex gap-3 text-[15px] leading-snug text-[#0A0A0A]">
                                <Check size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7C3AED]" />
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="md:col-span-2 flex flex-wrap items-center gap-x-7 gap-y-3">
                            <button type="button" onClick={() => openBooking(d.service)} className={BTN_DARK}>
                              {vi ? 'ĐĂNG KÝ HỌC THỬ' : 'BOOK A TRIAL LESSON'}
                            </button>
                            <TextLink to="/academy">{vi ? 'XEM KHÓA HỌC' : 'VIEW COURSES'}</TextLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-[1720px] mx-auto">
          <SectionHeading lead={vi ? 'HỌC ĐI ĐÔI ' : 'LEARN '} accent={vi ? 'VỚI HÀNH.' : 'BY DOING.'} />
          <ol className="mt-14 md:mt-20 border-t border-[#E5E5E5]">
            {LEARN_METHOD.map((m, i) => (
              <motion.li
                key={m.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="group grid grid-cols-1 lg:grid-cols-12 items-baseline gap-x-10 gap-y-4 py-10 md:py-14 border-b border-[#E5E5E5]"
              >
                <span className="lg:col-span-1 font-condensed text-[13px] font-bold tracking-[0.2em] text-[#666666]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="lg:col-span-6 font-condensed font-extrabold uppercase text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.92] tracking-[-0.015em] text-[#0A0A0A] transition-colors duration-500 group-hover:text-[#7C3AED]">
                  {vi ? m.titleVi : m.titleEn}
                </span>
                <div className="lg:col-span-5">
                  <span className="font-condensed text-xs font-bold tracking-[0.28em] text-[#7C3AED]">{vi ? m.tagVi : m.tagEn}</span>
                  <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-[#555555]">{vi ? m.descVi : m.descEn}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

/* CREATE: production steps and the rooms */
export const CreateModule: React.FC = () => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';
  const [room, pianoRoom] = CREATE_SPACES;

  return (
    <>
      <section className={`${SECTION} bg-[#F6F6F4]`}>
        <div className="max-w-[1720px] mx-auto">
          <SectionHeading lead={vi ? 'TỪ PHÁC THẢO ' : 'FROM SKETCH '} accent={vi ? 'ĐẾN BẢN MASTER.' : 'TO MASTER.'} />
          <Lead className="mt-6">
            {vi
              ? 'Năm bước sản xuất tại Spark Studio. Bạn có thể đi trọn quy trình hoặc chỉ đặt một bước.'
              : 'Five production steps at Spark Studio. Book the full process or a single step.'}
          </Lead>

          <ol className="relative mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-5">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="hidden lg:block absolute left-0 right-0 top-0 h-px origin-left bg-[#0A0A0A]"
            />
            {CREATE_STEPS.map((step, i) => (
              <motion.li
                key={step.titleEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE }}
                className="group relative pl-10 pb-12 lg:pl-0 lg:pb-0 lg:pt-12 lg:pr-8 border-l border-[#D4D4D4] lg:border-l-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-0 lg:left-0 lg:-top-[7px] w-[14px] h-[14px] rounded-full border-2 border-[#0A0A0A] bg-[#F6F6F4] transition-colors duration-300 group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED]"
                />
                <span className="block -mt-1 lg:mt-0 font-condensed text-[13px] font-bold tracking-[0.2em] text-[#666666]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-condensed font-extrabold text-[clamp(1.75rem,2.4vw,2.25rem)] leading-none tracking-[0.03em] text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#7C3AED]">
                  {vi ? step.titleVi : step.titleEn}
                </h3>
                <p className="mt-3.5 max-w-[30ch] text-[15px] leading-relaxed text-[#555555]">{vi ? step.descVi : step.descEn}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-[1720px] mx-auto">
          <SectionHeading lead={vi ? 'KHÔNG GIAN ' : 'CREATIVE '} accent={vi ? 'SÁNG TẠO.' : 'SPACES.'} />
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-14 items-start">
            {[
              { space: room, className: 'md:col-span-7', aspect: 'aspect-[4/3]' },
              { space: pianoRoom, className: 'md:col-span-5 md:mt-32', aspect: 'aspect-[4/5]' },
            ].map(({ space, className, aspect }) => (
              <motion.figure
                key={space.nameEn}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: EASE }}
                className={`group min-w-0 ${className}`}
              >
                <div className="overflow-hidden bg-[#141416]">
                  <ImageWithFallback
                    src={space.image}
                    alt={vi ? space.nameVi : space.nameEn}
                    loading="lazy"
                    className={`${aspect} w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
                  />
                </div>
                <figcaption className="pt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="font-condensed text-[28px] leading-none font-extrabold tracking-[0.03em] text-[#0A0A0A]">
                    {vi ? space.nameVi : space.nameEn}
                  </span>
                  <span className="text-sm text-[#555555]">{vi ? space.noteVi : space.noteEn}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* DEVELOP: artist pathway and the current roster */
export const DevelopModule: React.FC = () => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';
  const roster = ARTISTS_DATA.slice(0, 2);

  return (
    <>
      <section className={`${SECTION} bg-[#F6F6F4]`}>
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <SectionHeading lead={vi ? 'TỪ BẢN SẮC ' : 'FROM IDENTITY '} accent={vi ? 'ĐẾN SỰ NGHIỆP.' : 'TO CAREER.'} stacked />
            <Lead className="mt-6 max-w-[40ch]">
              {vi
                ? 'Bốn giai đoạn của lộ trình nghệ sĩ tại Spark Label. Mỗi giai đoạn có mục tiêu và đầu ra riêng.'
                : 'Four stages of the Spark Label artist pathway, each with its own goals and outcomes.'}
            </Lead>
          </div>
          <ol className="lg:col-span-7 border-b border-[#D4D4D4]">
            {DEVELOP_STAGES.map((stage, i) => (
              <motion.li
                key={stage.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="group flex flex-wrap gap-x-8 gap-y-3 py-10 md:py-12 border-t border-[#D4D4D4]"
              >
                <span className="w-[72px] shrink-0 font-condensed text-[56px] leading-[0.9] font-extrabold text-[#7C3AED]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-[240px]">
                  <h3 className="font-condensed font-extrabold text-[clamp(2rem,3vw,2.75rem)] leading-none tracking-[0.03em] text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#7C3AED]">
                    {vi ? stage.titleVi : stage.titleEn}
                  </h3>
                  <p className="mt-3.5 max-w-[48ch] text-base leading-relaxed text-[#555555]">{vi ? stage.descVi : stage.descEn}</p>
                  <p className="mt-4 font-condensed text-xs font-bold tracking-[0.24em] text-[#0A0A0A] whitespace-pre-wrap">
                    {vi ? stage.tagsVi : stage.tagsEn}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-[1720px] mx-auto">
          <SectionHeading lead={vi ? 'NGHỆ SĨ ' : 'SPARK '} accent={vi ? 'CỦA SPARK.' : 'ARTISTS.'} />
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-start">
            {roster.map((artist, i) => (
              <motion.figure
                key={artist.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: EASE }}
                className={`group min-w-0 ${i === 0 ? 'md:col-span-6' : 'md:col-span-5 md:col-start-8 md:mt-40'}`}
              >
                <Link to={`/artists/${artist.slug}`} className="block overflow-hidden bg-[#141416]" tabIndex={-1} aria-hidden="true">
                  <ImageWithFallback
                    src={artist.portrait}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </Link>
                <figcaption className="pt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                  <div>
                    <p className="font-condensed text-[44px] leading-none font-extrabold text-[#0A0A0A]">{artist.name}</p>
                    <p className="mt-2 font-condensed text-xs font-bold tracking-[0.24em] uppercase text-[#666666]">
                      {artist.role}, {artist.genre}
                    </p>
                  </div>
                  <TextLink to={`/artists/${artist.slug}`}>{vi ? 'XEM HỒ SƠ' : 'VIEW PROFILE'}</TextLink>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* RELEASE: release phases and recent releases from the roster */
export const ReleaseModule: React.FC = () => {
  const { lang } = useLanguage();
  const vi = lang === 'vi';

  const releases = ARTISTS_DATA.flatMap((artist) =>
    artist.discography.slice(0, 2).map((rec) => ({ ...rec, artist })),
  ).sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <>
      <section className={`${SECTION} bg-[#F6F6F4]`}>
        <div className="max-w-[1720px] mx-auto">
          <SectionHeading lead={vi ? 'MỘT BẢN PHÁT HÀNH, ' : 'ONE RELEASE, '} accent={vi ? 'BA GIAI ĐOẠN.' : 'THREE PHASES.'} />
          <Lead className="mt-6">
            {vi ? 'Spark đi cùng nghệ sĩ trước, trong và sau ngày ra mắt.' : 'Spark works with the artist before, during and after release day.'}
          </Lead>
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-[1fr_1.25fr_1fr] border-y border-[#D4D4D4]">
            {RELEASE_PHASES.map((phase, i) => {
              const middle = i === 1;
              return (
                <motion.div
                  key={phase.titleEn}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  className={`min-w-0 py-10 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[#D4D4D4]' : ''} ${
                    middle ? 'bg-white px-6 md:px-10' : i === 0 ? 'md:pr-10' : 'md:pl-10'
                  }`}
                >
                  <span className={`font-condensed text-xs font-bold tracking-[0.3em] ${middle ? 'text-[#7C3AED]' : 'text-[#666666]'}`}>
                    {vi ? phase.labelVi : phase.labelEn}
                  </span>
                  <h3 className="mt-3 mb-7 font-condensed font-extrabold text-[clamp(1.9rem,2.8vw,2.6rem)] leading-none text-[#0A0A0A]">
                    {vi ? phase.titleVi : phase.titleEn}
                  </h3>
                  <ul className="flex flex-col gap-3.5">
                    {(vi ? phase.itemsVi : phase.itemsEn).map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-snug text-[#0A0A0A]">
                        <Check size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7C3AED]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <SectionHeading
            lead={vi ? 'ĐÃ PHÁT HÀNH ' : 'RELEASED '}
            accent={vi ? 'CÙNG SPARK.' : 'WITH SPARK.'}
            stacked
            className="lg:col-span-4"
          />
          <ol className="lg:col-span-8 border-b border-[#E5E5E5]">
            {releases.map((rec, i) => (
              <li
                key={`${rec.artist.slug}-${rec.title}`}
                className="group flex items-center gap-5 py-4 pr-3 border-t border-[#E5E5E5] transition-colors duration-300 hover:bg-[#F6F6F4]"
              >
                <span className="hidden sm:block w-8 shrink-0 text-right font-condensed text-[13px] font-bold tracking-[0.2em] text-[#666666]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ImageWithFallback src={rec.artist.portrait} alt="" loading="lazy" className="w-16 h-16 shrink-0 bg-[#141416]" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-condensed font-extrabold text-[clamp(1.5rem,2.2vw,2rem)] leading-none tracking-[0.02em] text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#7C3AED]">
                    {rec.title}
                  </p>
                  <p className="mt-1.5 font-condensed text-xs font-bold tracking-[0.24em] text-[#666666]">{rec.artist.name}</p>
                </div>
                <span className="hidden sm:block shrink-0 font-condensed text-xs font-bold tracking-[0.24em] uppercase text-[#666666] whitespace-pre">
                  {rec.type}  /  {rec.year}
                </span>
                <Link
                  to={`/artists/${rec.artist.slug}`}
                  aria-label={`${rec.title}, ${rec.artist.name}`}
                  className="shrink-0 w-11 h-11 rounded-full border border-[#D4D4D4] flex items-center justify-center text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-colors duration-300"
                >
                  <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};
