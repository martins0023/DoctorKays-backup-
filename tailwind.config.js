/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5115B3",
        primarydark: "#1f0150",
        secondary: "#2356D3",
      },
    },
  },
  plugins: [],
};
