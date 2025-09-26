import { useState } from "react";
import { useTheme } from "@/app/_ui/theming/ThemeProvider";

type ExampleTheme = "light" | "dark" | "system";
type RootTheme = "light" | "dark" | undefined;

function useThemeExample() {
  const { setTheme: setAppTheme, theme } = useTheme();

  const [exampleTheme, setExampleTheme] = useState<ExampleTheme>(() =>
    convertLegacyTheme(theme),
  );

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setExampleTheme(newTheme);
      setAppTheme(prefersDark ? "dark" : "light");
      return;
    }

    setExampleTheme(newTheme);
    setAppTheme(newTheme);
  };

  return {
    theme: exampleTheme,
    setTheme,
  };
}

function convertLegacyTheme(theme: string | undefined): ExampleTheme {
  if (theme === "legacy") {
    return "light";
  }
  return (theme as RootTheme) ?? "light";
}

export { useThemeExample };
