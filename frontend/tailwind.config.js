/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tec-blue': '#0039a6',
        'tec-blue-dark': '#002d7a',
        'tec-blue-light': '#0052d4',
      },
    },
  },
  plugins: [],
}

