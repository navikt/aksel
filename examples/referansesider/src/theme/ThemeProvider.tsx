import { useEffect, useState } from "react";
import styled from "styled-components";
import { Theme } from "@navikt/ds-react/Theme";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import { ThemeProviderContext, type Theme as ThemeType } from "./ThemeContext";

const ScDiv = styled.div`
  background-color: ${tokens.BgDefault};
`;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "referanseapp-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (_theme: ThemeType) => {
      localStorage.setItem(storageKey, _theme);
      setTheme(_theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <Theme theme={value.theme}>
        <ScDiv>{children}</ScDiv>
      </Theme>
    </ThemeProviderContext.Provider>
  );
}
