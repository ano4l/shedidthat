import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: "#B76E79",
          "rose-light": "#D4919A",
          "rose-lighter": "#F0C4CA",
          "rose-dark": "#9A5560",
          "rose-deep": "#7D3E48",
          gold: "#C2956B",
          "gold-light": "#DDBF9A",
          "gold-dark": "#A07845",
          charcoal: "#2D2926",
          "charcoal-light": "#4A4543",
          muted: "#7A7370",
          cream: "#FBF8F6",
          "cream-dark": "#F3EDE9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)",
        elevated: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)",
        glow: "0 0 40px rgba(183, 110, 121, 0.15)",
        "glow-rose": "0 0 60px rgba(183, 110, 121, 0.12)",
        "glow-soft": "0 0 80px rgba(183, 110, 121, 0.08), 0 0 20px rgba(183, 110, 121, 0.06)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15)",
        "glass-lg": "0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)",
        "glass-hover": "0 16px 48px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(255, 255, 255, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.25)",
        "glass-rose": "0 8px 32px rgba(183, 110, 121, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(183, 110, 121, 0.08)",
        "glass-inner": "inset 0 2px 6px rgba(255, 255, 255, 0.7), inset 0 -2px 6px rgba(0, 0, 0, 0.03)",
      },
      letterSpacing: {
        editorial: "0.15em",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
    },
  },
  plugins: [],
};
export default config;
