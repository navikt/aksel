import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

function KodeMarkdown(data: ExtractPortableMarkdownComponentProps<"kode">) {
  const { code, title } = data.value;

  if (!code || !code.code) {
    return "";
  }

  const lang = code.language ?? "tsx";

  return buildMarkdown(
    `\`\`\`${lang}${title ? ` title: ${title}` : ""}\n${code.code}\n\`\`\``,
  );
}

export { KodeMarkdown };
