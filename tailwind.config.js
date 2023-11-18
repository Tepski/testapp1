/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#082b2b",
        background: "#dcf9f9",
        primary: "#e46767",
        secondary: "#f4f4c2",
        accent: "#c72323",
      },
    },
  },
  plugins: [],
};
