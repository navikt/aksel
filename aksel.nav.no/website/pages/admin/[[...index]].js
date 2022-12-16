import { NextStudio } from "next-sanity/studio";
import { useState } from "react";
import { workspaceConfig } from "../../sanity/sanity.config";

const StudioPage = () => {
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
        scheme="light"
        onSchemeChange={setScheme}
        unstable__noFavicons
      />
    </div>
  );
};

export default StudioPage;
