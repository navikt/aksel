import { vercelStegaCleanAll } from "@sanity/client/stega";
import { sanityCategoryLookup } from "../../sanity/config";
import { SidebarInputNodeT, SidebarT } from "../types";

export function generateSidebar(
  input: SidebarInputNodeT[],
  type: "komponenter" | "grunnleggende" | "templates",
): SidebarT {
  const _input = vercelStegaCleanAll(input);
  return sanityCategoryLookup(type)
    .map((x) => ({
      ...x,
      pages: _input
        .filter((y) => y?.kategori === x.value)
        .sort((a, b) => {
          return a?.heading.localeCompare(b?.heading);
        })
        .sort(sortIndex)
        .sort(sortDeprecated),
    }))
    .filter((x) => !(!x.pages || x.pages.length === 0))
    .map((x) => ({
      ...x,
      pages: x.pages.map((page) => ({
        heading: page.heading,
        slug: page.slug,
        tag: page.tag,
      })),
    }));
}

export function sortDeprecated(a: SidebarInputNodeT, b: SidebarInputNodeT) {
  if (a?.tag === "deprecated" && b?.tag === "deprecated") {
    return 0;
  } else if (a?.tag === "deprecated") {
    return 1;
  } else if (b.tag === "deprecated") {
    return -1;
  }
}

export function sortIndex(a: SidebarInputNodeT, b: SidebarInputNodeT) {
  if (a.sidebarindex === null && b.sidebarindex === null) {
    return 0;
  }

  if (a.sidebarindex !== null && b.sidebarindex !== null) {
    return a.sidebarindex - b.sidebarindex;
  } else if (a.sidebarindex !== null) {
    return -1;
  } else {
    return 1;
  }
}
