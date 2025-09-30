import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs";
import { Box, Theme } from "@navikt/ds-react";
import "./aksel-storybook.css";

export const globalTypes = {
  mode: {
    name: "Darkside",
    defaultValue: "darkside",
    toolbar: {
      icon: "paintbrush",
      showName: true,
      dynamicTitle: true,
      items: [
        { value: "legacy", title: "Legacy CSS" },
        { value: "darkside", title: "Darkside CSS" },
      ],
    },
  },
};

const withDarkside = (Story: () => JSX.Element, context: any) => {
  const isDarkside = context.globals.mode === "darkside";

  if (isDarkside) {
    return (
      <Theme hasBackground>
        <Box padding="space-16">
          <Story />
        </Box>
      </Theme>
    );
  }
  return (
    <div>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    options: {
      // The `a` and `b` arguments in this function have a type of `import('storybook/internal/types').IndexEntry`.
      // @ts-expect-error - Cannot add types b.c. the function is executed in a JavaScript environment.
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
  decorators: [
    withDarkside,
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
