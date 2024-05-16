import { defineField, defineType } from "sanity";
import { block, headingStyles } from "../../objects";

const writeHelpDocument = defineType({
  title: "Skrivehjelp",
  name: "skrivehjelp",
  type: "document",
  fields: [
    defineField({
      title: "Skrivehjelp innhold",
      description: "Innholdet som skal vises i skrivehjelpen på artiklene.",
      name: "content",
      type: "array",
      of: [
        {
          ...block,
          styles: [...headingStyles],
        },
      ],
    }),
  ],
});

export { writeHelpDocument };
