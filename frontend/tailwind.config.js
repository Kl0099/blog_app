/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./utility/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "2xl": "1.5rem", // Adjust the font size as needed
        "3xl": "1.875rem",
        xs: "0.75rem", // Adjust the font size as needed
        // Add more sizes as needed
      },
      screens: {
        sm: "640px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
