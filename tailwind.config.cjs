const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        bg: '#eaeaea',
        good: '#2daf7f',
        best: '#1f8ecd',
        death: '#c6443e',
        perfect: '#e19205',
        goodRatio: '#c6443e',
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        red: {
          300: '#d6b5b2',
          350: '#c0aba8',
          400: '#ec4f48',
          440: '#e89c95',
          450: '#bf3b36',
          460: '#cb9e9a',
          500: '#c8817c',
          600: '#ee5a52',
          700: '#d0021b',
        },
        white: colors.white,
        gray: {
          50: '#f2f2f2',
          150: '#ededed',
          100: '#d8d8d8',

          200: '#e0e3e3',
          300: '#d0d3d4',
          380: '#999999',
          350: '#cdd2d2',
          400: '#727272',
          430: '#666666',

          440: '#555e5e',
          450: '#555555',
          500: '#333333',
          600: '#222727',
        },
        purple: {
          400: '#8c51c5',
          450: '#7f3590',
        },
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        blue: {
          300: '#b0ceea',
          350: '#a1b8cd',
          440: '#7fb0e1',
          460: '#7aa5c3',
          490: '#549dc7',
          500: '#1ea1f7',
          600: '#1f8ecd',
          700: '#2c709b',
        },
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
        helveticaBold: ['Helvetica-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
