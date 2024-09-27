import { useEffect, useState } from "react";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { type Theme, ThemeProviderContext } from "./ThemeContext";

const ScDiv = styled.div`
  background-color: ${tokens.BgDefault};
`;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "referanseapp-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (_theme: Theme) => {
      localStorage.setItem(storageKey, _theme);
      setTheme(_theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <ScDiv>{children}</ScDiv>
    </ThemeProviderContext.Provider>
  );
}
