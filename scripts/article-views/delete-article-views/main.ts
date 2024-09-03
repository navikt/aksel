import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../../aksel.nav.no/website/sanity/config.ts";
import { queryArticleViews } from "../queries.ts";

/*
  this part is a bit silly: script "plumbing" essentially. ModuleDir is the root of this
  current file, it's used so relative paths from this file into the rest of the repo will
  work as expected regardless of where it is called from (disregarding CWD of caller)
  it's a WEB-first API, so we get files in URL format, these must be converted to a path

  Currently the script is located `scripts/deno/`, so we go up ../../ to get to the project root
*/
const env_file = `${path.dirname(path.fromFileUrl(Deno.mainModule))}/../.env`;
await load({
  envPath: `${env_file}`,
  export: true,
});

const token = Deno.env.get("SANITY_WRITE");
if (!token) {
  throw new Error("Missing SANITY_WRITE");
}

const noCdnClient = createClient({
  ...clientConfig,
  maxRetries: 5,
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
console.info({ res_commit });
