const randomPhoto = () => {
  const baseUrl =
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/";
  const photoNames = [
    "Gatos+(1).jpg",
    "Gatos+(1).png",
    "Gatos+(2).jpg",
    "Gatos+(3).jpg",
    "Gatos+(4).jpg",
    "Gatos+(5).jpg",
    "Gatos+(6).jpg",
    "Gatos+(7).jpg",
  ];

  const randomIndex = Math.floor(Math.random() * photoNames.length);
  return `${baseUrl}${photoNames[randomIndex]}`;
};

// Exportar la función randomPhoto
export { randomPhoto };
