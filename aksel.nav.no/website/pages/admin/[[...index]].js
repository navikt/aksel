import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { config } from "../../sanity/sanity.config";

const studioConfig = defineConfig(config);

const StudioPage = () => {
  return <NextStudio config={studioConfig} />;
};

export default StudioPage;
