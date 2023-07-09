/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "45rem": "45rem",
        "25rem": "25rem",
        "12.5rem": "12.5rem",
      },
    },
  },
  plugins: [],
};
