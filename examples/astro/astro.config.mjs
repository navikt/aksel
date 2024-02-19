import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
