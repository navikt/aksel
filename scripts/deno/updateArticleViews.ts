import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createClient } from "npm:next-sanity";
import { clientConfig } from "../../aksel.nav.no/website/sanity/config.ts";
import {
  amplitudeFetchJSON,
  hashString,
  queryArticleURLs,
  sum_last_n,
} from "./utils.ts";

/*
  this part is a bit silly: script "plumbing" essentially. ModuleDir is the root of this
  current file, it's used so relative paths from this file into the rest of the repo will
  work as expected regardless of where it is called from (disregarding CWD of caller)
  it's a WEB-first API, so we get files in URL format, these must be converted to a path

  Currently the script is located `scripts/deno/`, so we go up ../../ to get to the project root
*/
const project_root = `${path.dirname(path.fromFileUrl(Deno.mainModule))}/../..`;
await load({
  envPath: `${project_root}/aksel.nav.no/website/.env`,
  export: true,
});

type ViewData = {
  views_day: number;
  views_week: number;
  views_month: number;
  views_year: number;
};

const view_datas = new Map<string, Partial<ViewData>>();

const views = {
  views_day: {
    chart_id: "e-f5vcqiqk",
    sum_last_n: 24, // 24 hours in a day
  },
  views_week: {
    chart_id: "e-69mzf301",
    sum_last_n: 7, // 7 days in a week
  },
  views_month: {
    chart_id: "e-wwh3n9l1",
    sum_last_n: 30, // 30 days in a month
  },
  views_year: {
    chart_id: "e-rzw8jk6j",
    sum_last_n: 4, // 4 quarters in a year
  },
};

for (const [view, config] of Object.entries(views)) {
  const chartResult = await amplitudeFetchJSON(config.chart_id);
  for (const [idx, view_entry] of chartResult.data.series.entries()) {
    const url = chartResult.data.seriesLabels[idx][1];
    const viewsN = sum_last_n(view_entry, config.sum_last_n);

    const existing_data = view_datas.get(url) ?? {};
    view_datas.set(url, {
      ...existing_data,
      [view]: viewsN,
    });
  }
}

// strip and aggregate all fragments (.../some/url#1234...) from the URL,
// we count all the fragment views as views towards the URL without the fragment
const merged_fragments_view_datas = new Map<string, ViewData>();
for (const view_data of view_datas) {
  let url = view_data[0];
  if (view_data[0].includes("#")) {
    url = view_data[0].split("#")[0];
  }
  const existing_data = merged_fragments_view_datas.get(url);
  merged_fragments_view_datas.set(url, {
    views_day: (existing_data?.views_day ?? 0) + (view_data[1]?.views_day ?? 0),
    views_week:
      (existing_data?.views_week ?? 0) + (view_data[1].views_week ?? 0),
    views_month:
      (existing_data?.views_month ?? 0) + (view_data[1].views_month ?? 0),
    views_year:
      (existing_data?.views_year ?? 0) + (view_data[1].views_year ?? 0),
  });
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

  const data = merged_fragments_view_datas.get(url);

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
