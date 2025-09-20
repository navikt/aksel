import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useMemo } from "react";
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

function ExampleThemingSwitch({
  legacyOnly = false,
}: {
  legacyOnly?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const { query, isReady } = useRouter();

  const shouldShow = useMemo(
    () => isReady && query.darkside === "true",
    [isReady, query.darkside],
  );

  if (!shouldShow || legacyOnly) {
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
        <option value="legacy">Standard</option>
        <option value="light">Ny lys tema</option>
        <option value="dark">Ny mørk tema</option>
      </Select>
    </Box>
  );
}

export { ExampleTheming, ExampleThemingSwitch };
