/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        olive: {
          50: '#fafaf0',
          100: '#f5f5e0',
          200: '#e6e6c6',
          300: '#d5d6a8',
          400: '#b9bc78',
          500: '#9a9d57',
          600: '#7c7d40',
          700: '#5c5d31',
          800: '#3c3d20',
          900: '#1f1f10',
        },
      },
    },
  },
  plugins: [],
}