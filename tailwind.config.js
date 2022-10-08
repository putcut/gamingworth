/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#1da1f2',
        twitterHover: '#0c87cf'
      }
    },
  },
  plugins: [],
}
