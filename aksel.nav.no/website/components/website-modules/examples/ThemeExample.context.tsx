import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useTheme } from "@/app/_ui/theming/ThemeProvider";

type ThemeExampleContextType = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
};

type RootTheme = "light" | "dark" | undefined;

const ThemeExampleContext = createContext<ThemeExampleContextType | null>(null);

function ThemeExampleProvider({ children }: { children: React.ReactNode }) {
  const { setTheme: setAppTheme, theme } = useTheme();

  const [exampleTheme, setExampleTheme] = useState<
    ThemeExampleContextType["theme"]
  >(() => convertLegacyTheme(theme));

  const setTheme = useCallback(
    (newTheme: "light" | "dark" | "system") => {
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
    },
    [setAppTheme],
  );

  const contextValue: ThemeExampleContextType = useMemo(
    () => ({
      theme: exampleTheme,
      setTheme,
    }),
    [exampleTheme, setTheme],
  );

  return (
    <ThemeExampleContext.Provider value={contextValue}>
      {children}
    </ThemeExampleContext.Provider>
  );
}

function useThemeExample() {
  const context = useContext(ThemeExampleContext);
  if (!context) {
    throw new Error(
      "useThemeExample must be used within a ThemeExampleProvider",
    );
  }
  return context;
}

function convertLegacyTheme(
  theme: string | undefined,
): ThemeExampleContextType["theme"] {
  if (theme === "legacy") {
    return "light";
  }
  return (theme as RootTheme) ?? "light";
}

export { ThemeExampleProvider, useThemeExample };
