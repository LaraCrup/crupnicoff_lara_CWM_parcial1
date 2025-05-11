// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",  // Esto es crucial para que Tailwind detecte tus clases
    ],
    theme: {
      extend: {
        colors: {
          darkGreen: '#1B4332',
          midGreen: '#52B788',
          lightGreen: '#D8F3DC',
          darkPink: '#F26A8D',
          lightPink: '#F49CBB',
          dark: '#101B15',
          light: '#F0F8F1'
        },
      },
    },
    plugins: [],
  }
  