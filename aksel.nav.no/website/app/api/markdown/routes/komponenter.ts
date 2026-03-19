import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_KOMPONENTS_MARKDOWN_QUERY } from "@/app/_sanity/queries";
import { buildMarkdown } from "../helpers/build-markdown";
import { buildXMLTag } from "../helpers/metadata-header";
import { portableMarkdown } from "../helpers/portable-markdown";

async function markdown() {
  const { data } = await sanityMarkdownFetch({
    /* TODO: Catch all query, cant be cached. With tag based revalidation. Does this matter here? */
    query: ALL_KOMPONENTS_MARKDOWN_QUERY,
  });

  if (!data || data.length === 0) {
    throw new Error("No data returned from Sanity");
  }
  const markdownResults: string[] = [];

  const sortedData = data.sort((a, b) => {
    const sidebarSort = (a.sidebarindex ?? 0) - (b.sidebarindex ?? 0);

    if (sidebarSort !== 0) {
      return sidebarSort;
    }
    return (a.heading ?? "").localeCompare(b.heading ?? "");
  });

  for (const item of sortedData) {
    if (!item.slug?.current || !item.heading || !item.content) {
      continue;
    }

    const { open, close } = buildXMLTag("component", {
      name: item.heading,
      status: item.status?.tag ?? "stable",
      category: item.kategori ?? "Ukjent",
      packages: (item.kodepakker ?? []).join(", ") || "Ukjent",
    });

    const content = portableMarkdown(item.content);
    markdownResults.push(
      buildMarkdown(
        open,
        { heading: item.heading },
        portableMarkdown(item.intro?.body),
        content,
        close,
      ),
    );
  }

  return buildMarkdown(
    { heading: "Alle komponenter i Aksel", level: 1 },
    "Oversikt over alle komponenter i Aksel",
    markdownResults.join("\n\n"),
  );
}

export default { markdown };
