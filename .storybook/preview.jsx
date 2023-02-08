import "@navikt/ds-css/index.css";
import "@navikt/ds-css-internal/index.css";
import "./layout.css";

export const parameters = {
  options: {
    storySort: {
      method: "",
      order: ["Intro", "ds-icons", "ds-react", ["form"], ["Default"]],
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
        name: "Darkmode",
        value: "#262626",
      },
    ],
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "circlehollow", title: "light" },
        { value: "dark", icon: "circle", title: "dark" },
      ],
      showName: true,
    },
  },
};

export const withTheme = (StoryFn, context) => (
  <div
    data-theme={context.parameters.theme || context.globals.theme || "light"}
    lang="no"
    id="root"
  >
    <StoryFn />
  </div>
);

export const decorators = [withTheme];
