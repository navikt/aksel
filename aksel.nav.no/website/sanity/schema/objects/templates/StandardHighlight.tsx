import { defineField, defineType } from "sanity";
import { Chat2Icon } from "@navikt/aksel-icons";
import StandardHightlight from "@/cms/standard-highlight/StandardHightlight";

export const StandardHighlightBlock = defineType({
  name: "standard_highlight",
  title: "Eksempel/Standard tekst",
  type: "object",
  icon: Chat2Icon,
  fields: [
    defineField({
      title: "Heading",
      name: "title",
      type: "string",
      initialValue: "Eksempeltekst for A, B og C",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Tekst",
      name: "text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      text: "text",
    },
  },
  components: {
    preview: (values) => <StandardHightlight node={values as any} />,
  },
});
