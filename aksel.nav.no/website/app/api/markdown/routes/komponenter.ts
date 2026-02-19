import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_KOMPONENTS_MARKDOWN_QUERY } from "@/app/_sanity/queries";
import { buildMarkdown } from "../helpers/build-markdown";
import { buildMetadataHeader } from "../helpers/metadata-header";
import { portableMarkdown } from "../helpers/portable-markdown";

async function markdown() {
  const { data } = await sanityMarkdownFetch({
    query: ALL_KOMPONENTS_MARKDOWN_QUERY,
  });

  if (!data || !data.content || !data.heading) {
    throw new Error("No data returned from Sanity");
  }

  const slug = data.slug?.current ?? "";
  const metadata = buildMetadataHeader({
    title: data.heading,
    url: `https://aksel.nav.no/${slug}`,
    status: data.status?.tag,
    category: data.kategori,
    packages: data.kodepakker,
  });

  const content = portableMarkdown(data.content);

  return buildMarkdown(
    metadata,
    { heading: data.heading },
    portableMarkdown(data.intro?.body),
    content,
  );
}

export default { markdown };
