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
        "3xl": "1.875rem",
        xs: "0.75rem", // Adjust the font size as needed
        // Add more sizes as needed
      },
      screens: {
        sm: "640px",
      },
      customClasses: {
        "background-gradient":
          "background: linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%)",
        // Add more custom classes as needed
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
