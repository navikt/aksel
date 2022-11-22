import { NextStudio } from "next-sanity/studio";
import { workspaceConfig } from "../../sanity/sanity.config";

const StudioPage = () => {
  return <NextStudio config={workspaceConfig} />;
};

export default StudioPage;
