import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../aksel.nav.no/website/sanity/config.ts";
import { hashString, queryArticleURLs } from "./utils.ts";

const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));
await load({
  envPath: `${mainModuleDir}/../../aksel.nav.no/website/.env`,
  export: true,
});

// const data_days = await fetch(
//   "https://reops-proxy.intern.nav.no/amplitude/100002016/api/3/chart/e-m2gupsut/query",
// );
// const data_weeks = await fetch(
//   "https://reops-proxy.intern.nav.no/amplitude/api/3/chart/e-k2mwb9kd/query",
// );
// const data_months = await fetch(
//   "https://reops-proxy.intern.nav.no/amplitude/api/3/chart/e-sna3bc31/query",
// );

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

const documents = [];

const articles = await noCdnClient.fetch(queryArticleURLs);
for (const article of articles) {
  const url = `https://aksel.nav.no/${article.slug}`;

  documents.push({
    _id: `${hashString(url)}`,
    _type: "article_views",
    article_ref: {
      _ref: article._id,
      _type: "reference",
      _weak: true,
    },
    url,
    views: -1,
    views_day: 10,
    views_week: 20,
    views_month: 30,
    views_year: 80,
  });
}

// TODO this slice & the dryRun below is only useful during development
// documents = documents.slice(0, 10);
// console.log({ documents });
documents.forEach(async (doc) => {
  // await rangeDelay(100, 150);
  await transactionClient.createOrReplace(doc);
});
const res_commit = await transactionClient.commit({ dryRun: false });
console.log({ res_commit });
