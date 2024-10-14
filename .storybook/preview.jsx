import { withThemeByClassName } from "@storybook/addon-themes";
import React from "react";
import "@navikt/ds-css/index.css";
import "./layout.css";

export const parameters = {
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Getting started",
        "ds-react",
        ["Primitives"],
        ["Default", "Controls"],
        "Aksel-icons",
      ],
    },
  },
  layout: "centered",
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (StoryFn) => (
    <div style={{ background: "var(--a-bg-default) !important" }}>
      <StoryFn />
    </div>
  ),
];
