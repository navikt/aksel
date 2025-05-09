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

type PageRoute = {
  slug: string;
  tag: string;
  heading: string;
};

type Routes = {
  komponenter: {
    title: "Komponenter";
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
    root: [],
    nested: {
      darkside: [
        {
          heading: "Tokens darkside",
          slug: `grunnleggende/darkside/design-tokens`,
          tag: "ready",
        },
      ],
    },
  },
  komponenter: {
    title: "Komponenter",
    _type: "komponent_artikkel",
    root: [
      {
        heading: "Ikoner",
        slug: "komponenter/ikoner",
        tag: "ready",
      },
    ],
  },
  templates: {
    title: "Mønster og Maler",
    _type: "templates_artikkel",
    root: [],
  },
} as const;

export { PAGE_ROUTES };
