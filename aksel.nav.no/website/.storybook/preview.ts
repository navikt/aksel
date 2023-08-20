import type { Preview } from "@storybook/react";

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
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
  },
};

export default preview;
