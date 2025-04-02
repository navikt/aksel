"use client";

import { useTheme } from "next-themes";
import Head from "next/head";
import { useMemo } from "react";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";

function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const Icon = useMemo(() => {
    return theme === "light" ? (
      <MoonIcon
        style={{ display: "var(--website-theme-toggle-dark-display)" }}
        title="Endre til mørkt modus"
      />
    ) : (
      <SunIcon
        style={{ display: "var(--website-theme-toggle-light-display)" }}
        title="Endre til lyst modus"
      />
    );
  }, [theme]);

  return (
    <>
      <Head>
        <style>{`
        :root, .light {
          --website-theme-toggle-light-display: block;
          --website-theme-toggle-dark-display: none;
        }

        .dark {
          --website-theme-toggle-light-display: none;
          --website-theme-toggle-dark-display: block;
        }
      `}</style>
      </Head>
      <Button
        variant="tertiary-neutral"
        icon={Icon}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </>
  );
}

export { ThemeButton };
