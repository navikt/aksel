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
  ],
});
