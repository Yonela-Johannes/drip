/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js',],
  plugins: [
    // ...
    require('flowbite/plugin'),
  ],
  theme: {
    extend: {
      colors: {
        black: '#282828',
        background: '#181818',
        lgray: '#46494C',
        mdgray: '#989898',
        dgray: '#686868',
        cl: '#DCDCDD',
        red: '#E50914',
        pink: '#E94335',
        pink1: '#E94335',
        pink2: '#E94335',
        white: '#DCDCDD'
      },
      animation: {
        slideup: 'slideup 1s ease-in',
        slidedown: 'slidedown 1s ease-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
  },
};
