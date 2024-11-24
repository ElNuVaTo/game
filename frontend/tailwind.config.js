// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir todos los archivos React
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#040511",
          light: "rgba(4, 5, 17, 0.3)",
        },
        textShadow: {
          sm: "0 1px 2px var(--tw-shadow-color)",
          DEFAULT: "0 2px 4px var(--tw-shadow-color)",
          lg: "0 8px 16px var(--tw-shadow-color)",
        },
      },
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
