const SANITY_PROJECT_ID = "hnbe3yhs";
const SANITY_API_VERSION = "2025-08-10";
let SANITY_DATASET = "production";

if (process.env.LOCAL_DATASET_OVERRIDE === "development") {
  SANITY_DATASET = "development";
}

export { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID };
