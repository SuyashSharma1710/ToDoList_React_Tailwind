/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        /* Chrome, Edge, Safari */
        '::-webkit-scrollbar': {
          width: '5px',
        },
        '::-webkit-scrollbar-track': {
          background: 'rgb(51 65 85)',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#666',
          borderRadius: '2.5px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#888',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}

