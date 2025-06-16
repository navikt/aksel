import { createClient } from "npm:@sanity/client";
// NOTE: this is not that beautiful (reaching far away for config),
// but we want a single config for sanity
import { clientConfig } from "../../../aksel.nav.no/website/sanity/config.ts";

const token = Deno.env.get("SANITY_WRITE");
if (!token) {
  throw new Error("Missing SANITY_WRITE (.env)");
}
const DRYRUN = Deno.env.get("DRYRUN");

const client = createClient({
  ...clientConfig,
  maxRetries: 5,
  token,
});

const transactionClient = client.transaction();

const document = {
  name: "track_redaksjon_avatar_id",
  _type: "document",
  title: "usage_map_tracker",
  data: {
    "1": true,
    "2": false,
    "3": true,
    "4": false,
  },
};

transactionClient.create(document);

const res_commit = await transactionClient.commit({ dryRun: !!DRYRUN });
console.info({ res_commit });

console.info("✅ avatar-id");
