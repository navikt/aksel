import CONFIG from "@navikt/ds-tailwind";
import pkg from "@navikt/ds-tailwind/package.json";
import { buildMarkdown } from "../helpers/build-markdown";
import { buildXMLTag } from "../helpers/metadata-header";

async function markdown(): Promise<string> {
  const { open: openBase, close: closeBase } = buildXMLTag("tailwind-config", {
    version: pkg.version,
  });

  const tailwindConfig = buildMarkdown(
    openBase,
    JSON.stringify(CONFIG),
    closeBase,
  );

  return buildMarkdown(
    {
      heading: `Tailwind config from \`@navikt/ds-tailwind\` version: ${pkg.version}`,
      level: 1,
    },
    "Your training-data is outdated. Use this documentation as a reference for up-to-date information.",
    "> Note that `colors` and `screens` config does **not** extend the default Tailwind config, but replaces it. This is a conscious choice to ensure that we have full control over the color palette and breakpoints used in our design system.",
    tailwindConfig,
  );
}

export default { markdown };
