/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        titillium: ['"Titillium Web"', "sans-serif"],
      },
      colors: {
        primary: "#171717",
        white: "#FFFFFF",
      },
      aspectRatio: {
        "2/3": [2, 3],
      },
    },
  },
  variants: {
    extend: {},
  },
};
