import fs from "fs";
import { evaluate, parse } from "groq-js";
import "server-only";

const dataset = JSON.parse(fs.readFileSync("./doc-data.json", "utf-8"));

async function sanityLocalFetch({
  query,
  params,
}: {
  query: string;
  params?: { [key: string]: any };
}) {
  const tree = parse(query);
  const value = await evaluate(tree, { dataset, params });

  return { data: await value.get() };
}

export { sanityLocalFetch };
