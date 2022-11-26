import { NextStudio } from "next-sanity/studio";

import { useEffect } from "react";
import { workspaceConfig } from "../../sanity/sanity.config";

const StudioPage = () => {
  useEffect(() => {
    if (window.location.host === "aksel.nav.no") {
      window.location.replace(`http://aksel.nav.no`);
    }
  }, []);

  return <NextStudio config={workspaceConfig} />;
};

export default StudioPage;
