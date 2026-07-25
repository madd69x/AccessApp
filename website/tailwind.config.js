/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        eq: {
          '0%': { height: '30%' },
          '100%': { height: '100%' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s infinite',
        eq: 'eq 1s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
