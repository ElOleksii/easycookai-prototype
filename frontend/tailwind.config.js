import { defineConfig } from "vite";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#74512D",
        darkBrown: "#543310",
        mainBackground: "#F8F4E1",
        additionBackground: "#DED0B6",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        epilogue: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
});
