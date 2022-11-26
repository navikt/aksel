import { defineField, defineType } from "sanity";
import { StringInputSmall } from "../custom-components";

export const TestDoc = defineType({
  title: "Test",
  name: "testDoc",
  type: "document",
  fields: [
    defineField({
      name: "testInput",
      title: "Test input",
      type: "string",
      validation: (Rule) => Rule.required(),
      components: {
        input: StringInputSmall,
      },
      options: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        maxLength: 10,
      },
    }),
    defineField({ type: "riktekst_aksel", name: "content" }),
  ],
});
