import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Cosmic Color Palette
        cosmic: {
          black: "var(--color-cosmic-black)",
          purple: "var(--color-nebula-purple)",
          yellow: "var(--color-starlight-yellow)",
          pink: "var(--color-aurora-pink)",
          white: "var(--color-milky-white)",
          deep: "var(--color-deep-purple)",
          muted: "var(--color-muted-lavender)",
        },
        // Legacy color mappings
        cosmos: "var(--color-cosmos)",
        nebula: "var(--color-nebula)",
        yellow: "var(--color-yellow)",
        pink: "var(--color-pink)",
        purple: "var(--color-purple)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      fontFamily: {
        artifika: ["var(--font-artfika)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, var(--color-cosmic-black) 0%, var(--color-nebula-purple) 100%)',
        'nebula-gradient': 'linear-gradient(135deg, var(--color-nebula-purple) 0%, var(--color-aurora-pink) 100%)',
      },
      boxShadow: {
        'cosmic-glow': '0 0 20px rgba(244, 197, 66, 0.4)',
        'nebula-glow': '0 0 20px rgba(90, 42, 130, 0.4)',
        'aurora-glow': '0 0 20px rgba(209, 84, 160, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
