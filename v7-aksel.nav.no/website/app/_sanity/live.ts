import fs from "fs";
import { evaluate, parse } from "groq-js";
import NodeCache from "node-cache";
import "server-only";

const cache = new NodeCache({ stdTTL: 0 });
const DATASET_KEY = "sanity-dataset";

function getDataset() {
  let dataset = cache.get(DATASET_KEY);

  if (!dataset) {
    dataset = JSON.parse(fs.readFileSync("./scripts/doc-data.json", "utf-8"));
    cache.set(DATASET_KEY, dataset);
  }

  return dataset;
}

async function sanityLocalFetch({
  query,
  params,
}: {
  query: string;
  params?: { [key: string]: any };
}) {
  const tree = parse(query);
  const dataset = getDataset();
  const value = await evaluate(tree, { dataset, params });

  return { data: await value.get() };
}

export { sanityLocalFetch };
