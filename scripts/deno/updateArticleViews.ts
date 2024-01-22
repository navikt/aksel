import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../aksel.nav.no/website/sanity/config.ts";
import { hashString, queryArticleURLs } from "./utils.ts";

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

// each data fetch request is assumed to only be self-consistent (orderding of
// labels and data points) that's why we need to cohese the data ourselves.
// It's undoubtedly a lossy process regardless (as some articles are added and removed over time)
// some of these entries will have partial data, but that's fine

const json_obj_days = await (
  await fetch(
    "https://reops-proxy.intern.nav.no/amplitude/100002016/api/3/chart/e-m2gupsut/query",
  )
).json();

for (const [idx, view_entry] of json_obj_days.data.series.entries()) {
  const url = json_obj_days.data.seriesLabels[idx][1];
  const views_week = view_entry
    .slice(0, -1)
    .reduce((a: number, b: { value: number }) => a + b.value, 0);
  view_datas.set(url, {
    views_day: view_entry[7].value,
    views_week,
    views_month: -1,
    views_year: -1,
  });
}

const json_obj_months = await (
  await fetch(
    "https://reops-proxy.intern.nav.no/amplitude/100002016/api/3/chart/e-sna3bc31/query",
  )
).json();

for (const [idx, view_entry] of json_obj_months.data.series.entries()) {
  const url = json_obj_months.data.seriesLabels[idx][1];

  const existing_data = view_datas.get(url);

  const views_year = view_entry
    .slice(0, -1)
    .reduce((a: number, b: { value: number }) => a + b.value, 0);

  // TODO: if an article is fresh, it will have data for eg days, but not months
  // currently I try to detect when this happens by checking if the bigger time-period
  // has a smaller value than the smaller time-period, and if so, set -1 for "i don't know"
  view_datas.set(url, {
    views_day: existing_data?.views_day ?? -1,
    views_week: existing_data?.views_week ?? -1,
    views_month:
      view_entry[11].value < (existing_data?.views_week ?? 0)
        ? -1
        : view_entry[11].value,
    views_year: views_year < (existing_data?.views_week ?? 0) ? -1 : views_year,
  });
}

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

// TODO this slice & the dryRun below is only useful during development
// documents = documents.slice(0, 10);
// console.log({ documents });
documents.forEach(async (doc) => {
  // await rangeDelay(100, 150);
  await transactionClient.createOrReplace(doc);
});
const res_commit = await transactionClient.commit({ dryRun: false });
console.log({ res_commit });
