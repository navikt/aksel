import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import inlineSvg from "./scripts/vite/vite-inline-svg";
import svgComponent from "./scripts/vite/vite-svgr-component";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgComponent(), inlineSvg(), viteSingleFile()],
  root: path.resolve(__dirname, "./src/ui/"),
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    rollupOptions: {
      input: {
        ui: path.relative(__dirname, "./src/ui/index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
