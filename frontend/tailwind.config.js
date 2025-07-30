/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B264F",//Bleu marine
        primaryLight: "#F5F5F5",//Blanc Cassé
        secondary: "#2F4F4F",//Gris anthracite
        tertiary: "#E8B4B8",//Rose poudré
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#l4l4l4",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/hero.png)",
        banner: "url(/src/assets/banner.png)"
      }
    },
  },
  plugins: [],
}