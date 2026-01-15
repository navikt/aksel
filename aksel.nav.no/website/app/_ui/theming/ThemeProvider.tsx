"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { Theme } from "@navikt/ds-react";

type SupportedThemes = "light" | "dark";

const colorThemes = ["light", "dark"] satisfies SupportedThemes[];

const LOCAL_STORAGE_KEY = "aksel-theme";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      storageKey={LOCAL_STORAGE_KEY}
      enableSystem
      themes={colorThemes}
      disableTransitionOnChange
    >
      <Theme hasBackground>{children}</Theme>
    </NextThemeProvider>
  );
}

export { ThemeProvider, useTheme };
