import "@navikt/ds-css/index.css";
import "@navikt/ds-css-internal/index.css";
import "@navikt/ds-css-navno/index.css";
import "./layout.css";
import { initialize, mswDecorator } from "msw-storybook-addon";

initialize();

export const decorators = [mswDecorator];

export const parameters = {
  /* actions: { argTypesRegex: "^on[A-Z].*" }, */
  options: {
    storySort: {
      method: "",
      order: ["ds-icons", "ds-react", ["Default"]],
      locales: "",
    },
  },
  viewMode: "docs",
  layout: "centered",
};
