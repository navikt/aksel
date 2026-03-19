import { buildMarkdown } from "../helpers/build-markdown";
import { buildMetadataHeader } from "../helpers/metadata-header";

const title = "Aksel designsystem - Dokumentasjon for LLMs";
async function markdown() {
  const metadata = buildMetadataHeader({
    title,
    url: `https://aksel.nav.no/llm.md`,
  });

  return buildMarkdown(
    metadata,
    { heading: title, level: 1 },
    { heading: "LLM Dokumentasjon", level: 2 },
    docPages
      .map((page) => `- [${page.title}](${page.url}): ${page.desc}`)
      .join("\n"),
    { heading: "Notes", level: 2 },
    "This page is a work in progress.",
  );
}

const docPages: { title: string; url: string; desc: string }[] = [
  {
    title: "Components",
    url: "https://aksel.nav.no/llms.md",
    desc: "Complete list of all avaliable LLMs accessible documentation.",
  },
];

/*

# Chakra UI v3 Documentation for LLMs

> Chakra UI is an accessible component system for building products with speed

## Documentation Sets

- [Complete documentation](https://chakra-ui.com/llms-full.txt): The complete Chakra UI v3 documentation including all components, styling and theming
- [Components](https://chakra-ui.com/llms-components.txt): Documentation for all components in Chakra UI v3.
- [Charts](https://chakra-ui.com/llms-charts.txt): Documentation for the charts in Chakra UI v3.
- [Styling](https://chakra-ui.com/llms-styling.txt): Documentation for the styling system in Chakra UI v3.
- [Theming](https://chakra-ui.com/llms-theming.txt): Documentation for theming Chakra UI v3.
- [Migrating to v3](https://chakra-ui.com/llms-v3-migration.txt): Documentation for migrating to Chakra UI v3.

## Notes

- The complete documentation includes all content from the official documentation
- Package-specific documentation files contain only the content relevant to that package
- The content is automatically generated from the same source as the official documentation

*/

export default { markdown };
