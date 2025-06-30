"use client";

import { NextStudio } from "next-sanity/studio";
import { useTheme } from "next-themes";
import { StudioThemeColorSchemeKey } from "sanity";
import workspaceConfig from "../../../sanity/sanity.config";

function AdminStudio() {
  const { theme, setTheme } = useTheme();

  return (
    <NextStudio
      config={workspaceConfig}
      scheme={(theme ?? "light") as StudioThemeColorSchemeKey}
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
