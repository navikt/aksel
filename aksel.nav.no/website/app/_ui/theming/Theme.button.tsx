"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import styles from "./Theme.module.css";

function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const Icon = useMemo(() => {
    return theme === "light" ? (
      <MoonIcon
        className={styles.themeIconDark}
        title="Endre til mørkt modus"
      />
    ) : (
      <SunIcon className={styles.themeIconLight} title="Endre til lyst modus" />
    );
  }, [theme]);

  return (
    <Button
      variant="tertiary-neutral"
      icon={Icon}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}

export { ThemeButton };
