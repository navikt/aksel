import { stegaClean } from "next-sanity";
import "server-only";
import {
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERYResult,
  DESIGNSYSTEM_SIDEBAR_QUERYResult,
} from "@/app/_sanity/query-types";
import { sanityCategoryLookup } from "@/sanity/config";
import { DesignsystemSidebarSectionT, SidebarPageT } from "@/types";

/**
 * TODO: We currently do not support sorting "unique" pages
 */
const pageTypes = {
  grunnleggende: {
    name: "Grunnleggende",
    _type: "ds_artikkel",
    uniquePages: [],
  },
  komponenter: {
    name: "Komponenter",
    _type: "komponent_artikkel",
    uniquePages: [
      {
        heading: "Ikoner",
        slug: "komponenter/ikoner",
        tag: "ready",
      },
    ],
  },
  templates: {
    name: "Mønster og Maler",
    _type: "templates_artikkel",
    uniquePages: [],
  },
} as const;

type DesignsystemSidebarDataT = {
  label: string;
  links: DesignsystemSidebarSectionT;
}[];

function generateSidebar(
  input: DESIGNSYSTEM_SIDEBAR_QUERYResult,
  overviewPages: DESIGNSYSTEM_OVERVIEW_PAGES_QUERYResult,
): DesignsystemSidebarDataT {
  return Object.keys(pageTypes).map((type) => {
    const overviewPageList = overviewPages.find((page) =>
      stegaClean(page._type).includes(type),
    )?.overview_pages;

    const categories = sanityCategoryLookup(type as keyof typeof pageTypes);
    const filteredInput = input.filter(
      (doc) => stegaClean(doc._type) === pageTypes[type]._type,
    );

    const standalonePages: SidebarPageT[] = filteredInput
      .filter(isValidPage)
      .filter((page) => stegaClean(page.kategori) === "standalone")
      .sort((a, b) => {
        return (a?.heading ?? "").localeCompare(b?.heading ?? "");
      })
      .sort(sortIndex)
      .sort(sortDeprecated)
      .map((page) => ({
        heading: page.heading,
        slug: page.slug,
        tag: page.tag,
      }));

    const groupedPages = categories
      .map((category) => ({
        ...category,
        pages: filteredInput
          .filter((y) => stegaClean(y?.kategori) === category.value)
          .filter(isValidPage)
          .sort((a, b) => {
            return (a?.heading ?? "").localeCompare(b?.heading ?? "");
          })
          .sort(sortIndex)
          .sort(sortDeprecated),
      }))
      .filter((category) => !(!category.pages || category.pages.length === 0))
      .map((category) => {
        const hasOverviewPage = overviewPageList?.some(
          (page) => stegaClean(category.value) === page,
        );

        const pages = category.pages.map((page) => ({
          heading: page.heading,
          slug: page.slug,
          tag: page.tag,
        }));

        if (hasOverviewPage) {
          pages.unshift({
            heading: "Oversikt",
            slug: `${type}/${category.value}`,
            tag: "ready",
          });
        }

        return {
          ...category,
          pages,
        };
      });

    return {
      label: pageTypes[type].name,
      links: [
        ...pageTypes[type].uniquePages,
        ...standalonePages,
        ...groupedPages,
      ],
    };
  });
}

type SidebarInputNodeT = DESIGNSYSTEM_SIDEBAR_QUERYResult[number];

function isValidPage(page: SidebarInputNodeT): page is SidebarInputNodeT & {
  heading: string;
  slug: string;
  tag: string;
} {
  return !!(page?.heading && page?.slug && page?.tag);
}

function sortDeprecated(dirtyA: SidebarInputNodeT, dirtyB: SidebarInputNodeT) {
  const a = stegaClean(dirtyA);
  const b = stegaClean(dirtyB);

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

function sortIndex(dirtyA: SidebarInputNodeT, dirtyB: SidebarInputNodeT) {
  const a = stegaClean(dirtyA);
  const b = stegaClean(dirtyB);

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
