/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: "repeat(auto-fill, minmax(220px, 1fr))",
        ep: "repeat(auto-fill, 96px)"
      }
    },
  },
  plugins: [],
}