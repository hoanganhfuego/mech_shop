/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-pink": "#FD789D",
        "primary-grey": "#f6f7fa",
        "primary-blue": "#e8ffff",
      },
      width: {
        1200: "1200px",
      },
      fontSize: {
        normal: "16px",
      },
    },
  },
  plugins: [],
};
