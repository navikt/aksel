import cl from "clsx";
import { NextStudio } from "next-sanity/studio";
import { useEffect, useState } from "react";
import { workspaceConfig } from "../../sanity/sanity.config";

const localStorageKey = "aksel:sanity:studio:theme";

const StudioPage = () => {
  const [scheme, setScheme] = useState("dark");

  useEffect(() => {
    const theme = localStorage.getItem(localStorageKey);
    if (theme) {
      setScheme(theme);
    } else {
      const systemTheme = getSystemTheme();

      setScheme(systemTheme);
      updateLocalStorageTheme(systemTheme);
    }
  }, []);

  return (
    <div
      data-theme={scheme}
      className={cl("aksel-admin", {
        dark: scheme === "dark",
      })}
      id="sanity-wrapper"
    >
      <NextStudio
        config={workspaceConfig}
        scheme={scheme}
        onSchemeChange={(nextScheme) => {
          const newScheme =
            nextScheme === "system" ? getSystemTheme() : nextScheme;
          setScheme(newScheme);
          updateLocalStorageTheme(newScheme);
        }}
      />
    </div>
  );
};

export default StudioPage;

function updateLocalStorageTheme(theme) {
  localStorage.setItem(localStorageKey, theme);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
