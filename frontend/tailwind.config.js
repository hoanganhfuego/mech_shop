/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#ff385c",
        "primary-pink": "#FD789D",
        "primary-grey": "#f6f7fa",
        "primary-blue": "#e8ffff",
        "primary-black": "#0068b7",
      },
      width: {
        1200: "1200px",
      },
      fontSize: {
        normal: "16px",
      },
      aspectRatio: {
        image: "271/257",
      },
    },
  },
  plugins: [],
};
