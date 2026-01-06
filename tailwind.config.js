/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"  // <-- make sure HeroSection.jsx is inside ./src
  ],
  theme: {
    extend: {
      colors: {
        "gophora-black": "#0a0514",
        "gophora-white": "#ffffff",
        "gophora-aerospaceOrange": "#f54e1e",
        "gophora-darkCharcoal": "#1c1c1c"
      },
    },
  },
  plugins: [],
};
