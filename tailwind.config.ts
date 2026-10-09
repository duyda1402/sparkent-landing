import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#0A0A0A',
        surface: '#F6F6F4',
        sparkBlack: '#0A0A0A',
        sparkWhite: '#FFFFFF',
        sparkPurple: '#7C3AED',
        sparkPurpleDeep: '#5B21B6',
        sparkGray: '#666666',
        sparkBorder: '#E5E5E5',
        spark: {
          purple:    '#7C3AED',
          purpleDeep:'#5B21B6',
          black:     '#0A0A0A',
          white:     '#FFFFFF',
          surface:   '#F6F6F4',
          border:    '#E5E5E5',
          textMuted: '#666666',
          textDim:   '#8E8E93',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        condensed: [
          'Barlow Condensed',
          'Impact',
          'Arial Narrow',
          'sans-serif'
        ],
        display: [
          'Barlow Condensed',
          'Anton',
          'Impact',
          'sans-serif'
        ],
        tech: [
          'Space Grotesk',
          'monospace'
        ]
      },
      letterSpacing: {
        widest:  '.18em',
        wider:   '.12em',
        epic:    '.38em',
        ultra:   '.5em',
      },
      lineHeight: {
        loose:  '1.9',
        looser: '2.2',
      },
      boxShadow: {
        'spark-glow':    '0 0 35px rgba(139, 92, 255, 0.18), 0 0 70px rgba(139, 92, 255, 0.07)',
        'spark-glow-lg': '0 0 60px rgba(139, 92, 255, 0.28), 0 0 120px rgba(139, 92, 255, 0.10)',
        'spark-glow-sm': '0 0 18px rgba(139, 92, 255, 0.22)',
        'rose-glow':     '0 0 35px rgba(255, 139, 167, 0.12)',
        'inner-glow':    'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'pulse-slow':     'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse':     'glow-pulse 5s cubic-bezier(0.4,0,0.6,1) infinite',
        'float-gentle':   'float-gentle 6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'silk': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
