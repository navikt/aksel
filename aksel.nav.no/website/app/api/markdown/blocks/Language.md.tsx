import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { portableMarkdown } from "@/app/api/markdown/helpers/portable-markdown";

function LanguageMarkdown(
  data: ExtractPortableMarkdownComponentProps<"language">,
) {
  const { language, body } = data.value;

  if (!language || !body || body.length === 0) {
    return "";
  }

  return portableMarkdown(body as any[]);
}

export { LanguageMarkdown };
