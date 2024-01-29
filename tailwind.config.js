/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tropical: "#3A865A",
      },
      borderRadius: {
        DEFAULT: "20px",
      },
    },
  },
  plugins: [],
};
