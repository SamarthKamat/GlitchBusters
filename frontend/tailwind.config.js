/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bae3be',
          300: '#8ecd94',
          400: '#5eb167',
          500: '#2E7D32', // Primary green
          600: '#256c2a',
          700: '#1B5E20', // Dark green
          800: '#164619',
          900: '#113a15',
          950: '#082a0c',
        },
        secondary: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#FF8F00', // Primary amber
          600: '#fb8c00',
          700: '#F57C00', // Dark amber
          800: '#ef6c00',
          900: '#e65100',
          950: '#b54300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};