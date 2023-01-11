import { defineField, defineType } from "sanity";
import { block, headingStyles } from "../objects";

export const Publiseringsflyt = defineType({
  title: "Publiseringsflyt",
  name: "publication_flow",
  type: "document",
  fields: [
    defineField({
      title: "Publisering",
      description: "Innhold til kvalitetssjekk-modal ved publisering.",
      name: "publishContent",
      type: "array",
      of: [
        {
          ...block,
          //@ts-ignore
          styles: [...headingStyles],
        },
      ],
    }),
    defineField({
      title: "Godkjenn innhold før frist",
      description:
        "Innhold til godkjenning-modal innenfor 6mnd siden forrige godkjenning.",
      name: "preVerify",
      type: "array",
      of: [
        {
          ...block,
          //@ts-ignore
          styles: [...headingStyles],
        },
      ],
    }),
    defineField({
      title: "Godkjenn innhold etter frist",
      description:
        "Innhold til godkjenning-modal etter 6mnd siden forrige godkjenning.",
      name: "postVerify",
      type: "array",
      of: [
        {
          ...block,
          //@ts-ignore
          styles: [...headingStyles],
        },
      ],
    }),
  ],
});
