import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Civildz brand palette — engineering blue + construction amber
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Luxe palette: deep navy canvas + metallic gold.
        navy: {
          800: '#0f172a',
          900: '#0b1220',
          950: '#070b14',
        },
        gold: {
          300: '#e6c860',
          400: '#d4af37',
          500: '#c19a2e',
          600: '#a87f22',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
