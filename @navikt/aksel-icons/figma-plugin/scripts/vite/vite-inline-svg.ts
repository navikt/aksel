import fs from "fs";
import { Plugin } from "vite";

function svgToDataURL(svgStr: string) {
  const encoded = encodeURIComponent(svgStr)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");

  const header = "data:image/svg+xml,";
  const dataUrl = header + encoded;

  return dataUrl;
}

export default function (): Plugin {
  return {
    name: "vite-inline-svg",
    enforce: "pre",

    async load(id) {
      const [path, query] = id.split("?", 2);

      if (!path.endsWith(".svg")) return;
      if (query !== "inline") return;

      const svg = await fs.promises.readFile(path, "utf-8");
      return `export default "${svgToDataURL(svg)}"`;
    },
  };
}
