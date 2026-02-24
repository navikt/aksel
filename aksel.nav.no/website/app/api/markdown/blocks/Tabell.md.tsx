import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";

function TabellMarkdown(
  data: ExtractPortableMarkdownComponentProps<"tabell_v2">,
) {
  const { rows } = data.value;

  if (!rows || rows.length < 2) {
    return "";
  }

  const header = rows[0].cells;
  const content = rows.slice(1);

  if (!header || !content) {
    return "";
  }

  const headerRow = `| ${header.join(" | ")} |`;
  const separatorRow = `| ${header.map(() => "---").join(" | ")} |`;
  const contentRows = content
    .map((row) => `| ${(row.cells ?? []).join(" | ")} |`)
    .join("\n");

  return `${headerRow}\n${separatorRow}\n${contentRows}`;
}

export { TabellMarkdown };
