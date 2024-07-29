/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    data: {
      isnew: "isnew='true'",
      activelist: "activelist='true'",
      visiblecontent: "visiblecontent='true'",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
