import React from 'react';
import { ASSETS } from '@/lib/data';
import { useLanguage, Lang } from '@/lib/LanguageContext';

interface MinimalFooterProps {
  lang?: Lang;
}

export const MinimalFooter: React.FC<MinimalFooterProps> = () => {
  const { lang } = useLanguage();

  const navLinks = lang === 'vi' ? [
    { label: 'TRANG CHỦ', href: '#hero' },
    { label: 'GIỚI THIỆU', href: '#intro' },
    { label: 'HỆ SINH THÁI', href: '#ecosystem' },
    { label: 'DỰ ÁN', href: '#works' },
    { label: 'NGHỆ SĨ', href: '#artists' },
    { label: 'TIN TỨC', href: '#journal' },
    { label: 'LIÊN HỆ', href: '#contact' },
  ] : [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#intro' },
    { label: 'ECOSYSTEM', href: '#ecosystem' },
    { label: 'WORKS', href: '#works' },
    { label: 'ARTISTS', href: '#artists' },
    { label: 'JOURNAL', href: '#journal' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const pillarLinks = lang === 'vi' ? [
    { label: 'SPARK STUDIO', href: '#ecosystem' },
    { label: 'SPARK ACADEMY', href: '/academy' },
    { label: 'SPARK LABEL', href: '#ecosystem' },
  ] : [
    { label: 'SPARK STUDIO', href: '#ecosystem' },
    { label: 'SPARK ACADEMY', href: '/academy' },
    { label: 'SPARK LABEL', href: '#ecosystem' },
  ];

  return (
    <footer className="w-full bg-[#080808] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#hero" className="inline-block" aria-label="Spark Entertainment Home">
              <img
                src={ASSETS.logoLight}
                alt="Spark Entertainment"
                className="w-[180px] md:w-[210px] h-auto object-contain object-left"
              />
            </a>
            <p className="text-sm font-normal text-[#B5B5B5] leading-relaxed max-w-sm">
              {lang === 'vi'
                ? 'Hệ sinh thái âm nhạc thế hệ mới hội tụ đào tạo, sản xuất âm thanh, hình ảnh và phát hành nghệ sĩ.'
                : 'A music ecosystem for the next generation uniting artist education, audio production, visuals, and global releases.'}
            </p>
          </div>

          {/* Navigation Directory */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#7C3AED] block mb-5 font-bold font-mono">
                {lang === 'vi' ? 'ĐIỀU HƯỚNG' : 'NAVIGATION'}
              </span>
              <ul className="space-y-3 text-xs tracking-[0.18em] uppercase font-semibold">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white hover:text-[#7C3AED] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#7C3AED] block mb-5 font-bold font-mono">
                {lang === 'vi' ? 'HỆ SINH THÁI' : 'ECOSYSTEM'}
              </span>
              <ul className="space-y-3 text-xs tracking-[0.18em] uppercase text-white font-semibold">
                {pillarLinks.map((p) => (
                  <li key={p.label}>
                    <a href={p.href} className="hover:text-[#7C3AED] transition-colors">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Inquiries & Social Links */}
          <div className="lg:col-span-3 space-y-6">
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#7C3AED] block font-bold font-mono">
              {lang === 'vi' ? 'LIÊN HỆ' : 'CONNECT'}
            </span>
            <div className="text-xs tracking-[0.14em] text-[#B5B5B5] space-y-2.5 font-medium">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase block mb-0.5">
                  EMAIL
                </span>
                <a
                  href="mailto:info@sparkent.vn"
                  className="text-white hover:text-[#7C3AED] transition-colors font-semibold"
                >
                  info@sparkent.vn
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8E8E93] uppercase block mb-0.5">
                  HOTLINE
                </span>
                <a
                  href="tel:+84911534666"
                  className="text-white hover:text-[#7C3AED] transition-colors font-bold text-sm tracking-wider font-mono inline-block"
                >
                  0911 534 666
                </a>
              </div>
              <p className="text-[#8E8E93] pt-1">
                {lang === 'vi' ? 'HỆ SINH THÁI ÂM NHẠC THẾ HỆ MỚI' : 'NEXT-GENERATION MUSIC ECOSYSTEM'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-condensed tracking-[0.2em] uppercase text-[#8E8E93] font-semibold">
          <p>© {new Date().getFullYear()} SPARK ENTERTAINMENT. ALL RIGHTS RESERVED.</p>
          <p className="text-[#B5B5B5]">WHITE × BLACK × SPARK PURPLE EDITION</p>
        </div>
      </div>
    </footer>
  );
};
