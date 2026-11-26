import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

/*
 * Firefox and WebKit can't launch inside the cplt sandbox used by Copilot CLI on macOS,
 * so agents only run Chromium. CI runs all three. Filter with `--browser.name=<browser>`.
 */
const browsers = process.env.COPILOT_CLI
  ? (["chromium"] as const)
  : (["chromium", "firefox", "webkit"] as const);

/*
 * `storybookTest` includes every story file from `.storybook/main.ts`
 * even when most contain 0 `play` functions. Filtering `test.include` avoids booting
 * empty browser iframes for visual-only stories (reducing runtime).
 */
function onlyStoryFilesWithPlay() {
  return {
    name: "aksel:filter-story-files-with-play",
    config: {
      order: "post" as const,
      handler(config: { test?: { include?: string[] } }) {
        if (!config.test?.include) {
          return;
        }
        config.test.include = config.test.include.filter((file) => {
          try {
            return /\bplay\b/.test(readFileSync(resolve(file), "utf8"));
          } catch {
            return true;
          }
        });
      },
    },
  };
}

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
          onlyStoryFilesWithPlay(),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: browsers.map((browser) => {
              return {
                browser,
                /*
                 * Parallel WebKit pages interfere with each other's focus, so focus
                 * assertions (e.g. Dialog mount focus) fail at random. Run WebKit files serially.
                 */
                fileParallelism: browser !== "webkit",
                provider:
                  browser === "chromium"
                    ? playwright({
                        launchOptions: { args: ["--font-render-hinting=none"] },
                      })
                    : undefined,
              };
            }),
          },
        },
      },
    ],
  },
});
