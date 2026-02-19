import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";
import { portableMarkdown } from "@/app/api/markdown/helpers/portable-markdown";

function AttachmentMarkdown(
  data: ExtractPortableMarkdownComponentProps<"attachment">,
) {
  const { title, downloadLink, fileName, body } = data.value;

  if (!title || !downloadLink || !fileName || !body) {
    return "";
  }

  const content = portableMarkdown(body as any[]);

  const parts: string[] = [
    `**${title}**`,
    `[Last ned ${fileName}](${downloadLink})`,
  ];

  if (content) {
    parts.push(content);
  }

  return buildMarkdown(...parts);
}

export { AttachmentMarkdown };
