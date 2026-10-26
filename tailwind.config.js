/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#07090F",
        base: "#0B0F19",
        panel: "#121824",
        card: "#1A2333",
        border: "#1E2536",
        hairline: "#232938",
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
      },
    },
  },
  plugins: [],
};

