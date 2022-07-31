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
          600: '#ee5a52',
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
          450: '#555555',
          500: '#333333',
        },
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        blue: {
          500: '#1ea1f7',
          600: '#1f8ecd',
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
