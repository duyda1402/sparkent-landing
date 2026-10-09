import React, { useState } from 'react';
import { ShieldCheck, Send, Check } from 'lucide-react';
import { ASSETS } from '@/lib/data';
import { Lang } from './EditorialNav';

interface EditorialFooterProps {
  lang: Lang;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ lang }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setSubscribed(true);
  };

  const directory = [
    { title: 'DIVISIONS', links: [
      { name: 'Spark Studio', href: '#studio' },
      { name: 'Spark Academy', href: '#academy' },
      { name: 'Spark Media', href: '#media' },
      { name: 'Spark Label', href: '#label' },
    ]},
    { title: 'PORTFOLIO', links: [
      { name: 'Featured Works', href: '#projects' },
      { name: 'Artist Roster', href: '#artists' },
      { name: 'Our Genesis', href: '#story' },
      { name: 'Case Studies', href: '#projects' },
    ]},
    { title: 'HEADQUARTERS', links: [
      { name: 'District 1, Saigon', href: '#contact' },
      { name: 'Commercial Booking', href: '#contact' },
      { name: 'Demo Submissions', href: '#label' },
      { name: 'Brand Partnerships', href: '#contact' },
    ]},
  ];

  return (
    <footer className="w-full bg-[#030305] text-white pt-24 pb-16 px-6 md:px-12 lg:px-16 border-t border-white/[0.08]">
      {/* Top Footer Matrix */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/[0.06]">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={ASSETS.logo}
              alt="Spark Entertainment"
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="text-[11px] font-medium tracking-[0.28em] text-white uppercase block leading-none">
                SPARK
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-white/40 uppercase mt-1 block">
                ENTERTAINMENT CO.
              </span>
            </div>
          </div>

          <p className="text-xs font-light text-white/50 leading-relaxed font-sans max-w-sm">
            {lang === 'vi'
              ? 'Tập đoàn giải trí thế hệ mới tại Việt Nam kết nối cơ sở thu âm chuẩn phòng hòa nhạc, học viện nghệ sĩ tinh hoa, sản xuất điện ảnh và phát hành âm nhạc toàn cầu.'
              : 'Vietnam’s next-generation entertainment powerhouse uniting acoustic recording, creative academy training, cinema media production, and global artist development.'}
          </p>

          <div className="flex items-center gap-2 text-[8.5px] font-mono tracking-[0.24em] text-spark-purple uppercase">
            <ShieldCheck size={12} />
            <span>SAIGON MONOLITH FACILITY // ACTIVE</span>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {directory.map((group) => (
            <div key={group.title} className="space-y-4">
              <span className="text-[8.5px] font-mono tracking-[0.3em] text-white/40 uppercase block">
                {group.title}
              </span>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs font-light text-white/70 hover:text-spark-purple transition-colors font-sans"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dispatch Newsletter Column */}
        <div className="lg:col-span-3 space-y-4">
          <span className="text-[8.5px] font-mono tracking-[0.3em] text-spark-purple uppercase block">
            THE SPARK DISPATCH
          </span>
          <p className="text-xs font-light text-white/50 leading-relaxed font-sans">
            {lang === 'vi'
              ? 'Nhận thông báo độc quyền về các bản phát hành, showcase nghệ sĩ và phiên thu âm đặc biệt.'
              : 'Exclusive updates on label releases, artist debuts, and acoustic masterclass residency dates.'}
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="subscriber@domain.com"
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-spark-purple/60 rounded-xl px-4 py-3 text-xs font-mono tracking-[0.08em] text-white placeholder-white/20 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-3 bg-spark-purple/80 hover:bg-spark-purple rounded-lg flex items-center justify-center text-white transition-colors"
              >
                {subscribed ? <Check size={12} /> : <Send size={12} />}
              </button>
            </div>
            {subscribed && (
              <span className="text-[9px] font-mono text-emerald-400 tracking-[0.14em] uppercase block">
                CONFIRMED ON ROSTER
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Editorial Legal Strip */}
      <div className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">
        <span>© 2026 SPARK ENTERTAINMENT. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-6">
          <span className="text-white/20">ISO 2969 CALIBRATED</span>
          <span className="text-white/20">DOLBY ATMOS CERTIFIED</span>
          <a href="#hero" className="hover:text-white transition-colors">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
