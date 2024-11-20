const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION, // tu región desde las variables de entorno
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID, // ID de acceso
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY, // Clave secreta
  },
};

const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME; //Nombre del bucket

export { awsConfig, bucketName };
