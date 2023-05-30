import { createFilter, FilterPattern } from "@rollup/pluginutils";
import type { Config } from "@svgr/core";
import fs from "fs";
import type { Plugin } from "vite";
import { transformWithEsbuild } from "vite";

export interface ViteSvgrOptions {
  svgrOptions?: Config;
  esbuildOptions?: Parameters<typeof transformWithEsbuild>[2];
  exclude?: FilterPattern;
  include?: FilterPattern;
}

export default function viteSvgr({
  svgrOptions,
  esbuildOptions,
  include = "**/*.svg?component",
  exclude,
}: ViteSvgrOptions = {}): Plugin {
  const filter = createFilter(include, exclude);

  return {
    name: "vite-svgr-component",

    async transform(code, id) {
      if (filter(id)) {
        const { transform } = await import("@svgr/core");
        const svgCode = await fs.promises.readFile(
          id.replace(/\?.*$/, ""),
          "utf8"
        );

        const componentCode = await transform(svgCode, svgrOptions, {
          filePath: id,
          caller: { previousExport: null },
        });

        const res = await transformWithEsbuild(componentCode, id, {
          loader: "jsx",
          ...esbuildOptions,
        });

        return {
          code: res.code,
          map: null,
        };
      }
    },
  };
}
