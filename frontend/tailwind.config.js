// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir todos los archivos React
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "21/9": "21 / 9",
        "3/2": "3 / 2",
      },
      backgroundImage: {
        "swiper-shadow-l":
          "linear-gradient(to right, #040511, rgba(4, 5, 17, 0.3), transparent)",
        "swiper-shadow-r":
          "linear-gradient(to left, #040511, rgba(4, 5, 17, 0.3), transparent)",
      },
    },
  },
  plugins: [],
};
