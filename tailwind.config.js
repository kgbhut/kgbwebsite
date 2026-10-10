/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f2f5fa",
          100: "#e3e9f3",
          200: "#c5d1e5",
          300: "#9aaecf",
          400: "#6b84b3",
          500: "#4a6396",
          600: "#384d7c",
          700: "#2c3d63",
          800: "#1e2b48",
          900: "#14203a",
          950: "#0b1426",
        },
        gold: {
          50: "#fbf7ec",
          100: "#f5ecd0",
          200: "#ecd9a3",
          300: "#e0c06f",
          400: "#d4a94a",
          500: "#c0913a",
          600: "#a4762f",
          700: "#835a28",
        },
        ink: "#1c2333",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      maxWidth: {
        site: "78rem",
      },
    },
  },
  plugins: [],
};
