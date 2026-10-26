/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target:
      process.env.TAURI_ENV_PLATFORM == "windows" ||
      process.env.TAURI_PLATFORM == "windows" ||
      process.platform == "win32"
        ? "chrome105"
        : "safari14",
    minify: !process.env.TAURI_DEBUG && !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    sourcemap: !!(process.env.TAURI_DEBUG || process.env.TAURI_ENV_DEBUG),
  },
});

