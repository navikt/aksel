/**
 * Some pages are not part of the sanity CMS environment, but rather
 * hardcoded in the codebase. We still need a way to reference them in the sidebar and sitemap.
 * This file contains the routes for those pages.
 */
import {
  grunnleggendeKategorier,
  komponentKategorier,
  templatesKategorier,
} from "@/sanity/config";
import { metadata as tokenMetadata } from "./(designsystemet)/grunnleggende/styling/design-tokens/page";
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
  templates: {
    title: "Mønster og Maler";
    _type: "templates_artikkel";
    root: PageRoute[];
    nested?: Partial<
      Record<(typeof templatesKategorier)[number]["value"], PageRoute[]>
    >;
  };
};

const PAGE_ROUTES: Routes = {
  grunnleggende: {
    title: "Grunnleggende",
    _type: "ds_artikkel",
    root: [
      {
        heading: "Endringslogg",
        slug: `grunnleggende/endringslogg`,
        tag: "ready",
        order: "last",
      },
    ],
    nested: {
      styling: [
        {
          heading: "Design tokens",
          slug: `grunnleggende/styling/design-tokens`,
          tag: "ready",
          searchMetadata: {
            intro: tokenMetadata?.description ?? "",
          },
        },
      ],
    },
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
  templates: {
    title: "Mønster og Maler",
    _type: "templates_artikkel",
    root: [
      {
        heading: "Oversikt",
        slug: "monster-maler",
        tag: "ready",
      },
    ],
  },
} as const;

export { PAGE_ROUTES };
