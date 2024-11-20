import avatar0 from "@/assets/photos/avatar0.webp";
import avatar1 from "@/assets/photos/avatar1.webp";
import avatar2 from "@/assets/photos/avatar2.webp";
import avatar3 from "@/assets/photos/avatar3.webp";
import avatar4 from "@/assets/photos/avatar4.webp";
import avatar5 from "@/assets/photos/avatar5.webp";
import avatar6 from "@/assets/photos/avatar6.webp";
import avatar7 from "@/assets/photos/avatar7.webp";
import avatar8 from "@/assets/photos/avatar8.webp";

const randomPhoto = () => {
  const photos = [
    avatar0,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
  ];

  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

// Exportar la función randomPhoto
export default randomPhoto;
