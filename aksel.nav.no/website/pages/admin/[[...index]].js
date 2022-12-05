import { NextStudio } from "next-sanity/studio";
import { useEffect, useState } from "react";
import { workspaceConfig } from "../../sanity/sanity.config";

const StudioPage = () => {
  useEffect(() => {
    if (window.location.host === "aksel.nav.no") {
      window.location.replace(`http://aksel.nav.no`);
    }
  }, []);

  const [scheme, setScheme] = useState("light");

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
        sche
        unstable__noFavicons
      />
    </div>
  );
};

export default StudioPage;
