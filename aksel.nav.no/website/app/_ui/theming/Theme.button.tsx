"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <Tooltip
      content={
        isMounted && resolvedTheme === "dark"
          ? "Endre til lyst tema"
          : "Endre til mørkt tema"
      }
    >
      <Button
        variant="tertiary-neutral"
        icon={<ThemeIcon aria-hidden />}
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      />
    </Tooltip>
  );
}

export { ThemeButton };
