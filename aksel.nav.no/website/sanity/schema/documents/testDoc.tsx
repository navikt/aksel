import { defineField, defineType } from "sanity";

export const TestDoc = defineType({
  title: "Test",
  name: "testDoc",
  type: "document",
  fields: [
    defineField({
      name: "updateInfo",
      type: "updateWarning",
    }),
    defineField({
      name: "testInput",
      title: "Test input",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        maxLength: 10,
      },
    }),
    defineField({ type: "riktekst_standard", name: "content" }),
  ],
});
