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
  /**
   * Since we cant include the search metadata in the sanity query, we need to manually add it here.
   */
  searchMetadata?: {
    intro?: string;
  };
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
          searchMetadata: {
            intro: `Ved å bruke design tokens sørger vi for at både designere og utviklere arbeider etter de samme reglene og retningslinjene.
Dette forenkler vedlikeholdet av designet og sikrer en helhetlig visuell fremstilling på tvers av produkter.`,
          },
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
        searchMetadata: {
          intro:
            "901+ open source-ikoner designet og utviklet for Nav. Finn riktig ikon til din løsning.",
        },
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
