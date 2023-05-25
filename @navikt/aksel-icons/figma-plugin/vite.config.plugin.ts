import path from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    lib: {
      name: "Aksel Icons",
      entry: path.resolve(__dirname, "./src/plugin/plugin.ts"),
      fileName: "plugin",
      formats: ["es"],
    },
    emptyOutDir: false,
    outDir: path.resolve(__dirname, "./dist"),
  },
});
