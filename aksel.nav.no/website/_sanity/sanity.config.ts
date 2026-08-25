import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "aksel-sanity-studio/env";
import type { ClientConfig } from "next-sanity";

const SANITY_BASE_CONFIG: ClientConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
};

export { SANITY_BASE_CONFIG };
