import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Box, Select } from "@navikt/ds-react";

type SupportedThemes = "legacy" | "light" | "dark";

const colorThemes = ["legacy", "light", "dark"] satisfies SupportedThemes[];

const LOCAL_STORAGE_KEY = "aksel-example-theme";

function ExampleTheming({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey={LOCAL_STORAGE_KEY}
      defaultTheme="legacy"
      enableSystem={false}
      themes={colorThemes}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

function ExampleThemingSwitch() {
  const { theme, setTheme } = useTheme();
  const { query, isReady } = useRouter();
  const currentStylesheetRef = useRef<HTMLLinkElement | null>(null);

  const createThemeLink = useCallback((themeName: string) => {
    if (themeName === "legacy") {
      console.info("Using legacy theme, skipping stylesheet update");
      return;
    }

    const themeUrlSuffix =
      themeName === "legacy"
        ? "@navikt/ds-css/dist"
        : "@navikt/ds-css/dist/darkside";

    const newStylesheet = document.createElement("link");
    newStylesheet.rel = "stylesheet";
    newStylesheet.href = `https://cdn.jsdelivr.net/npm/${themeUrlSuffix}/index.min.css`;

    newStylesheet.id = `dynamic-theme-stylesheet-${themeName}`;
    document.head.appendChild(newStylesheet);
    currentStylesheetRef.current = newStylesheet;
  }, []);

  const resetThemeLink = useCallback(() => {
    if (currentStylesheetRef.current?.parentNode === document.head) {
      document.head.removeChild(currentStylesheetRef.current);
    }
    currentStylesheetRef.current = null;

  }, []);

  const shouldShow = useMemo(
    () => isReady && query.darkside === "true",
    [isReady, query.darkside],
  );

  useEffect(() => {
    if (!shouldShow || !theme) {
      resetThemeLink();
      return;
    }

    resetThemeLink();
    createThemeLink(theme);

    return () => {
      resetThemeLink();
    };
  }, [createThemeLink, resetThemeLink, shouldShow, theme]);

  if (!shouldShow) {
    return null;
  }

  return (
    <Box position="absolute" top="space-8" right="space-8">
      <Select
        label="Tema"
        onChange={(e) => setTheme(e.target.value)}
        hideLabel
        value={theme}
        size="small"
      >
        <option value="legacy">Legacy</option>
        <option value="light">Darkside light</option>
        <option value="dark">Darkside dark</option>
      </Select>
    </Box>
  );
}

export { ExampleTheming, ExampleThemingSwitch };
