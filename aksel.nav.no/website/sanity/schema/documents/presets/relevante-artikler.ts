import { allArticleDocsRef } from "../../../config";

export const relevanteArtiklerField = {
  title: "Relaterte artikler",
  description: "Legg til artikler det er naturlig å lese etter denne (maks 3)",
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
