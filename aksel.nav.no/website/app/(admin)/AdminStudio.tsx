"use client";

import { workspaceConfig } from "aksel-sanity-studio/studio-config";
import { NextStudio } from "next-sanity/studio";
import { useTheme } from "next-themes";

function AdminStudio() {
  const { theme, setTheme } = useTheme();

  return (
    <NextStudio
      config={workspaceConfig}
      scheme={theme ?? "light"}
      onSchemeChange={(nextScheme) => {
        if (nextScheme === "system") {
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches;
          setTheme(prefersDark ? "dark" : "light");
          return;
        }
        setTheme(nextScheme);
      }}
    />
  );
}

export { AdminStudio };
