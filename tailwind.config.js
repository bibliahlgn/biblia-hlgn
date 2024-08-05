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
      screens: {
        md: "800px",
      },
    },
    data: {
      isnew: "isnew='true'",
      activelist: "activelist='true'",
      activeabout: "activeabout='true'",
      darktheme: "darktheme='true'",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
