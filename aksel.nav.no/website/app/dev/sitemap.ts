import type { MetadataRoute } from "next";
import { fetchAllSanityPages } from "@/app/_sanity/live-fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchAllSanityPages();

  return pages.map((page) => ({
    url: `https://www.aksel.nav.no${page.slug}`,
    lastModified: page?.lastMod?.split("T")[0] ?? undefined,
  }));
}
