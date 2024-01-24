import Fuse from "fuse.js";
import { omit } from "@navikt/ds-react";
import { FuseItemT, SearchHitT } from "@/types";

export function formatResults(res: Fuse.FuseResult<FuseItemT>[]): SearchHitT[] {
  return res.map((x) => {
    return {
      ...x,
      item: omit(x.item, ["intro", "ingress"]) as Omit<
        FuseItemT,
        "ingress" | "intro"
      >,
      anchor: resolveAnchor(x.matches[0], x.item),
      description: x?.item.intro || x.item.ingress || "",
    };
  });
}

export function formatRawResults(
  res: FuseItemT[],
): Omit<SearchHitT, "score" | "anchor">[] {
  return res.map((x) => ({
    item: omit(x, ["intro", "ingress"]) as Omit<FuseItemT, "ingress" | "intro">,
    description: x?.intro || x.ingress || "",
  }));
}

function resolveAnchor(match: Fuse.FuseResultMatch, item: FuseItemT) {
  if (match.key.includes("lvl")) {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  if (match.key === "content.text") {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  return null;
}
