/** @type {import('tailwindcss').Config} */

const FONT_FAMILY_BASE = [
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Open Sans",
  "Helvetica Neue",
  "sans-serif",
];

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...FONT_FAMILY_BASE],
        roboto: ["Roboto", ...FONT_FAMILY_BASE],
      },
      colors: {
        primary: "#64433F",
        accent: "#41AC52",
        "text-light": "#FFFFFF",
        "text-dark": "#323232",
      },
      padding: {
        edge: "2.5%",
      },
    },
  },
  plugins: [],
};
