import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    /* We need to run with globals enabled to use features like `act` in testing-library */
    globals: true,
    setupFiles: "./tests/setup.ts",
    environment: "jsdom",
    typecheck: {
      enabled: true,
    },
  },
});
