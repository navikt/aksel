"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

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
      <Tooltip
        content={
          isMounted && resolvedTheme === "dark"
            ? "Endre til lyst tema"
            : "Endre til mørkt tema"
        }
      >
        <Button
          variant="tertiary-neutral"
          icon={
            <>
              <MoonIcon
                aria-hidden
                style={{ display: "var(--website-theme-toggle-dark-display)" }}
              />
              <SunIcon
                aria-hidden
                style={{ display: "var(--website-theme-toggle-light-display)" }}
              />
            </>
          }
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        />
      </Tooltip>
    </>
  );
}

export { ThemeButton };
