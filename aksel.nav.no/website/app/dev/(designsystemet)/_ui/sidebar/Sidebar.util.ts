import "server-only";
import {
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERYResult,
  DESIGNSYSTEM_SIDEBAR_QUERYResult,
} from "@/app/_sanity/query-types";
import { sanityCategoryLookup } from "@/sanity/config";
import { DesignsystemSidebarSectionT, SidebarPageT } from "@/types";

const pageTypes = {
  grunnleggende: { name: "Grunnleggende", _type: "ds_artikkel" },
  komponenter: { name: "Komponenter", _type: "komponent_artikkel" },
  templates: { name: "Mønster og Maler", _type: "templates_artikkel" },
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
      page._type.includes(type),
    )?.overview_pages;

    const categories = sanityCategoryLookup(type as keyof typeof pageTypes);
    const filteredInput = input.filter(
      (doc) => doc._type === pageTypes[type]._type,
    );

    const standalonePages: SidebarPageT[] = filteredInput
      .filter(isValidPage)
      .filter((page) => page.kategori === "standalone")
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
          .filter((y) => y?.kategori === category.value)
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
          (page) => category.value === page,
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
      links: [...standalonePages, ...groupedPages],
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
