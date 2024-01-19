import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../aksel.nav.no/website/sanity/config.ts";
import { queryArticleViews } from "./utils.ts";

const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));
await load({
  envPath: `${mainModuleDir}/../../aksel.nav.no/website/.env`,
  export: true,
});

const token = Deno.env.get("SANITY_WRITE_KEY");
if (!token) {
  throw new Error("Missing SANITY_WRITE_KEY");
}

const noCdnClient = createClient({
  ...clientConfig,
  maxRetries: 10,
  token,
});

const transactionClient = noCdnClient.transaction();

const document_ids = [];

const articleViewDocs = await noCdnClient.fetch(queryArticleViews);
for (const articleViewDoc of articleViewDocs) {
  document_ids.push(articleViewDoc._id);
}

document_ids.forEach(async (doc) => {
  await transactionClient.delete(doc);
});
const res_commit = await transactionClient.commit({ dryRun: false });
console.log({ res_commit });
