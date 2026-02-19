import { portableTextToMarkdown } from "@portabletext/markdown";
import type { PortableContentTypes } from "@/app/_sanity/types";
import { AccordionMarkdown } from "@/app/api/markdown/blocks/Accordion.md";
import { AlertMarkdown } from "@/app/api/markdown/blocks/Alert.md";
import { AttachmentMarkdown } from "@/app/api/markdown/blocks/Attachment.md";
import { BildeMarkdown } from "@/app/api/markdown/blocks/Bilde.md";
import { DoDontMarkdown } from "@/app/api/markdown/blocks/DoDont.md";
import { ExampleTextMarkdown } from "@/app/api/markdown/blocks/ExampleText.md";
import { ExpansionCardMarkdown } from "@/app/api/markdown/blocks/ExpansionCard.md";
import { KodeMarkdown } from "@/app/api/markdown/blocks/Kode.md";
import { KodeEksemplerMarkdown } from "@/app/api/markdown/blocks/KodeEksempler.md";
import { LanguageMarkdown } from "@/app/api/markdown/blocks/Language.md";
import { PropsSeksjonMarkdown } from "@/app/api/markdown/blocks/PropsSeksjon.md";
import { RelatertInnholdMarkdown } from "@/app/api/markdown/blocks/RelatertInnhold.md";
import { TabellMarkdown } from "@/app/api/markdown/blocks/Tabell.md";
import { TipsMarkdown } from "@/app/api/markdown/blocks/Tips.md";
import { VideoMarkdown } from "@/app/api/markdown/blocks/Video.md";

function portableMarkdown(input?: any[]) {
  if (!input || !Array.isArray(input)) {
    return "";
  }
  return portableTextToMarkdown(input, {
    unknownType: ({ value }) => `<!-- Unknown type: ${value._type} -->`,
    types: {
      relatert_innhold: RelatertInnholdMarkdown,
      do_dont: DoDontMarkdown,
      bilde: BildeMarkdown,
      alert: AlertMarkdown,
      expansioncard: ExpansionCardMarkdown,
      tabell_v2: TabellMarkdown,
      accordion: AccordionMarkdown,
      props_seksjon: PropsSeksjonMarkdown,
      video: VideoMarkdown,
      tips: TipsMarkdown,
      kode: KodeMarkdown,
      kode_eksempler: KodeEksemplerMarkdown,
      token_kategori: () =>
        "Komponent-tokens ikke støttet fra versjon 8.0.0 og nyere.",
      exampletext_block: ExampleTextMarkdown,
      attachment: AttachmentMarkdown,
      compare_images: () => "",
      language: LanguageMarkdown,
    } satisfies Record<PortableContentTypes, (props: any) => string | null>,
  });
}

export { portableMarkdown };
