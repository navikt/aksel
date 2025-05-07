import type { MetadataRoute } from "next";
import { fetchAllSanityPages } from "@/app/_sanity/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchAllSanityPages();

  return pages.map((page) => ({
    url: `https://www.aksel.nav.no${page.slug}`,
    lastModified: page.lastMod.split("T")[0],
  }));

  return [
    {
      url: "https://example.com",
      lastModified: "2021-01-01",
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://example.com/image.jpg"],
    },
  ];
}
