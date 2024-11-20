import { defineConfig } from "vite";
import path from 'path';
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permite que el servidor acepte conexiones externas
    port: 5173, // Puedes cambiar el puerto si es necesario
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
