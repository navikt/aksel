import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";
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

  const shouldShow = isReady && query.darkside === "true";

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
