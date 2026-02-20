import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

const VARIANT_LABELS: Record<string, string> = {
  do: "✅ Gjør",
  dont: "❌ Unngå",
  warning: "⚠️ Pass på",
};

function DoDontMarkdown(
  data: ExtractPortableMarkdownComponentProps<"do_dont">,
) {
  const { blokker } = data.value;

  if (!blokker || blokker.length === 0) {
    return "";
  }

  const items = blokker
    .map((block) => {
      if (!block.variant) {
        return null;
      }

      const label = VARIANT_LABELS[block.variant] ?? block.variant;
      const description = block.description
        ? `: ${block.description}`
        : block.alt
          ? `: ${block.alt}`
          : "";

      return `- **${label}**${description}`;
    })
    .filter(Boolean);

  if (items.length === 0) {
    return "";
  }

  return buildMarkdown(items.join("\n"));
}

export { DoDontMarkdown };
