import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

function VideoMarkdown(data: ExtractPortableMarkdownComponentProps<"video">) {
  const { alt, caption, transkripsjon } = data.value;

  const parts: string[] = [];

  if (alt) {
    parts.push(`*[Video: ${alt}]*`);
  }

  if (caption) {
    parts.push(caption);
  }

  if (transkripsjon) {
    parts.push(`**Transkripsjon:**\n\n${transkripsjon}`);
  }

  if (parts.length === 0) {
    return "";
  }

  return buildMarkdown(...parts);
}

export { VideoMarkdown };
