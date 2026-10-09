import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { Lang } from './EditorialNav';

interface EditorialContactProps {
  lang: Lang;
}

export const EditorialContact: React.FC<EditorialContactProps> = ({ lang }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050508] py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(139,92,255,0.25), transparent 70%)',
        }}
      />

      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-16 border-b border-white/[0.08] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-spark-purple" />
            <span className="text-[9px] font-mono tracking-[0.32em] text-spark-purple uppercase">
              COMMERCIAL INQUIRIES & PARTNERSHIPS // 09
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-light tracking-[0.1em] uppercase text-white leading-tight">
            CO-AUTHOR YOUR NEXT<br />
            <span className="font-extralight text-white/50">MASTERPIECE WITH SPARK</span>
          </h2>
        </div>

        <p className="max-w-md text-xs md:text-sm font-light text-white/60 leading-relaxed font-sans md:text-right">
          {lang === 'vi'
            ? 'Kết nối với trụ sở sáng tạo Spark Entertainment tại Quận 1, TP. Hồ Chí Minh. Sẵn sàng tiếp nhận các dự án sản xuất âm nhạc, video và hợp tác thương hiệu.'
            : 'Connect directly with Spark Entertainment headquarters in District 1, Ho Chi Minh City. Open for studio bookings, artist inquiries, and brand commissions.'}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Office Coordinates and Contact Points */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 space-y-6">
            <span className="text-[9px] font-mono tracking-[0.3em] text-spark-purple uppercase block">
              HEADQUARTERS RECEPTION
            </span>

            <div className="space-y-4 text-xs font-mono tracking-[0.1em] text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-spark-purple flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  12 Monolith Boulevard, District 1,<br />
                  Ho Chi Minh City, Vietnam
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-spark-purple flex-shrink-0" />
                <a href="mailto:hello@sparkent.vn" className="hover:text-white transition-colors">
                  hello@sparkent.vn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-spark-purple flex-shrink-0" />
                <a href="tel:+84123456789" className="hover:text-white transition-colors">
                  +84 (0) 123 456 789
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-[8.5px] font-mono tracking-[0.2em] text-white/40 uppercase">
              <span>RESPONSE TIME</span>
              <span className="text-spark-purple">WITHIN 24 HOURS</span>
            </div>
          </div>

          {/* Social Channels */}
          <div className="p-8 rounded-3xl border border-white/[0.08] bg-[#07070b]/60 flex items-center justify-between">
            <span className="text-[9px] font-mono tracking-[0.24em] text-white/40 uppercase">
              DIGITAL NETWORKS
            </span>
            <div className="flex items-center gap-4 text-white/50">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-spark-purple transition-colors">
                <Instagram size={15} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-spark-purple transition-colors">
                <Youtube size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-spark-purple transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="hover:text-spark-purple transition-colors">
                <MessageCircle size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: 6-Field Luxury Inquiry Form */}
        <div className="lg:col-span-7 p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-[#07070b]/60">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                      {lang === 'vi' ? 'HỌ VÀ TÊN' : 'FULL NAME'} *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
                      placeholder="e.g. John Nguyen"
                    />
                  </div>
                  <div>
                    <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                      EMAIL *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                      {lang === 'vi' ? 'SỐ ĐIỆN THOẠI' : 'PHONE NUMBER'}
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
                      placeholder="+84 90 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                      {lang === 'vi' ? 'CÔNG TY / NGHỆ DANH' : 'ORGANIZATION / ARTIST'}
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
                      placeholder="e.g. Universal / Independent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                      {lang === 'vi' ? 'HẠNG MỤC HỢP TÁC' : 'DISCIPLINE / SERVICE'}
                    </label>
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      className="w-full bg-[#0a0a0f] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white focus:outline-none transition-colors"
                    >
                      <option value="">Select Service Area...</option>
                      <option value="studio">Spark Studio (Recording / Mix / Master)</option>
                      <option value="academy">Spark Academy (Piano / Vocal / Production)</option>
                      <option value="media">Spark Media (Cinema MV / TVC / Stills)</option>
                      <option value="label">Spark Label (Demo Submission / A&R)</option>
                      <option value="partnership">Brand Sponsorship & Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                      {lang === 'vi' ? 'NGÂN SÁCH DỰ KIẾN' : 'ESTIMATED BUDGET'}
                    </label>
                    <input
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
                      placeholder="e.g. $5,000 - $25,000+"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8.5px] font-mono tracking-[0.24em] text-white/40 uppercase mb-2">
                    {lang === 'vi' ? 'NỘI DUNG YÊU CẦU' : 'MESSAGE DETAILS'}
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
                    placeholder="Briefly describe your creative vision or project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-spark-purple text-white text-[10px] font-mono tracking-[0.24em] uppercase font-medium hover:bg-spark-purple/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(139,92,255,0.4)]"
                >
                  <span>{lang === 'vi' ? 'GỬI YÊU CẦU HỢP TÁC' : 'TRANSMIT COMMERCIAL INQUIRY'}</span>
                  <Send size={12} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full border border-spark-purple mx-auto flex items-center justify-center text-spark-purple">
                  <Check size={20} />
                </div>
                <h3 className="text-xl font-light tracking-[0.16em] uppercase text-white font-mono">
                  INQUIRY SUCCESSFULLY TRANSMITTED
                </h3>
                <p className="text-xs font-light text-white/50 max-w-sm mx-auto font-sans">
                  The Spark Executive Team will review your parameters and follow up within 24 business hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
