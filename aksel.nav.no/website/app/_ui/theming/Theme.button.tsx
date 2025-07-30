"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";

function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <style id="theme-button">{`
        :root, .light {
          --website-theme-toggle-light-display: block;
          --website-theme-toggle-dark-display: none;
        }

        .dark {
          --website-theme-toggle-light-display: none;
          --website-theme-toggle-dark-display: block;
        }
      `}</style>
      <Button
        variant="tertiary-neutral"
        icon={
          <>
            {theme === "dark" ? (
              <MoonIcon title="Endre til lyst" />
            ) : (
              <SunIcon title="Endre til mørkt" />
            )}
          </>
        }
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </>
  );
}

export { ThemeButton };
