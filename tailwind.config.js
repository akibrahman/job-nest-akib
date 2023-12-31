/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        theme: "#F0AA14",
        theme2: "#F9EC2F",
      },
      backgroundImage: {
        login: "url('/login.jpg')",
        banner: "url('/banner.jpg')",
        slide1: "url('/slide1.jpg')",
        slide2: "url('/slide2.jpg')",
        slide3: "url('/slide3.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
