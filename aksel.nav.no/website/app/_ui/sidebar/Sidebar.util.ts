"use server";

import { sanityCategoryLookup } from "@/sanity/config";
import {
  DesignsystemSidebarSectionT,
  SidebarInputNodeT,
  SidebarPageT,
} from "@/types";

const pageTypes = {
  grunnleggende: { name: "Grunnleggende", _type: "ds_artikkel" },
  komponenter: { name: "Komponenter", _type: "komponent_artikkel" },
  templates: { name: "Mønster og Maler", _type: "templates_artikkel" },
} as const;

type DesignsystemSidebarDataT = {
  label: string;
  links: DesignsystemSidebarSectionT;
}[];

function generateSidebar(input: SidebarInputNodeT[]): DesignsystemSidebarDataT {
  return Object.keys(pageTypes).map((type) => {
    const categories = sanityCategoryLookup(type as keyof typeof pageTypes);
    const filteredInput = input.filter(
      (doc) => doc._type === pageTypes[type]._type,
    );

    const standalonePages: SidebarPageT[] = filteredInput
      .filter((page) => page.kategori === "standalone")
      .sort((a, b) => {
        return a?.heading.localeCompare(b?.heading);
      })
      .sort(sortIndex)
      .sort(sortDeprecated)
      .map((page) => ({
        heading: page.heading,
        slug: page.slug,
        tag: page.tag,
      }));

    const groupedPages = categories
      .map((x) => ({
        ...x,
        pages: filteredInput
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

    return {
      label: pageTypes[type].name,
      links: [...standalonePages, ...groupedPages],
    };
  });
}

function sortDeprecated(a: SidebarInputNodeT, b: SidebarInputNodeT) {
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

function sortIndex(a: SidebarInputNodeT, b: SidebarInputNodeT) {
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

export { generateSidebar };
export type { DesignsystemSidebarDataT };
