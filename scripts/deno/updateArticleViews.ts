import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../aksel.nav.no/website/sanity/config.ts";
import { hashString } from "./utils.ts";

const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));
await load({
  // envPath: "../../aksel.nav.no/website/.env",
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

// console.log({ data_days });

const token = Deno.env.get("SANITY_WRITE_KEY");
if (!token) {
  throw new Error("Missing SANITY_WRITE_KEY");
}

const noCdnClient = createClient({
  ...clientConfig,
  token,
});

const transactionClient = noCdnClient.transaction();

const url = "https://aksel.nav.no/god-praksis/artikler/teamtopologi-i-nav";

const documents = [
  {
    _id: `${hashString(url)}`,
    _type: "article_views",
    article_ref: {
      _ref: "dad26c2c-41a2-46de-9af3-8cdb9abf70a1",
      _type: "reference",
    },
    url,
    views: 10,
    views_week: 20,
    views_month: 30,
    views_year: 40,
  },
];

documents.forEach(async (doc) => {
  const result = await transactionClient.createOrReplace(doc);
  const res_commit = result.commit();
  console.log({ res_commit });
});
