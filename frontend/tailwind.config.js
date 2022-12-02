/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-pink" : "#FD789D"
      },
      width: {
        1200: "1200px",
      },
      fontSize: {
        normal: "16px"
      }
    },
  },
  plugins: [],
};
