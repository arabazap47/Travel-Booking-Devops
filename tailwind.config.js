/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff5a5f",
        accent: "#00a699"
      }
    },
  },
  plugins: [],
}
