import type { Preview } from "@storybook/react";
import React from "react";
import "../dist/tw.css";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      showName: true,
      dynamicTitle: true,
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
    },
  },
};

const withTheme = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme || "light";

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Story />
    </div>
  );
};

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
    options: {
      storySort: (a, b) => {
        const aIndex = parseInt(a.name.split(" | ")[0]);
        const bIndex = parseInt(b.name.split(" | ")[0]);

        if (Number.isNaN(aIndex) || Number.isNaN(bIndex)) {
          return undefined;
        }

        return aIndex - bIndex;
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
