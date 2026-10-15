import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const allowedHosts = ["anime-search.lucasbroering.dev"];

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts,
    watch: {
      usePolling: process.env.CHOKIDAR_USEPOLLING === "true",
    },
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts,
  },
  build: {
    outDir: "build",
  },
});
