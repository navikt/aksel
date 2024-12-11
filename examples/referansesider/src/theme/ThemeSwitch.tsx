import { useContext } from "react";
import styled from "styled-components";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import { ThemeProviderContext } from "./ThemeContext";

const ScUl = styled.ul`
  background-color: ${tokens.BgSunken};
`;

const ScButton = styled.button`
  &[aria-pressed="true"] {
    background-color: ${tokens.BgRaised};
  }
`;

export const ThemeSwitch = () => {
  const context = useContext(ThemeProviderContext);
  return (
    <ScUl className="inline-flex items-center gap-1 justify-center h-12 rounded px-1">
      <li>
        <ScButton
          aria-pressed={context.theme === "light"}
          onClick={() => context.setTheme("light")}
          className="inline-flex text-2xl items-center justify-center rounded-sm px-2 py-2"
        >
          <SunIcon title="Toggle lightmode" />
        </ScButton>
      </li>
      <li>
        <ScButton
          aria-pressed={context.theme === "dark"}
          onClick={() => context.setTheme("dark")}
          className="inline-flex text-2xl items-center justify-center rounded-sm px-2 py-2"
        >
          <MoonIcon title="Toggle darkmode" />
        </ScButton>
      </li>
    </ScUl>
  );
};
