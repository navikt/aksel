import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import path from "path";

type OptionsType = {
  baseURL: string;
  timeout: number;
  server: PlaywrightTestConfig["webServer"];
};

const PORT = 3000;

const opts: OptionsType = process.env.CI
  ? {
      /* Service container in e2e workflow action */
      baseURL: `http://testapp:${PORT}`,
      timeout: 30 * 1000,
      server: undefined,
    }
  : {
      baseURL: `http://localhost:${PORT}`,
      timeout: 120 * 2 * 1000,
      server: {
        command: "yarn dev",
        url: `http://localhost:${PORT}`,
        timeout: 120 * 1000,
        reuseExistingServer: true,
        stderr: "pipe",
        stdout: "pipe",
      },
    };

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, "e2e"),
  timeout: opts.timeout,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "blob" : "html",
  use: {
    baseURL: opts.baseURL,
    trace: "on-first-retry",
  },
  webServer: opts.server,
  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      testMatch: [/.*\.e2e\.(ts|tsx)/],
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: [/.*\.e2e\.(ts|tsx)/],
    },
  ],
};

export default config;
