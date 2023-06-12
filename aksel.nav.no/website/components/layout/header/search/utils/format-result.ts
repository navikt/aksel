import { FuseItemT, SearchHitT } from "@/types";
import { omit } from "@navikt/ds-react";
import Fuse from "fuse.js";

export function formatResults(res: Fuse.FuseResult<FuseItemT>[]): SearchHitT[] {
  return res.map((x) => {
    let description = x?.item.intro ?? x.item.ingress ?? "";
    const clampDesc = description?.length > 120;
    description &&= description.slice(0, 120);
    clampDesc && (description += "...");

    return omit(
      {
        ...x,
        item: omit(x.item, ["intro", "ingress"]) as Omit<
          FuseItemT,
          "ingress" | "intro"
        >,
        anchor: resolveAnchor(x.matches[0], x.item),
        description,
      },
      ["matches"]
    ) as SearchHitT;
  });
}

export function formatRawResults(
  res: FuseItemT[]
): Omit<SearchHitT, "score" | "anchor">[] {
  return res.map((x) => {
    let description = x?.intro ?? x.ingress ?? "";
    const clampDesc = description?.length > 120;
    description &&= description.slice(0, 120);
    clampDesc && (description += "...");

    return {
      item: omit(x, ["intro", "ingress"]) as Omit<
        FuseItemT,
        "ingress" | "intro"
      >,
      description,
    };
  });
}

function resolveAnchor(match: Fuse.FuseResultMatch, item: FuseItemT) {
  if (match.key.includes("lvl")) {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  return null;
}
