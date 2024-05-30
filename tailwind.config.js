/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1240px",
      xl: "1440px",
      "2xl": "1720px",
    },
    extend: {
      colors: {
        theme:"#4448F5", // main theme color
        // theme:"#0F4AE1", // main theme color
        "theme-c2":"#D9DDF0", // button color 2
        "theme-c3":"#7D838E", // sidebar color
        "theme-c4":"#3C76D8", // login left side color
        "theme-c5":"#E9EDEF", // login left side color
        "theme-c6":"#b8bcf1", // Tabs Borders color
        "theme-c7":"#162E4C", // Tabs Borders color
      }
    },
  },
  plugins: [],
})

