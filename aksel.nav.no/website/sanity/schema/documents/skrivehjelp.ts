import { defineField, defineType } from "sanity";
import { block, headingStyles } from "../objects";

export const Skrivehjelp = defineType({
  title: "Skrivehjelp",
  name: "skrivehjelp",
  type: "document",
  fields: [
    defineField({
      title: "Test doc skrivehjelp",
      name: "testDoc_writeHelp",
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
