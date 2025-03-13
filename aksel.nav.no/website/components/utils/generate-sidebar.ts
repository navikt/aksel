import {
  DesignsystemSidebarSectionT,
  SidebarInputNodeT,
  SidebarPageT,
} from "@/types";
import { sanityCategoryLookup } from "../../sanity/config";

export function generateSidebar(
  input: SidebarInputNodeT[],
  type: "komponenter" | "grunnleggende" | "templates",
): DesignsystemSidebarSectionT {
  const categories = sanityCategoryLookup(type);

  const standalonePages: SidebarPageT[] = input
    .filter((page) => page.kategori === "standalone")
    .sort(sortIndex)
    .sort(sortDeprecated);

  const groupedPages = categories
    .map((x) => ({
      ...x,
      pages: input
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

  return [...standalonePages, ...groupedPages];
}

export function sortDeprecated(a: SidebarInputNodeT, b: SidebarInputNodeT) {
  if (a?.tag === "deprecated" && b?.tag === "deprecated") {
    return 0;
  }

  if (a?.tag === "deprecated") {
    return 1;
  }

  if (b.tag === "deprecated") {
    return -1;
  }

  return 0;
}

export function sortIndex(a: SidebarInputNodeT, b: SidebarInputNodeT) {
  if (a.sidebarindex === null && b.sidebarindex === null) {
    return 0;
  }

  if (a.sidebarindex !== null && b.sidebarindex !== null) {
    return a.sidebarindex - b.sidebarindex;
  }

  if (a.sidebarindex !== null) {
    return -1;
  }

  return 1;
}
