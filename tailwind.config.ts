import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy canvas
        navy: {
          950: '#060b1a',
          900: '#0a1227',
          800: '#0f1b38',
          700: '#16244a',
        },
        // Brand accents
        brand: {
          blue: '#3b82f6',
          glow: '#60a5fa',
        },
        gold: {
          DEFAULT: '#d4af37',
          soft: '#e7c873',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(2, 6, 23, 0.55)',
        'glow-blue': '0 0 24px -4px rgba(96, 165, 250, 0.45)',
        'glow-gold': '0 0 24px -6px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'radial-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(6,11,26,0) 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
