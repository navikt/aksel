import { portableTextToMarkdown } from "@portabletext/markdown";
import type { PortableContentTypes } from "@/app/_sanity/types";
import { MarkdownRoutes } from "@/app/api/markdown/MarkdownRouteHandler";
import { AccordionMarkdown } from "@/app/api/markdown/blocks/Accordion.md";
import { AlertMarkdown } from "@/app/api/markdown/blocks/Alert.md";
import { AttachmentMarkdown } from "@/app/api/markdown/blocks/Attachment.md";
import { BildeMarkdown } from "@/app/api/markdown/blocks/Bilde.md";
import { DescriptionListMarkdown } from "@/app/api/markdown/blocks/DescriptionList.md";
import { DoDontMarkdown } from "@/app/api/markdown/blocks/DoDont.md";
import { ExampleTextMarkdown } from "@/app/api/markdown/blocks/ExampleText.md";
import { ExpansionCardMarkdown } from "@/app/api/markdown/blocks/ExpansionCard.md";
import { KodeMarkdown } from "@/app/api/markdown/blocks/Kode.md";
import { KodeEksemplerMarkdown } from "@/app/api/markdown/blocks/KodeEksempler.md";
import { LanguageMarkdown } from "@/app/api/markdown/blocks/Language.md";
import { RelatertInnholdMarkdown } from "@/app/api/markdown/blocks/RelatertInnhold.md";
import { TabellMarkdown } from "@/app/api/markdown/blocks/Tabell.md";
import { TipsMarkdown } from "@/app/api/markdown/blocks/Tips.md";
import { VideoMarkdown } from "@/app/api/markdown/blocks/Video.md";

const AKSEL_BASE_URL = "https://aksel.nav.no";

function portableMarkdown(input?: any[]) {
  if (!input || !Array.isArray(input)) {
    return "";
  }
  return portableTextToMarkdown(input, {
    unknownType: ({ value }) => `<!-- Unknown type: ${value._type} -->`,
    marks: {
      kbd: ({ children }) => `<kbd>${children}</kbd>`,
      quote: ({ children }) => `"${children}"`,
      link: ({ children, value }) => {
        const href = value?.href;
        if (!href) return children;
        return `[${children}](${toMarkdownUrl(href)})`;
      },
      internalLink: ({ children, value }) => {
        const slug = value?.slug?.current;
        if (!slug) {
          return children;
        }
        const anchor = value?.anchor ? `#${value.anchor}` : "";
        const suffix = MarkdownRoutes.isDynamicRoute(`/${slug}`) ? ".md" : "";
        return `[${children}](${AKSEL_BASE_URL}/${slug}${suffix}${anchor})`;
      },
    },
    types: {
      relatert_innhold: RelatertInnholdMarkdown,
      do_dont: DoDontMarkdown,
      bilde: BildeMarkdown,
      alert: AlertMarkdown,
      expansioncard: ExpansionCardMarkdown,
      tabell_v2: TabellMarkdown,
      accordion: AccordionMarkdown,
      video: VideoMarkdown,
      tips: TipsMarkdown,
      kode: KodeMarkdown,
      kode_eksempler: KodeEksemplerMarkdown,
      token_kategori: () =>
        "Komponent-tokens ikke støttet fra versjon 8.0.0 og nyere. Bruk theming og `data-color`-attrbutten for å style komponenter basert på tokens.",
      exampletext_block: ExampleTextMarkdown,
      attachment: AttachmentMarkdown,
      compare_images: () => "",
      language: LanguageMarkdown,
      description_list: DescriptionListMarkdown,
    } satisfies Record<PortableContentTypes, (props: any) => string>,
  });
}

/** Returns the URL rewritten to point to the .md endpoint if applicable, otherwise unchanged. */
function toMarkdownUrl(href: string): string {
  let parsed: URL;
  try {
    parsed = new URL(href);
  } catch {
    return href;
  }
  if (parsed.hostname !== "aksel.nav.no") {
    return href;
  }

  // e.g. "/komponenter/core/button"
  const slug = parsed.pathname.replace(/^\//, ""); // strip leading slash
  const hasMdEndpoint = MarkdownRoutes.isDynamicRoute(`/${slug}`);

  if (!hasMdEndpoint) {
    return href;
  }
  const query = parsed.search ? parsed.search.slice(1) : "";
  const anchor = parsed.hash ? parsed.hash.slice(1) : "";
  return `${AKSEL_BASE_URL}/${slug}.md${query ? `?${query}` : ""}${anchor ? `#${anchor}` : ""}`;
}

export { portableMarkdown };
