import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../build", // Save files in the plugin folder
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.notion.com", // The base URL for the Notion API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
