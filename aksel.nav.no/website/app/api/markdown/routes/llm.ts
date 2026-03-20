import { buildMarkdown } from "../helpers/build-markdown";

const title = "Aksel designsystem - Dokumentasjon for LLMs";
async function markdown() {
  return buildMarkdown(
    { heading: title, level: 1 },
    { heading: "Notes", level: 2 },
    "This page is a work in progress. All content should be treated as temporary.",
    { heading: "LLM Dokumentasjon", level: 2 },
    docPages
      .map((page) => `- [${page.title}](${page.url}): ${page.desc}`)
      .join("\n"),
  );
}

const docPages: { title: string; url: string; desc: string }[] = [
  {
    title: "Components",
    url: "https://aksel.nav.no/komponenter.md",
    desc: "Complete list of all avaliable LLMs accessible documentation for React components.",
  },
];

export default { markdown };
