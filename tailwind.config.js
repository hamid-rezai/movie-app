/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Roboto", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        "background-color": "rgba(var(--background-color))",
        "navBack": "rgba(var(--nav-color))",
        "search-color": "rgba(var(--search-color))",
        primary: "rgba(var(--primary))",
        "primary-hover": "rgba(var(--primary-hover))",
        secondary: "rgba(var(--secondary))",
        "secondary-hover": "rgba(var(--secondary-hover))",
        "main-color":"rgb(var(--main-color))",
        "main-color-hover":"rgb(var(--main-color-hover))",
        "underline-color":"rgb(var(--underline-color))",
        "title-color":"rgb(var(--title-color))",
        error: "rgba(var(--error))",
        "form-color": "rgba(var(--form-color))",
        "input-color":"rgba(var(--input-color))",
        "input-text-color":"rgb(var(--input-text-color))",
        "placeholder-color":"rgb(var(--placeholder-color))",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
