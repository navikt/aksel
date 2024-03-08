import Fuse from "fuse.js";
import { FuseItemT } from "@/types";

export function fuseSearch(results: any[], query: string) {
  /* https://fusejs.io/api/options.html */
  const fuse = new Fuse<FuseItemT>(results, {
    keys: [
      { name: "heading", weight: 100 },
      { name: "lvl2.text", weight: 50 },
      { name: "lvl3.text", weight: 40 },
      { name: "lvl4.text", weight: 30 },
      { name: "ingress", weight: 30 },
      { name: "intro", weight: 30 },
      { name: "tema", weight: 70 },
      { name: "content.text", weight: 20 },
    ],
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 2,
    includeMatches: true,
    threshold: 0.3,
  });
  return fuse.search(query).filter((x) => x.score && x.score < 0.3);
}
