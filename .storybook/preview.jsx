import { withThemeByClassName } from "@storybook/addon-themes";
import React from "react";
import { DarkSideDekorator } from "./PreviewDarkside";
import { DefaultDekorator } from "./PreviewDefault";
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
  backgrounds: { disable: true },
};

export const globalTypes = {
  mode: {
    name: "Darkside",
    toolbar: {
      items: [
        {
          value: "default",
          icon: "hourglass",
          title: "Default (old)",
        },
        { value: "darkside", icon: "beaker", title: "Darkside (new)" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const initialGlobals = {
  mode: "default",
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (StoryFn, context) => {
    return (
      <div>
        {context.globals.mode === "darkside" ? (
          <DarkSideDekorator>
            <StoryFn />
          </DarkSideDekorator>
        ) : (
          <DefaultDekorator>
            <StoryFn />
          </DefaultDekorator>
        )}
      </div>
    );
  },
];
