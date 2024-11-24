const randomPhoto = () => {
  const photos = [
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(1).jpg",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(1).png",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(2).jpg",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(3).jpg",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(4).jpg",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(5).jpg",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(6).jpg",
    "https://save-photos-pensamientos.s3.sa-east-1.amazonaws.com/static-avatars/Gatos+(7).jpg",
  ];

  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

// Exportar la función randomPhoto
export { randomPhoto };
