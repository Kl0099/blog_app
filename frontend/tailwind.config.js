/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./utility/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xl": "1.5rem", // Adjust the font size as needed
        "3xl": "1.875rem", // Adjust the font size as needed
        // Add more sizes as needed
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
