import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#4A0E17",
          darkRed: "#2A080C",
          accent: "#ff1838",
          gold: "#D4AF37",
          cream: "#FAF6F0",
          creamMuted: "#E3DAC9",
          charcoal: "#0D0D0D",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
