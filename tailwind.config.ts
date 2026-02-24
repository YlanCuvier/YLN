import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: 'var(--color-night)',
        dusk: 'var(--color-dusk)',
        ash: 'var(--color-ash)',
        ivory: 'var(--color-ivory)',
        frost: 'var(--color-frost)',
        cold: 'var(--color-cold)',
        warm: 'var(--color-warm)',
      },
      fontFamily: {
        display: ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'monospace'],
        body: ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 20px 45px rgba(0, 0, 0, 0.55)',
        glow: '0 0 0 1px rgba(99, 212, 141, 0.35), 0 8px 36px rgba(99, 212, 141, 0.2)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(18px, -10px, 0)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        drift: 'drift 11s ease-in-out infinite',
        pulseLine: 'pulseLine 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
