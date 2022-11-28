import { allArticleDocsRef } from "../../../config";

export const relevanteArtiklerField = {
  title: "Relevante artikler",
  description:
    "Legg til relaterte artikler som du tenker er relevant å lese (maks 3)",
  name: "relevante_artikler",
  type: "array",
  group: "innhold",
  validation: (Rule) =>
    Rule.max(3).error("Kan ikke ha mer enn 3 relevante artikler lagt til"),
  of: [
    {
      type: "reference",
      weak: true,
      to: allArticleDocsRef,
    },
  ],
};
