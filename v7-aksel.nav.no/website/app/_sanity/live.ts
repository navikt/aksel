import { evaluate, parse } from "groq-js";
import "server-only";
import Data from "../../scripts/doc-data.json";

async function sanityLocalFetch({
  query,
  params,
}: {
  query: string;
  params?: { [key: string]: any };
}) {
  const tree = parse(query);

  const value = await evaluate(tree, { dataset: Data, params });

  return { data: await value.get() };
}

export { sanityLocalFetch };
