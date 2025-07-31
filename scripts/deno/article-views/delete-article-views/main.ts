import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../../../aksel.nav.no/website/sanity/config.ts";
import { queryArticleViews } from "../queries.ts";

const DRYRUN = Deno.env.get("DRYRUN");

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

document_ids.forEach((doc) => {
  transactionClient.delete(doc);
});
const res_commit = await transactionClient.commit({ dryRun: !!DRYRUN });
console.info({ res_commit });
