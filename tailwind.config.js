/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:    "#1F4E79",
        vmblue:  "#2E75B6",
        vmgreen: "#37864B",
        vmorange:"#C55A11",
        vmgold:  "#7F6000",
      },
    },
  },
  plugins: [],
}
