import {
  PresentationPluginOptions,
  defineLocations,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        heading: "heading",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || doc?.heading || "Untitled",
            href: `/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
};
