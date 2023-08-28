import type { Preview } from "@storybook/react";

import "../dist/tw.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "default",
      values: [
        {
          name: "default",
          value: "var(--a-surface-default)",
        },
        {
          name: "god-praksis",
          value: "var(--a-surface-subtle)",
        },
        {
          name: "blogg",
          value: "var(--a-amber-50)",
        },
      ],
    },
  },
};

export default preview;
