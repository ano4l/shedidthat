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
          purple: "#7C3AED",
          "purple-light": "#A78BFA",
          "purple-dark": "#5B21B6",
          gold: "#D4A843",
          "gold-light": "#F5DEB3",
          "gold-dark": "#B8860B",
          cream: "#FDF8F2",
          "cream-dark": "#F0EAE0",
          charcoal: "#1A1A2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        lg: "0.75rem",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.04)",
        elevated: "0 4px 24px rgba(0, 0, 0, 0.08)",
        glow: "0 0 24px rgba(124, 58, 237, 0.15)",
      },
      letterSpacing: {
        editorial: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
