import "@navikt/ds-css/dist/index.css";
import "@navikt/ds-css-internal/index.css";
import { initialize, mswDecorator } from "msw-storybook-addon";

initialize();

export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      method: "",
      order: [],
      locales: "",
    },
  },
};
