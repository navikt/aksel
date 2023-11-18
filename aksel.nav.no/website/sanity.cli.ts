import { SANITY_PROJECT_ID } from "@/sanity/config";
import { defineCliConfig } from "sanity/cli";

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
    dataset: "production",
  },
});
