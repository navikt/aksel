import { withThemeByClassName } from "@storybook/addon-themes";
import { Preview } from "@storybook/react";
import React, { useLayoutEffect } from "react";
// @ts-expect-error - Temporary
import darksideCss from "@navikt/ds-css/darkside/index.css?inline";
// @ts-expect-error - Temporary
import defaultCss from "@navikt/ds-css/index.css?inline";
import {
  Provider,
  UNSAFE_AkselTheme,
} from "../@navikt/core/react/src/provider";
import en from "../@navikt/core/react/src/util/i18n/locales/en";
import nb from "../@navikt/core/react/src/util/i18n/locales/nb";
import nn from "../@navikt/core/react/src/util/i18n/locales/nn";
import "./layout.css";

const ModeDecorator = ({ children, mode, theme }) => {
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

  return mode === "darkside" ? (
    <UNSAFE_AkselTheme theme={theme || undefined} hasBackground={false}>
      {children}
    </UNSAFE_AkselTheme>
  ) : (
    children
  );
};

const translations = {
  nb,
  nn,
  en,
};

const LanguageDecorator = ({ children, language }) => {
  if (language) {
    return (
      <Provider translations={translations[language]}>{children}</Provider>
    );
  }
  return children;
};

export default {
  parameters: {
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
  },

  globalTypes: {
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
    language: {
      toolbar: {
        icon: "globe",
        items: [
          { value: undefined, title: "Unset" },
          { value: "nb", right: "🇳🇴", title: "Norsk bokmål" },
          { value: "nn", right: "🇳🇴", title: "Norsk nynorsk" },
          { value: "en", right: "🇬🇧", title: "English" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    mode: "default",
  },

  decorators: [
    (StoryFn, context) => (
      <ModeDecorator mode={context.globals.mode} theme={context.globals.theme}>
        <StoryFn />
      </ModeDecorator>
    ),
    (StoryFn, context) => (
      <LanguageDecorator language={context.globals.language}>
        <StoryFn />
      </LanguageDecorator>
    ),
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
} satisfies Preview;
