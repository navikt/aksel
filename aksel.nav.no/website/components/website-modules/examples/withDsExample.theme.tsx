import { ThemeProvider, useTheme } from "next-themes";
import { Box, Select } from "@navikt/ds-react";

function ExampleTheming({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="aksel-example-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

function ExampleThemingSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Box position="absolute" top="space-8" right="space-8">
      <Select
        label="Tema"
        onChange={(event) => setTheme(event.target.value)}
        hideLabel
        value={resolvedTheme}
        size="small"
      >
        <option value="light">Lyst tema</option>
        <option value="dark">Mørkt tema</option>
      </Select>
    </Box>
  );
}

export { ExampleTheming, ExampleThemingSwitch };
