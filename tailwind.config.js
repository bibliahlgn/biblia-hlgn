/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--accent))",
        accent_fg: "hsl(var(--accent-foreground))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted_fg: "hsl(var(--muted-foreground))",
        border_clr: "hsl(var(--borders))",
      },
    },
    data: {
      isnew: "isnew='true'",
      activelist: "activelist='true'",
      visiblecontent: "visiblecontent='true'",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
