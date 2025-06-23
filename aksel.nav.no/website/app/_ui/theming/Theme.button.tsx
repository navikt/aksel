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
            <MoonIcon
              style={{ display: "var(--website-theme-toggle-dark-display)" }}
              title="Endre til mørkt"
            />
            <SunIcon
              style={{ display: "var(--website-theme-toggle-light-display)" }}
              title="Endre til lyst"
            />
          </>
        }
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </>
  );
}

export { ThemeButton };
