import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { portableMarkdown } from "@/app/api/markdown/helpers/portable-markdown";

function ExpansionCardMarkdown(
  data: ExtractPortableMarkdownComponentProps<"expansioncard">,
) {
  const { heading, body, description } = data.value;

  if (!heading || !body || body.length === 0) {
    return "";
  }

  const content = portableMarkdown(body as any[]);

  if (!content) {
    return "";
  }

  const summary = description ? `${heading} — ${description}` : heading;

  return `<details>\n<summary>${summary}</summary>\n\n${content}\n</details>`;
}

export { ExpansionCardMarkdown };
