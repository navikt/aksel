import { sanityCategoryLookup } from "@/sanity/config";
import { SidebarNodeT } from "@/types";

export function generateSidebar(
  input: SidebarNodeT[],
  type: "komponenter" | "grunnleggende" | "templates"
) {
  return sanityCategoryLookup(type)
    .map((x) => ({
      ...x,
      pages: input
        .filter((y) => y?.kategori === x.value)
        .sort(sortDeprecated)
        .sort(sortIndex)
        .sort((a, b) => {
          return a?.heading.localeCompare(b?.heading);
        }),
    }))
    .filter((x) => !(!x.pages || x.pages.length === 0));
}

function sortDeprecated(a: SidebarNodeT, b: SidebarNodeT) {
  if (a?.tag === "deprecated" && b?.tag === "deprecated") {
    return 0;
  } else if (a?.tag === "deprecated") {
    return 1;
  } else if (b.tag === "deprecated") {
    return -1;
  }
}

function sortIndex(a: SidebarNodeT, b: SidebarNodeT) {
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
