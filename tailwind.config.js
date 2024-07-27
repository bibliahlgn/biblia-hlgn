/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    data: {
      menustatus: "menustatus='open'",
      isnew: "isnew='true'",
    },
  },
  plugins: [],
};
