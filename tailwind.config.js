/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F48024',
        secondary: '#007791',
        dark: '#0a0e27',
      },
    },
  },
  plugins: [],
}
