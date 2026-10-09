import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Lang } from '@/lib/LanguageContext';
import { ContactSubmissionError, submitContactForm } from '@/lib/contactSubmission';

interface MinimalContactProps {
  lang?: Lang;
}

export const MinimalContact: React.FC<MinimalContactProps> = () => {
  const { lang } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<'not_configured' | 'rejected' | 'unconfirmed' | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    lookingFor: 'STUDIO',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!form.name.trim() || !form.message.trim()) {
      setSubmitError('rejected');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactForm(form);
      setFormSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof ContactSubmissionError ? error.code : 'unconfirmed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorMessage = submitError === 'not_configured'
    ? (lang === 'vi' ? 'Form liên hệ chưa được cấu hình. Vui lòng gửi email trực tiếp tới info@sparkent.vn.' : 'The contact form is not configured yet. Please email info@sparkent.vn directly.')
    : submitError === 'rejected'
      ? (lang === 'vi' ? 'Không gửi được thông tin. Vui lòng kiểm tra lại và thử lần nữa.' : 'We could not send your request. Please check the details and try again.')
      : (lang === 'vi' ? 'Chưa xác nhận được việc lưu thông tin. Vui lòng kiểm tra trước khi gửi lại để tránh trùng lặp.' : 'We could not confirm that your request was saved. Please check before retrying to avoid duplicates.');

  return (
    <section
      id="contact"
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
          {lang === 'vi' ? '07 / LIÊN HỆ HỢP TÁC' : '07 / FINAL CTA'}
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Monolithic Invitation with condensed YG punch */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-condensed font-extrabold text-[clamp(2.6rem,7.2vw,7.6rem)] tracking-[-0.015em] uppercase text-[#0A0A0A] leading-[1.05] sm:leading-[1.0] select-none h-auto"
            >
              {lang === 'vi' ? (
                <>
                  CÙNG TẠO RA<br />
                  <span className="font-extrabold text-[#0A0A0A] inline-block pt-1">NHỮNG ĐIỀU</span><br />
                  <span className="font-bold italic text-[#7C3AED] tracking-tight inline-block pt-1">ĐÁNG NHỚ.</span>
                </>
              ) : (
                <>
                  LET’S CREATE<br />
                  <span className="font-extrabold text-[#0A0A0A] inline-block pt-1">SOMETHING WORTH</span><br />
                  <span className="font-bold italic text-[#7C3AED] tracking-tight inline-block pt-1">REMEMBERING.</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mt-8 md:mt-12 text-base md:text-xl text-[#666666] font-normal leading-relaxed max-w-xl"
            >
              {lang === 'vi'
                ? 'Spark Entertainment đồng hành cùng những người trẻ tài năng và đối tác định hình tương lai âm nhạc.'
                : 'Spark Entertainment partners with next-generation talent and visionaries shaping the future of music.'}
            </motion.p>

            {/* Direct Inquiries Channel */}
            <div className="mt-12 pt-10 border-t border-[#E5E5E5] text-xs tracking-[0.18em] uppercase text-[#666666] space-y-4">
              <div>
                <span className="text-[#8E8E93] block mb-1 text-[10px] font-mono font-semibold">
                  {lang === 'vi' ? 'EMAIL TRỰC TIẾP' : 'DIRECT EMAIL'}
                </span>
                <a
                  href="mailto:info@sparkent.vn"
                  className="text-[#0A0A0A] text-sm md:text-base hover:text-[#7C3AED] transition-colors duration-300 font-semibold"
                >
                  info@sparkent.vn
                </a>
              </div>
              <div>
                <span className="text-[#8E8E93] block mb-1 text-[10px] font-mono font-semibold">
                  {lang === 'vi' ? 'HOTLINE CHÍNH THỨC' : 'OFFICIAL HOTLINE'}
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

          {/* Right Column: Visual Minimal Editorial Form on white card */}
          <div className="lg:col-span-5 pt-4 lg:pt-0">
            <div className="bg-[#F6F6F4] border border-[#E5E5E5] p-8 md:p-12 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#7C3AED] text-[#7C3AED] mx-auto flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-[0.08em] text-[#0A0A0A]">
                      {lang === 'vi' ? 'ĐÃ GỬI THÔNG TIN' : 'MESSAGE SENT'}
                    </h3>
                    <p className="text-xs text-[#666666] font-normal leading-relaxed max-w-xs mx-auto">
                      {lang === 'vi'
                        ? 'Đội ngũ của Spark sẽ phản hồi trong vòng 24 giờ.'
                        : 'Our team will review your project within 24 hours.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7" aria-busy={isSubmitting}>
                    <div>
                      <label className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                        {lang === 'vi' ? 'HỌ VÀ TÊN' : 'YOUR NAME'}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={200}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b border-[#D1D1D6] pb-2 text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#7C3AED] transition-colors"
                        placeholder={lang === 'vi' ? 'Họ và tên của bạn' : 'Enter your name'}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-[#D1D1D6] pb-2 text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#7C3AED] transition-colors"
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-interest-select" className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                        {lang === 'vi' ? 'LĨNH VỰC QUAN TÂM' : 'WHAT ARE YOU LOOKING FOR?'}
                      </label>
                      <select
                        id="contact-interest-select"
                        name="lookingFor"
                        aria-label={lang === 'vi' ? 'Lĩnh vực quan tâm' : 'Area of interest'}
                        value={form.lookingFor}
                        onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
                        className="w-full bg-white border border-[#E5E5E5] p-2 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#7C3AED] rounded-sm transition-colors"
                      >
                        {lang === 'vi' ? (
                          <>
                            <option value="STUDIO">SPARK STUDIO — THU ÂM · SẢN XUẤT · MEDIA</option>
                            <option value="ACADEMY">SPARK ACADEMY — ĐÀO TẠO · PHÁT TRIỂN NGHỆ SĨ</option>
                            <option value="LABEL">SPARK LABEL — GỬI BẢN DEMO · PHÁT HÀNH</option>
                            <option value="COLLAB">HỢP TÁC THƯƠNG HIỆU & SÁNG TẠO</option>
                          </>
                        ) : (
                          <>
                            <option value="STUDIO">SPARK STUDIO — RECORDING · PRODUCTION · MEDIA</option>
                            <option value="ACADEMY">SPARK ACADEMY — EDUCATION · ARTIST DEVELOPMENT</option>
                            <option value="LABEL">SPARK LABEL — ARTIST SCOUTING · MUSIC RELEASES</option>
                            <option value="COLLAB">CREATIVE & BRAND COLLABORATION</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.24em] uppercase text-[#666666] block mb-2 font-mono font-bold">
                        {lang === 'vi' ? 'MÔ TẢ DỰ ÁN' : 'TELL US ABOUT IT'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        maxLength={5000}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-transparent border-b border-[#D1D1D6] pb-2 text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#7C3AED] transition-colors resize-none"
                        placeholder={
                          lang === 'vi'
                            ? 'Ý tưởng, thời gian hoặc mục tiêu cụ thể...'
                            : 'Brief background, ideas, or timeline...'
                        }
                      />
                    </div>

                    {submitError && (
                      <p role="alert" className="text-sm text-red-700 leading-relaxed">
                        {errorMessage}
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#7C3AED] disabled:opacity-60 disabled:cursor-wait text-white font-condensed text-xs tracking-[0.26em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-3 group"
                      >
                        <span>{isSubmitting ? (lang === 'vi' ? 'ĐANG GỬI...' : 'SENDING...') : (lang === 'vi' ? 'GỬI YÊU CẦU' : 'SEND')}</span>
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
  );
};
