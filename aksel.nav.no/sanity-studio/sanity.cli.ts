import { defineCliConfig } from "sanity/cli";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./sanity.env";

/**
 * Used for sanity cli commands
 * CMD: cd aksel.nav.no/website -> `sanity <command>` or yarn sanity <command>
 *
 * Often used commands
 * - sanity dataset list
 * - sanity users list
 * - sanity dataset export production
 */
export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  },
  typegen: {
    path: "../app/**/*.{ts,tsx,js,jsx}",
    schema: "sanity-schema.json",
    generates: "../app/_sanity/query-types.ts",
  },
});
