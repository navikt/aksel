import { useContext } from "react";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { ThemeProviderContext } from "./ThemeContext";

export const ThemeSwitch = () => {
  const context = useContext(ThemeProviderContext);

  return (
    <Button
      variant="tertiary-neutral"
      onClick={() =>
        context.setTheme(context.theme === "light" ? "dark" : "light")
      }
      icon={
        context.theme === "light" ? (
          <SunIcon title="Toggle light mode" />
        ) : (
          <MoonIcon title="Toggle dark mode" />
        )
      }
    />
  );
};
