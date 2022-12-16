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
Action for publisedAt ved første publisering
Legge til "godkjent"-action på grunnleggende, komponenter og god-praksis
*/
