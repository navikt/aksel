import { withThemeByClassName } from "@storybook/addon-themes";
import React, { useLayoutEffect } from "react";
import darksideCss from "@navikt/ds-css/darkside/index.css?inline";
import defaultCss from "@navikt/ds-css/index.css?inline";
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

const ModeDecorator = ({ children, mode }) => {
  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = mode === "darkside" ? darksideCss : defaultCss;
    document.head.appendChild(style);

    if (mode === "darkside") {
      document.body.style.setProperty("background", "var(--ax-bg-default)");
    }

    return () => {
      document.head.removeChild(style);
      document.body.style.removeProperty("background");
    };
  }, [mode]);

  return children;
};

export const decorators = [
  (StoryFn, context) => (
    <ModeDecorator mode={context.globals.mode}>
      <StoryFn />
    </ModeDecorator>
  ),
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];
