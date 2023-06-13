import { FuseItemT } from "@/types";
import Fuse from "fuse.js";

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
      { name: "tema", weight: 10 },
      { name: "content", weight: 10 },
    ],
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 3,
    includeMatches: true,
    threshold: 0.3,
    location: 120,
  });
  return fuse.search(query).filter((x) => x.score < 0.3);
}
