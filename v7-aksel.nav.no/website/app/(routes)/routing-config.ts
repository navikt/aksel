/**
 * Some pages are not part of the sanity CMS environment, but rather
 * hardcoded in the codebase. We still need a way to reference them in the sidebar and sitemap.
 * This file contains the routes for those pages.
 */
import { grunnleggendeKategorier, komponentKategorier } from "@/sanity/config";
import { metadata as iconsMetadata } from "./(designsystemet)/komponenter/ikoner/page";

type PageRoute = {
  slug: string;
  tag: string;
  heading: string;
  order?: "first" | "last";
  /**
   * Since we cant include the search metadata in the sanity query, we need to manually add it here.
   */
  searchMetadata?: {
    intro?: string;
  };
};

type Routes = {
  komponenter: {
    title: "Byggeklosser";
    _type: "komponent_artikkel";
    root: PageRoute[];
    nested?: Partial<
      Record<(typeof komponentKategorier)[number]["value"], PageRoute[]>
    >;
  };
  grunnleggende: {
    title: "Grunnleggende";
    _type: "ds_artikkel";
    root: PageRoute[];
    nested?: Partial<
      Record<(typeof grunnleggendeKategorier)[number]["value"], PageRoute[]>
    >;
  };
};

const PAGE_ROUTES: Routes = {
  grunnleggende: {
    title: "Grunnleggende",
    _type: "ds_artikkel",
    root: [],
  },
  komponenter: {
    title: "Byggeklosser",
    _type: "komponent_artikkel",
    root: [
      {
        heading: "Ikoner",
        slug: "komponenter/ikoner",
        tag: "ready",
        searchMetadata: {
          intro: iconsMetadata?.description ?? "",
        },
      },
    ],
  },
} as const;

export { PAGE_ROUTES };
