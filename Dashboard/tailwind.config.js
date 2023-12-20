/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgnetflix: "#18171A",
        primary: "#EDEDEA",
        secondary: "#BFBDBC",
        greenuin: "#438D6E",
        yellowuin: "#FFDE59",
      },
      fontSize: {
        title: "40px",
        smtitle: "28px",
        subtitle: "20px",
        smsubtitle: "18px",
        tprimary: "18px",
        smtprimary: "15px",
      },
    },
  },
  plugins: [],
};
