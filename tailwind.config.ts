import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        sans: ['var(--font-open-sans)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        // P4P Official Brand Colors
        p4p: {
          black: '#1C1C1C',
          'black-deep': '#0F0F0F',
          orange: '#F27A21',
          'orange-light': '#F9A45A',
          'orange-glow': '#FCBE8A',
          charcoal: '#2A2A2A',
          white: '#FFFFFF',
        },
        // Legacy mappings for gradients
        orange: {
          DEFAULT: '#F27A21',
          light: '#F9A45A',
          glow: '#FCBE8A',
          400: '#F9A45A',
          500: '#F27A21',
          600: '#D66A1A',
        },
        // Background colors
        slate: {
          900: '#0F0F0F',
          800: '#1C1C1C',
          700: '#2A2A2A',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'aurora': 'aurora 15s ease-in-out infinite',
        'float': 'float 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(5%, -5%) rotate(5deg) scale(1.1)' },
          '66%': { transform: 'translate(-5%, 5%) rotate(-5deg) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, -50px) scale(1.05)' },
          '50%': { transform: 'translate(-30px, 30px) scale(0.95)' },
          '75%': { transform: 'translate(30px, 50px) scale(1.02)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
