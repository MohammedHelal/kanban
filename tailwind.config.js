/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/util/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    colors: {
      darkPurple: "#635fc7",
      lightPurple: "#a8a4ff",

      black: "#000112",
      magnumGrey: "#20212c",

      darkGrey: "#2b2c37",
      grey: "#3e3f4e",

      platinum: "#828fa3",
      greyBlue: "#e4ebfa",

      light: "#f4f7fd",
      white: "#ffffff",

      orange: "#ea5555",
      lightOrange: "#ff9898",
    },
  },
};
export const plugins = [];
