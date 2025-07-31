"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <Button
      variant="tertiary-neutral"
      icon={
        isMounted && resolvedTheme === "dark" ? (
          <MoonIcon title="Endre til lyst" />
        ) : (
          <SunIcon title="Endre til mørkt" />
        )
      }
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    />
  );
}

export { ThemeButton };
