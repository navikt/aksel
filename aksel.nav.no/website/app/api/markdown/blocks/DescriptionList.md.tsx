import type { ExtractPortableComponentProps } from "@/app/_sanity/types";

function DescriptionListMarkdown(
  props: ExtractPortableComponentProps<"description_list">,
) {
  const { items } = props.value;

  if (!items || items.length === 0) {
    return null;
  }

  return items.map((item) => `- ${item.label}: ${item.value}`).join("\n");
}

export { DescriptionListMarkdown };
