import {
  PresentationPluginOptions,
  defineDocuments,
} from "sanity/presentation";
import { locations } from "./locations";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_id == "aksel_forside_dokument"`,
    },
    {
      route: "/komponenter/:category/:slug",
      resolve(ctx) {
        const { params } = ctx;
        return {
          filter: `_type == "komponent_artikkel" && slug.current == $slug}`,
          params: {
            slug: `komponenter/${params.category}/${params.slug}`,
          },
        };
      },
    },
    {
      route: "/grunnleggende/:category/:slug",
      resolve(ctx) {
        const { params } = ctx;
        return {
          filter: `_type == "ds_artikkel" && slug.current == $slug}`,
          params: {
            slug: `grunnleggende/${params.category}/${params.slug}`,
          },
        };
      },
    },
    {
      route: "/monster-maler/:category/:slug",
      resolve(ctx) {
        const { params } = ctx;
        return {
          filter: `_type == "templates_artikkel" && slug.current == $slug}`,
          params: {
            slug: `monster-maler/${params.category}/${params.slug}`,
          },
        };
      },
    },
    {
      route: "/god-praksis/artikler/:slug",
      resolve(ctx) {
        const { params } = ctx;
        return {
          filter: `_type == "aksel_artikkel" && slug.current == $slug}`,
          params: {
            slug: `god-praksis/artikler/${params.slug}`,
          },
        };
      },
    },
    {
      route: "/produktbloggen/:slug",
      resolve(ctx) {
        const { params } = ctx;
        return {
          filter: `_type == "aksel_blogg" && slug.current == $slug}`,
          params: {
            slug: `produktbloggen/${params.slug}`,
          },
        };
      },
    },
    /* TODO: Add support for misc pages (frontpage, landing-pages, god-praksis, god-praksis/tema etc) */
  ]),
  locations,

  /* TODO: Re-add locations for all article-documents. Temp removed to accomedate editor-migrations 21.08.2025 */
  /* return {
      komponent_artikkel: defineLocations({
        select: {
          title: "heading",
          slug: "slug.current",
        },
        resolve: (doc) => ({
          locations: [
            {
              title: doc?.title || "Untitled",
              href: `/${doc?.slug}`,
            },
          ],
        }),
      }),
      ds_artikkel: defineLocations({
        select: {
          title: "heading",
          slug: "slug.current",
        },
        resolve: (doc) => ({
          locations: [
            {
              title: doc?.title || "Untitled",
              href: `/${doc?.slug}`,
            },
          ],
        }),
      }),
      templates_artikkel: defineLocations({
        select: {
          title: "heading",
          slug: "slug.current",
        },
        resolve: (doc) => ({
          locations: [
            {
              title: doc?.title || "Untitled",
              href: `/${doc?.slug}`,
            },
          ],
        }),
      }),
    };
  }, */
};
