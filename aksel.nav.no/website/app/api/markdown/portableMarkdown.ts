import { portableTextToMarkdown } from "@portabletext/markdown";
import type { PortableContentTypes } from "@/app/_sanity/types";
import { KodeEksemplerMarkdown } from "@/app/api/markdown/blocks/KodeEksempler.md";

function portableMarkdown(input?: any[]) {
  if (!input || !Array.isArray(input)) {
    return "";
  }
  return portableTextToMarkdown(input, {
    unknownType: ({ value }) => `<!-- Unknown type: ${value._type} -->`,
    types: {
      relatert_innhold: () => "",
      do_dont: () => "",
      bilde: () => "",
      alert: () => "",
      expansioncard: () => "",
      tabell_v2: () => "",
      accordion: () => "",
      props_seksjon: () => "",
      video: () => "",
      tips: () => "",
      kode: () => "",
      kode_eksempler: KodeEksemplerMarkdown,
      token_kategori: () => "",
      exampletext_block: () => "",
      attachment: () => "",
      compare_images: () => "",
      language: () => "",
    } satisfies Record<PortableContentTypes, (props: any) => string | null>,
  });
}
export { portableMarkdown };
