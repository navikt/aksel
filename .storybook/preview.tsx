import addonPerformancePanel from "@github-ui/storybook-addon-performance-panel";
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import addonThemes, { withThemeByClassName } from "@storybook/addon-themes";
import addonVitest from "@storybook/addon-vitest";
import { definePreview } from "@storybook/react-vite";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../@navikt/core/css/src/data-token-filter.css";
import dataTokenFilterStyles from "../@navikt/core/css/src/data-token-filter.css?inline";
import "../@navikt/core/css/src/data-toolbar.css";
import dataToolbarStyles from "../@navikt/core/css/src/data-toolbar.css?inline";
import "../@navikt/core/css/src/index.css";
import dsStyles from "../@navikt/core/css/src/index.css?inline";
import "../@navikt/core/css/src/listbox.css";
import listboxStyles from "../@navikt/core/css/src/listbox.css?inline";
import { Provider } from "../@navikt/core/react/src/provider";
import type { Translations } from "../@navikt/core/react/src/utils/i18n/i18n.types";
import { en, nb, nn } from "../@navikt/core/react/src/utils/i18n/locales";
import "./layout.css";

type Language = "nb" | "nn" | "en";
type WebComponentMode = "off" | "open" | "closed";

const locales: Record<Language, Translations> = {
  nb,
  nn,
  en,
};

const StoryProviderDecorator = ({
  children,
  lang,
  rootElement,
}: {
  children: React.ReactNode;
  lang: Language | undefined;
  rootElement?: HTMLElement;
}) => {
  useEffect(() => {
    document.documentElement.lang = lang || "nb";
  }, [lang]);

  return (
    <Provider
      rootElement={rootElement}
      locale={lang ? locales[lang] : undefined}
    >
      {children}
    </Provider>
  );
};

const webComponentStyles = [
  dataTokenFilterStyles,
  dataToolbarStyles,
  dsStyles,
  listboxStyles,
].join("\n");

const WebComponentDecorator = ({
  children,
  mode,
}: {
  children: (rootElement: HTMLDivElement) => React.ReactNode;
  mode: Exclude<WebComponentMode, "off">;
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const shadowRoot = host.attachShadow({ mode });
    const style = document.createElement("style");
    style.textContent = webComponentStyles;
    shadowRoot.appendChild(style);

    const mount = document.createElement("div");
    shadowRoot.appendChild(mount);
    setRootElement(mount);

    return () => {
      setRootElement(null);
    };
  }, [mode]);

  return (
    <>
      <div ref={hostRef} key={mode} />
      {rootElement ? createPortal(children(rootElement), rootElement) : null}
    </>
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

const addons = [addonA11y(), addonThemes(), addonDocs(), addonVitest()];

/**
 * Fixes flaky interaction tests
 */
if (process.env.NODE_ENV === "development") {
  addons.push(addonPerformancePanel());
}

export default definePreview({
  addons,
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
    webComponentWrapper: {
      toolbar: {
        icon: "component",
        items: [
          { value: "off", title: "DOM: Default" },
          { value: "open", title: "Web component: Open shadow root" },
          { value: "closed", title: "Web component: Closed shadow root" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    mode: "default",
    font: "Source Sans 3",
    webComponentWrapper: "off",
  },

  decorators: [
    (StoryFn, context) => (
      <TypoDecorator font={context.globals.font}>
        <StoryFn />
      </TypoDecorator>
    ),
    (StoryFn, context) =>
      context.globals.webComponentWrapper === "off" ? (
        <StoryProviderDecorator lang={context.globals.language}>
          <StoryFn />
        </StoryProviderDecorator>
      ) : (
        <WebComponentDecorator mode={context.globals.webComponentWrapper}>
          {(rootElement) => (
            <StoryProviderDecorator
              lang={context.globals.language}
              rootElement={rootElement}
            >
              <StoryFn />
            </StoryProviderDecorator>
          )}
        </WebComponentDecorator>
      ),
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
});
