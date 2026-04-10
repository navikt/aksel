import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

function ExampleTextMarkdown(
  data: ExtractPortableMarkdownComponentProps<"exampletext_block">,
) {
  const { title, text } = data.value;

  if (!text || !title) {
    return "";
  }

  return buildMarkdown("---Eksempeltekst", `**${title}**`, text, "---");
}

export { ExampleTextMarkdown };
