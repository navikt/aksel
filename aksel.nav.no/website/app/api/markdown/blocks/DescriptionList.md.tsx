import type { ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";

function DescriptionListMarkdown(
  props: ExtractPortableMarkdownComponentProps<"description_list">,
) {
  const { items } = props.value;

  if (!items || items.length === 0) {
    return "";
  }

  return items.map((item) => `- ${item.label}: ${item.value}`).join("\n");
}

export { DescriptionListMarkdown };
