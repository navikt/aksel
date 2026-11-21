import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

/*
 * Firefox and WebKit can't launch inside the cplt sandbox used by Copilot CLI on macOS,
 * so agents only run Chromium. CI runs all three. Filter with `--browser.name=<browser>`.
 */
const browsers = process.env.COPILOT_CLI
  ? (["chromium"] as const)
  : (["chromium", "firefox", "webkit"] as const);

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: "./.storybook",
            tags: { exclude: ["skip-test"], include: ["play-fn"] },
            storybookScript: "yarn storybook --ci",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: browsers.map((browser) => ({
              browser,
              /*
               * Parallel WebKit pages interfere with each other's focus, so focus
               * assertions (e.g. Dialog mount focus) fail at random. Run WebKit files serially.
               */
              fileParallelism: browser !== "webkit",
            })),
          },
        },
      },
    ],
  },
});
