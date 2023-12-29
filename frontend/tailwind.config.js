/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        extraSmall: "540px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1900px",
      },
    },

    screens: {
      xs: "480px",
      extraSmall: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },

    // custom colors
    colors: {
      "bg-primary": "#179A8D",
      "bg-secondary": "#F7FAFC",
      "bg-white": "#FFFFFF",
      "text-primary": "#179A8D",
      "text-secondary": "#F7FAFC",
      "text-white": "#FFFFFF",
      "text-darkBlue": "#063B6E",
    },
  },
  plugins: [require("daisyui")],
});
