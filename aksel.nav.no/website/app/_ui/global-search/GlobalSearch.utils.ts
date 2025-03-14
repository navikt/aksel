"use server";

import { SearchPageT } from "./GlobalSearch.types";

function omit<T extends object, K extends keyof T>(
  obj: T,
  props: K[],
): Omit<T, K> {
  const filteredEntries = Object.entries(obj).filter(
    ([key]) => !props.includes(key as K),
  );

  return Object.fromEntries(filteredEntries) as Omit<T, K>;
}

function formatRawResults(
  res: SearchPageT[],
): { item: Omit<SearchPageT, "intro" | "ingress">; description: string }[] {
  return res.map((x) => ({
    item: omit(x, ["intro", "ingress"]),
    description: x?.intro || x.ingress || "",
  }));
}

export { formatRawResults };
