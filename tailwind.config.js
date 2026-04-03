/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14D095',
        'primary-dark': '#11A071',
        dark: '#31102C',
        neutral: '#F4F4F4',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
