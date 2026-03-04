import { withThemeByClassName } from "@storybook/addon-themes";
import { Preview } from "@storybook/react-vite";
import React, { useEffect } from "react";
import "../@navikt/core/css/src/data-table.css";
import "../@navikt/core/css/src/data-token-filter.css";
import "../@navikt/core/css/src/data-toolbar.css";
import "../@navikt/core/css/src/index.css";
import "../@navikt/core/css/src/listbox.css";
import { Provider } from "../@navikt/core/react/src/provider";
import { Translations } from "../@navikt/core/react/src/utils/i18n/i18n.types";
import { en, nb, nn } from "../@navikt/core/react/src/utils/i18n/locales";
import "./layout.css";

type Language = "nb" | "nn" | "en";
const locales: Record<Language, Translations> = {
  nb,
  nn,
  en,
};

const LanguageDecorator = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Language | undefined;
}) => {
  useEffect(() => {
    document.documentElement.lang = lang || "nb";
  }, [lang]);

  return (
    <Provider locale={lang ? locales[lang] : undefined}>{children}</Provider>
  );
};

const fonts = ["Source Sans 3", "Open Sans"];

const TypoDecorator = ({
  children,
  font,
}: {
  children: React.ReactNode;
  font: string;
}) => {
  useEffect(() => {
    const fontVariable = fonts.includes(font) ? `"${font}", sans-serif` : null;
    document.body.style.setProperty("--ax-font-family", fontVariable);

    return () => {
      document.body.style.removeProperty("--ax-font-family");
    };
  }, [font]);

  return <>{children}</>;
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
      <LanguageDecorator lang={context.globals.language}>
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
