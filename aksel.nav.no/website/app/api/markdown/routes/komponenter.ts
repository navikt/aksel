import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_KOMPONENTS_MARKDOWN_QUERY } from "@/app/_sanity/queries";
import { portableMarkdown } from "@/app/api/markdown/portableMarkdown";
import { buildMarkdown } from "../utils";

async function markdown() {
  const { data } = await sanityMarkdownFetch({
    query: ALL_KOMPONENTS_MARKDOWN_QUERY,
  });

  if (!data || !data.content || !data.heading) {
    throw new Error("No data returned from Sanity");
  }

  const content = portableMarkdown(data.content);

  return buildMarkdown(
    { heading: data.heading },
    portableMarkdown(data.intro?.body),
    content,
  );
}

export default { markdown };
