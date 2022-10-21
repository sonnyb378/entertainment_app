/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {   
    extend: {
      colors: {
        primary: "#0D213C",
        btnprimary: "#4E73A5",
        btnhighlight: "#466691",
        textprimary: "#EDEDED",
        inputtextprimary: "#9F9F9F",
      },
    },
  },
  plugins: [],
};
