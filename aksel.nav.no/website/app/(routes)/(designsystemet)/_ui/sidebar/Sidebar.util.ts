import { stegaClean } from "next-sanity";
import "server-only";
import { PAGE_ROUTES } from "@/app/(routes)/routing-config";
import {
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERY_RESULT,
  DESIGNSYSTEM_SIDEBAR_QUERY_RESULT,
} from "@/app/_sanity/query-types";
import { sanityCategoryLookup } from "@/sanity/config";
import { DesignsystemSidebarSectionT, SidebarPageT } from "@/types";

type DesignsystemSidebarDataT = {
  label: string;
  links: DesignsystemSidebarSectionT;
}[];

function typedKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

function generateSidebar(
  input: DESIGNSYSTEM_SIDEBAR_QUERY_RESULT,
  overviewPages: DESIGNSYSTEM_OVERVIEW_PAGES_QUERY_RESULT,
): DesignsystemSidebarDataT {
  return typedKeys(PAGE_ROUTES).map((type) => {
    const overviewPageList = overviewPages.find((page) =>
      stegaClean(page._type).includes(type),
    )?.overview_pages;

    const categories = sanityCategoryLookup(type);

    const filteredInput = input.filter(
      (doc) => stegaClean(doc._type) === PAGE_ROUTES[type]._type,
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

        if (
          PAGE_ROUTES[type].nested &&
          category.value in PAGE_ROUTES[type].nested
        ) {
          pages.push(...PAGE_ROUTES[type].nested[category.value]);
        }

        return {
          ...category,
          pages,
        };
      })
      .filter((category) => category.pages.length > 0);

    return {
      label: PAGE_ROUTES[type].title,
      links: [
        ...PAGE_ROUTES[type].root.filter(
          (route) => !route.order || route.order === "first",
        ),
        ...standalonePages,
        ...groupedPages,
        ...PAGE_ROUTES[type].root.filter(
          (route) => route.order && route.order === "last",
        ),
      ],
    };
  });
}

type SidebarInputNodeT = DESIGNSYSTEM_SIDEBAR_QUERY_RESULT[number];

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
