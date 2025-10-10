import { withThemeByClassName } from "@storybook/addon-themes";
import { Preview } from "@storybook/nextjs";
import React, { useEffect, useLayoutEffect } from "react";
// @ts-expect-error - Temporary
import darksideCss from "../@navikt/core/css/darkside/index.css?inline";
// @ts-expect-error - Temporary
import defaultCss from "../@navikt/core/css/index.css?inline";
import { Provider } from "../@navikt/core/react/src/provider";
import { Theme } from "../@navikt/core/react/src/theme";
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
    <Theme theme={theme || undefined} hasBackground={false}>
      {children}
    </Theme>
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

const fonts = ["Source Sans 3", "Open Sans"];

const TypoDecorator = ({ children, font }) => {
  useEffect(() => {
    const fontVariable = fonts.includes(font) ? `"${font}", sans-serif` : null;
    document.body.style.setProperty("--ax-font-family", fontVariable);
    document.body.style.setProperty("--a-font-family", fontVariable);
  }, [font]);

  return children;
};

export default {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Docs",
          ["Getting started"],
          "ds-react",
          ["Primitives"],
          ["Default", "Controls"],
          "Aksel-icons",
        ],
      },
    },

    layout: "centered",
    backgrounds: { disable: true },

    docs: {
      codePanel: true,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  globalTypes: {
    mode: {
      name: "Darkside",
      toolbar: {
        items: [
          {
            value: "default",
            icon: "hourglass",
            title: "Legacy theme",
          },
          { value: "darkside", icon: "beaker", title: "Darkside theme" },
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
    font: {
      toolbar: {
        icon: "edit",
        items: fonts.map((font) => ({ value: font, title: font })),
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    mode: "default",
    font: "Source Sans 3",
  },

  decorators: [
    (StoryFn, context) => (
      <TypoDecorator font={context.globals.font}>
        <StoryFn />
      </TypoDecorator>
    ),
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
