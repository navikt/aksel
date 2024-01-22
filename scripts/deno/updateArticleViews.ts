import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../aksel.nav.no/website/sanity/config.ts";
import { amplitudeFetchJSON, hashString, queryArticleURLs } from "./utils.ts";

// this part is a bit silly: script "plumbing" essentially. ModuleDir is the root of this
// current file, it's used so relative paths from this file into the rest of the repo will
// work as expected regardless of where it is called from (disregarding CWD of caller)
// it's a WEB-first API, so we get files in URL format, these must be converted to a path
const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));
await load({
  envPath: `${mainModuleDir}/../../aksel.nav.no/website/.env`,
  export: true,
});

type ViewData = {
  views_day: number;
  views_week: number;
  views_month: number;
  views_year: number;
};

const view_datas = new Map<string, ViewData>();

const _queries = [
  await amplitudeFetchJSON("e-f5vcqiqk"), // last 24h
  await amplitudeFetchJSON("e-69mzf301"), // last 7d
  await amplitudeFetchJSON("e-wwh3n9l1"), // last 30d
  await amplitudeFetchJSON("e-rzw8jk6j"), // last 365d
];
// const queries = await Promise.all(_queries); // can't do this... it overloads the Proxy
const queries = _queries;

const json_obj_24h = queries[0];
const json_obj_7d = queries[1];
const json_obj_30d = queries[2];
const json_obj_365d = queries[3];
for (const [idx, view_entry] of json_obj_24h.data.series.entries()) {
  const url = json_obj_24h.data.seriesLabels[idx][1];
  const views_day = view_entry
    .slice(-24) // the query holds more than 24 hours of data, but we only want the last 24
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
  view_datas.set(url, {
    views_day,
    views_week: -1,
    views_month: -1,
    views_year: -1,
  });
}
for (const [idx, view_entry] of json_obj_7d.data.series.entries()) {
  const url = json_obj_7d.data.seriesLabels[idx][1];
  const existing_data = view_datas.get(url);
  const views_week = view_entry
    .slice(-7)
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
  view_datas.set(url, {
    views_day: existing_data?.views_day ?? -1,
    views_week,
    views_month: existing_data?.views_month ?? -1,
    views_year: existing_data?.views_year ?? -1,
  });
}
for (const [idx, view_entry] of json_obj_30d.data.series.entries()) {
  const url = json_obj_30d.data.seriesLabels[idx][1];
  const existing_data = view_datas.get(url);
  const views_month = view_entry
    .slice(-30)
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
  view_datas.set(url, {
    views_day: existing_data?.views_day ?? -1,
    views_week: existing_data?.views_week ?? -1,
    views_month,
    views_year: existing_data?.views_year ?? -1,
  });
}
for (const [idx, view_entry] of json_obj_365d.data.series.entries()) {
  const url = json_obj_365d.data.seriesLabels[idx][1];
  const existing_data = view_datas.get(url);
  const views_year = view_entry
    .slice(-4) // the query holds 4 quarters == 1 year
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
  view_datas.set(url, {
    views_day: existing_data?.views_day ?? -1,
    views_week: existing_data?.views_week ?? -1,
    views_month: existing_data?.views_month ?? -1,
    views_year,
  });
}

// strip and aggregate all fragments (#1234...) from the URL,
// we count all the fragment views as views towards the URL without the fragment
for (const view_data of view_datas) {
  if (view_data[0].includes("#")) {
    const url = view_data[0].split("#")[0];
    const existing_data = view_datas.get(url);
    view_datas.set(url, {
      views_day: (existing_data?.views_day ?? 0) + view_data[1].views_day,
      views_week: (existing_data?.views_week ?? 0) + view_data[1].views_week,
      views_month: (existing_data?.views_month ?? 0) + view_data[1].views_month,
      views_year: (existing_data?.views_year ?? 0) + view_data[1].views_year,
    });
    view_datas.delete(view_data[0]);
  }
}

const token = Deno.env.get("SANITY_WRITE_KEY");
if (!token) {
  throw new Error("Missing SANITY_WRITE_KEY");
}

const noCdnClient = createClient({
  ...clientConfig,
  maxRetries: 5,
  token,
});

const documents = [];

const articles = await noCdnClient.fetch(queryArticleURLs);
for (const article of articles) {
  const url = `https://aksel.nav.no/${article.slug}`;

  const data = view_datas.get(url);

  documents.push({
    _id: `${hashString(url)}`,
    _type: "article_views",
    article_ref: {
      _ref: article._id,
      _type: "reference",
      _weak: true,
    },
    url,
    views_day: data?.views_day ?? -1,
    views_week: data?.views_week ?? -1,
    views_month: data?.views_month ?? -1,
    views_year: data?.views_year ?? -1,
  });
}

const transactionClient = noCdnClient.transaction();
// TODO this slice & the dryRun below is only useful during development
// documents = documents.slice(0, 10);
// console.log({ documents });
documents.forEach(async (doc) => {
  // await rangeDelay(100, 150);
  await transactionClient.createOrReplace(doc);
});
const res_commit = await transactionClient.commit({ dryRun: false });
console.log({ res_commit });
