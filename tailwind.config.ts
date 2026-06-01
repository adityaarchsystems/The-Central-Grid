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
        canvas: "#06030a",         // Absolute solid midnight matte canvas canvas
        "surface-card": "#0b0714",   // Deep slate container base for active sandboxes
        "surface-inset": "#110c1e",  // Recessed input field backdrop block
        "border-low": "#120e1e",     // Base architectural 1px partition line
        "border-hover": "#221936",   // Subtle container glow expansion marker
        "accent-amethyst": "#c084fc", // System status triggers and core syntax strings
        "terminal-emerald": "#22c55e", // Validation confirmations and success flags
        "text-primary": "#ffffff",   // High-contrast title glyph text
        "text-muted": "#9ca3af",     // Descriptive narrative body color
        "text-blueprint": "#4b5563", // Secondary system telemetry metadata
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
