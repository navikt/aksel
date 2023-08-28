import "@navikt/ds-css/index.css";
import "./layout.css";

export const parameters = {
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Intro", "ds-react", ["form"], ["Default"], "ds-icons"],
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
        value: "#23262a",
      },
    ],
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
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
