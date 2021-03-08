import "nav-frontend-core";
import "@navikt/ds-css/index.css"; /* Unngår å bruke minified versjon lokalt */
import "@navikt/ds-tokens";

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
