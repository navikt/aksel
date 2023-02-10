import "@navikt/ds-css/index.css";
import "@navikt/ds-css-internal/index.css";
import "./layout.css";

export const parameters = {
  options: {
    storySort: {
      method: "",
      order: ["Intro", "ds-react", ["form"], ["Default"], "ds-icons"],
      locales: "",
    },
  },
  layout: "centered",
  backgrounds: {
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

export const withTheme = (StoryFn, context) => {
  if (
    context.parameters.fileName.startsWith("./@navikt") &&
    document.querySelector('[data-vite-dev-id$="dist/tw.css"]')
  ) {
    return (
      <div
        data-theme={
          context.parameters.theme || context.globals.theme || "light"
        }
        lang="no"
        id="root"
      >
        <div>
          OBS! Ser ut som stylesheet-fra aksel.nav.no er lastet. Refresh siden!
        </div>
        <StoryFn />
      </div>
    );
  }
  return (
    <div
      data-theme={context.parameters.theme || context.globals.theme || "light"}
      lang="no"
      id="root"
    >
      <StoryFn />
    </div>
  );
};

export const decorators = [withTheme];
