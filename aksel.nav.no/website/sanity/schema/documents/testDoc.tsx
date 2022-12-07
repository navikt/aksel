import { defineField, defineType } from "sanity";
import { artikkelPreview } from "./presets/artikkel-preview";

export const TestDoc = defineType({
  title: "Test",
  name: "testDoc",
  type: "document",
  ...artikkelPreview("TestDoc"),
  fields: [
    defineField({
      name: "updateInfo",
      type: "updateWarning",
      title: " ",
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
