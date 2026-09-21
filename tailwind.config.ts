import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '390px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        vanta: {
          black: '#0a0a0b',
          charcoal: '#151517',
          graphite: '#232326',
          steel: '#3d3d41',
          mist: '#8a8a8f',
          fog: '#c8c8cb',
          bone: '#f2f0ec',
          white: '#faf9f6',
          ember: '#c94b2d',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(2.25rem, 10vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-2': ['clamp(1.9rem, 6.5vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-3': ['clamp(1.75rem, 4.5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-4': ['clamp(1.5rem, 2.8vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        vanta: 'cubic-bezier(0.65, 0, 0.15, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        content: '1680px',
      },
    },
  },
  plugins: [],
} satisfies Config
