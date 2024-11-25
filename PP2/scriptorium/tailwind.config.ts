import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables manual class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#132D5F", // Your custom light theme primary color
          dark: "#0f2440", // Your custom dark theme primary color
        },
        background: {
          light: "#e6f0ff", // Light mode background
          dark: "#1a1a1a", // Dark mode background
        },
        overlay:{
          light: "#ffffff",
          dark: "#2d2d2d",
        },
        text: {
          light: "#000000", // Light mode text
          dark: "#ffffff", // Dark mode text
        },
        border: {
          light: "#d1d5db", // Light mode border
          dark: "#374151", // Dark mode border
        },
      },
    },
  },
  plugins: [],
};
export default config;
