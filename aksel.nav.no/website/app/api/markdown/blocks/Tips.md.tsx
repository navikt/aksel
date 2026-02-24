import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { portableMarkdown } from "@/app/api/markdown/helpers/portable-markdown";

function TipsMarkdown(data: ExtractPortableMarkdownComponentProps<"tips">) {
  const { body } = data.value;

  if (!body || body.length === 0) {
    return "";
  }

  const content = portableMarkdown(body as any[]);

  if (!content) {
    return "";
  }

  const quoted = content
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");

  return `> **Tips:**\n>\n${quoted}`;
}

export { TipsMarkdown };
