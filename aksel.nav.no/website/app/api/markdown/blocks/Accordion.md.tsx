import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";
import { portableMarkdown } from "@/app/api/markdown/helpers/portable-markdown";

function AccordionMarkdown(
  data: ExtractPortableMarkdownComponentProps<"accordion">,
) {
  const { list } = data.value;

  if (!list || list.length === 0) {
    return "";
  }

  const sections = list
    .map((item) => {
      const title = item.title;
      const content = portableMarkdown((item.content ?? []) as any[]);

      if (!title || !content) {
        return null;
      }

      return `<details>\n<summary>${title}</summary>\n\n${content}\n</details>`;
    })
    .filter(Boolean);

  return buildMarkdown(...sections);
}

export { AccordionMarkdown };
