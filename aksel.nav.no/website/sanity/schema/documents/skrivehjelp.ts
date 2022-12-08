import { defineField, defineType } from "sanity";
import { block, headingStyles } from "../objects";

export const Skrivehjelp = defineType({
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
          //@ts-ignore
          styles: [...headingStyles],
        },
      ],
    }),
  ],
});
