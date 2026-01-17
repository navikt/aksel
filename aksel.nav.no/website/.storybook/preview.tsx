import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";
import { Box, Theme } from "@navikt/ds-react";
import "./aksel-storybook.css";

const withTheme = (Story: () => JSX.Element) => {
  return (
    <Theme hasBackground asChild>
      <Box padding="space-32" minHeight="100vh">
        <Story />
      </Box>
    </Theme>
  );
};

const preview: Preview = {
  parameters: {
    options: {
      // The `a` and `b` arguments in this function have a type of `import('storybook/internal/types').IndexEntry`.
      // @ts-expect-error - Cannot add types b.c. the function is executed in a JavaScript environment.
      storySort: (a, b) => {
        const aIndex = parseInt(a.name.split(" | ")[0], 10);
        const bIndex = parseInt(b.name.split(" | ")[0], 10);

        if (Number.isNaN(aIndex) || Number.isNaN(bIndex)) {
          return undefined;
        }

        return aIndex - bIndex;
      },
    },
    backgrounds: { disable: true },
    layout: "fullscreen",
  },
  decorators: [
    withTheme,
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
