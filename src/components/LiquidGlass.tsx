import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function LiquidGlassButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  icon,
  fullWidth = false,
}: LiquidGlassButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    const el = btnRef.current || buttonRef.current;
    const rect = el?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleId.current++;
      setRipples(r => [...r, { x, y, id }]);
      setTimeout(() => setRipples(r => r.filter(rip => rip.id !== id)), 700);
    }
    onClick?.();
  };

  const sizeClasses = {
    sm: 'px-6 py-[10px] text-[9px] tracking-[0.26em]',
    md: 'px-9 py-[13px] text-[10px] tracking-[0.28em]',
    lg: 'px-11 py-[15px] text-[10px] tracking-[0.30em]',
  };

  const variantStyles = {
    primary: {
      base: 'border border-white/[0.12] text-white',
      bg: 'rgba(139,92,255,0.08)',
      hoverBg: 'rgba(139,92,255,0.14)',
      glow: '0 0 20px rgba(139,92,255,0.22), 0 0 40px rgba(139,92,255,0.10), inset 0 1px 0 rgba(255,255,255,0.10)',
      hoverGlow: '0 0 28px rgba(139,92,255,0.38), 0 0 60px rgba(139,92,255,0.16), inset 0 1px 0 rgba(255,255,255,0.14)',
      borderHover: 'rgba(139,92,255,0.45)',
    },
    secondary: {
      base: 'border border-white/[0.07] text-white/60',
      bg: 'rgba(255,255,255,0.03)',
      hoverBg: 'rgba(255,255,255,0.055)',
      glow: '0 0 12px rgba(139,92,255,0.10), inset 0 1px 0 rgba(255,255,255,0.06)',
      hoverGlow: '0 0 20px rgba(139,92,255,0.22), inset 0 1px 0 rgba(255,255,255,0.10)',
      borderHover: 'rgba(139,92,255,0.30)',
    },
    ghost: {
      base: 'border border-transparent text-spark-textMuted',
      bg: 'transparent',
      hoverBg: 'rgba(139,92,255,0.06)',
      glow: 'none',
      hoverGlow: '0 0 14px rgba(139,92,255,0.15)',
      borderHover: 'rgba(139,92,255,0.22)',
    },
  };

  const s = variantStyles[variant];

  const inner = (
    <motion.span
      className={[
        'relative group inline-flex items-center justify-center gap-2.5 rounded-full font-light uppercase overflow-hidden select-none cursor-pointer',
        'transition-[border-color] duration-500',
        sizeClasses[size],
        s.base,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      style={{
        background: s.bg,
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        boxShadow: s.glow,
      }}
      whileHover={{
        scale: 1.018,
        boxShadow: s.hoverGlow,
        background: s.hoverBg,
      }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
    >
      {/* Glass reflection layer */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(139,92,255,0.04) 100%)',
        }}
      />
      {/* Top specular highlight */}
      <span
        className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
      />

      {/* Ripple container */}
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        {ripples.map(rip => (
          <motion.span
            key={rip.id}
            className="absolute rounded-full bg-spark-purple/[0.18] pointer-events-none"
            style={{ left: rip.x, top: rip.y, x: '-50%', y: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 160, height: 160, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <motion.span
            className="flex items-center"
            initial={{ x: 0 }}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} ref={btnRef} className={`inline-flex ${fullWidth ? 'w-full' : ''}`}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} ref={buttonRef} className={`inline-flex ${fullWidth ? 'w-full' : ''}`} onClick={undefined}>
      {inner}
    </button>
  );
}
