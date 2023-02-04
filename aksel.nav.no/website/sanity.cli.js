import { defineCliConfig } from "sanity/cli";

/**
 * Use for sanity cli commands
 * Use: cd aksel.nav.no/website -> `sanity <command>`
 */
export default defineCliConfig({
  api: {
    projectId: "hnbe3yhs",
    dataset: "production",
  },
});
