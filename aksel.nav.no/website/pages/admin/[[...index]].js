import { NextStudio } from "next-sanity/studio";
import { useEffect, useState } from "react";
import { workspaceConfig } from "../../sanity/sanity.config";

const StudioPage = () => {
  const [scheme, setScheme] = useState("dark");
  useEffect(() => {
    const theme = localStorage.getItem("sanityStudio:ui:colorScheme");
    theme && setScheme(theme);
  }, []);

  return (
    <div
      data-theme={scheme}
      className="h-full min-h-screen"
      id="sanity-wrapper"
    >
      <NextStudio
        config={workspaceConfig}
        scheme={scheme}
        onSchemeChange={setScheme}
        unstable__noFavicons
      />
    </div>
  );
};

export default StudioPage;

/*
TODO:
Sort-order basert på siste godkjent/utdatert? publisedAt?
https://github.com/sanity-io/next-sanity/issues/223
*/
