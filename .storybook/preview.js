import "@navikt/ds-css/index.css";
import "@navikt/ds-css-internal/index.css";
import "./layout.css";

export const parameters = {
  /* actions: { argTypesRegex: "^on[A-Z].*" }, */
  options: {
    storySort: {
      method: "",
      order: ["Intro", "ds-icons", "ds-react", ["Default"]],
      locales: "",
    },
  },
  viewMode: "docs",
  layout: "centered",
  backgrounds: {
    default: "Canvas",
    values: [
      {
        name: "Canvas",
        value: "#ffffff",
      },
      {
        name: "Alternate",
        value: "#f7f7f7",
      },
      {
        name: "Inverted",
        value: "#292929",
      },
    ],
  },
};
