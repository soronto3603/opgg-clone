const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#eaeaea',
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: {
          100: '#d8d8d8',
          200: '#e0e3e3',
          300: '#d0d3d4',
          400: '#727272',
        },
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        blue: {
          500: '#1ea1f7',
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
