/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'handwriting': ['Dancing Script', 'cursive'],
      },
      colors: {
        // Refined color palette for an elegant wedding theme
        'champagne': {
          50: '#FFFDF8',
          100: '#FFF9E8',
          200: '#FFF0D0',
          300: '#FFE7B8',
          400: '#FFD98F',
          500: '#FFCB66',
          600: '#EAB455',
          700: '#D49D44',
          800: '#A67934',
          900: '#856024',
        },
        'blush': {
          50: '#FEF2F4',
          100: '#FDE6EA',
          200: '#FBCCD5',
          300: '#F8B3C0',
          400: '#F699AB',
          500: '#F37F96',
          600: '#E56B83',
          700: '#C15670',
          800: '#9D425D',
          900: '#792E4A',
        },
        'sage': {
          50: '#F2F5F2',
          100: '#E6EBE6',
          200: '#CDD7CD',
          300: '#B4C3B4',
          400: '#9BAF9B',
          500: '#829B82',
          600: '#6B846B',
          700: '#546D54',
          800: '#3D563D',
          900: '#263F26',
        },
        'navy': {
          50: '#F0F4F8',
          100: '#E1E8F0',
          200: '#C3D1E2',
          300: '#A5BAD3',
          400: '#87A3C5',
          500: '#698CB7',
          600: '#4B75A9',
          700: '#2D5E9B',
          800: '#0F478D',
          900: '#00307F',
        },
        'wine': {
          50: '#FAF2F4',
          100: '#F5E6EA',
          200: '#EBCCD5',
          300: '#E0B3C0',
          400: '#D699AB',
          500: '#CB7F96',
          600: '#B85D7A',
          700: '#9D4A65',
          800: '#7A3750',
          900: '#57243B',
        },
      },
      backgroundImage: {
        'elegant-gradient': 'linear-gradient(to bottom, rgba(255, 249, 232, 0.5), rgba(255, 255, 255, 0.8))',
        'subtle-pattern': 'radial-gradient(circle, transparent 20%, #f8f8f8 20%, #f8f8f8 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #f8f8f8 20%, #f8f8f8 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#f1f1f1 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #f1f1f1 2px, #f8f8f8 2px) -1px 0',
      },
      boxShadow: {
        'elegant': '0 4px 15px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
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
      },
    },
  },
  plugins: [],
}