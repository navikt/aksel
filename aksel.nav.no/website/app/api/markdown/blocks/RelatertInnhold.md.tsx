import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

function RelatertInnholdMarkdown(
  data: ExtractPortableMarkdownComponentProps<"relatert_innhold">,
) {
  const { lenker, title } = data.value;

  if (!lenker || lenker.length === 0) {
    return "";
  }

  const heading = title ? `**${title}**` : "**Relatert innhold**";

  const links = lenker.map((link) => {
    const label = link.title || "Mangler tittel";
    let href = "#";
    if (link.intern && link.intern_lenke) {
      href = `https://aksel.nav.no/${link.intern_lenke}`;
    } else if (link.ekstern_link) {
      href = link.ekstern_link;
    }
    return `- [${label}](${href})`;
  });

  return buildMarkdown(heading, links.join("\n"));
}

export { RelatertInnholdMarkdown };
