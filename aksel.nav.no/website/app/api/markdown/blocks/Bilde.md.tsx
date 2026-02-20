import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

function BildeMarkdown(data: ExtractPortableMarkdownComponentProps<"bilde">) {
  const { alt, dekorativt, caption, kilde } = data.value;

  if (dekorativt) {
    return "";
  }

  const parts: string[] = [];

  if (alt) {
    parts.push(`*[Bilde: ${alt}]*`);
  }

  if (caption) {
    parts.push(caption);
  }

  if (kilde?.har_kilde && kilde.tekst) {
    const prefix = kilde.prefix ?? "Kilde";
    const source = kilde.link
      ? `${prefix}: [${kilde.tekst}](${kilde.link})`
      : `${prefix}: ${kilde.tekst}`;
    parts.push(source);
  }

  if (parts.length === 0) {
    return "";
  }

  return buildMarkdown(...parts);
}

export { BildeMarkdown };
