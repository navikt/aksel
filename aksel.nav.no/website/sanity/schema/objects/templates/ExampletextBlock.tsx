import { defineField, defineType } from "sanity";
import { Chat2Icon } from "@navikt/aksel-icons";
import AkselExampletextBlock from "@/cms/exampletext-block/ExampletextBlock";

export const ExampletextBlock = defineType({
  name: "exampletext_block",
  title: "Eksempel/Standard tekst",
  type: "object",
  icon: Chat2Icon,
  fields: [
    defineField({
      title: "Heading",
      name: "title",
      type: "string",
      initialValue: "Eksempeltekst",
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
    preview: (values) => <AkselExampletextBlock node={values as any} />,
  },
});
