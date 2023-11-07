/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#F0AA14",
        theme2: "#F9EC2F",
      },
      backgroundImage: {
        login: "url('/login.jpg')",
      },
    },
  },
  plugins: [],
};
