"use client";

import { useTheme } from "next-themes";
import { ThemeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Tooltip
      content={
        resolvedTheme === "dark"
          ? "Endre til lyst tema"
          : "Endre til mørkt tema"
      }
    >
      <Button
        variant="tertiary-neutral"
        icon={<ThemeIcon aria-hidden />}
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        suppressHydrationWarning
      />
    </Tooltip>
  );
}

export { ThemeButton };
