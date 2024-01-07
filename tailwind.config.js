/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // text: "#082b2b",
        // background: "#dcf9f9",
        // primary: "#e46767",
        // secondary: "#f4f4c2",
        // accent: "#c72323",
        text: "#e9e7e9",
        background: "#0f0b10",
        primary: "#c3a1cb",
        secondary: "#6e337c",
        accent: "#ac43c7",
      },
    },
  },
  plugins: [],
};
