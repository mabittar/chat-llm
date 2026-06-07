/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        base1: '#41436A',
        base2: '#984063',
        accent1: '#F64668',
        accent2: '#FE9677',
      },
      fontFamily: {
        sans: ['Sora', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
