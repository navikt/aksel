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
      title: "Tittel",
      name: "title",
      type: "string",
      initialValue: "Eksempeltekst",
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (!context.document) return true;
          const content = context.document.content as any[];
          const blocksWithThisTitle = content
            .filter((block) => block._type === "exampletext_block")
            .filter((block) => block.title === value);
          if (blocksWithThisTitle.length > 1) {
            return "Tittelen må være unik på tvers av alle eksempeltekst-blokkene.";
          }
          return true;
        }),
    }),
    defineField({
      title: "Tekst",
      name: "text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Bruk ReadMore",
      name: "readMore",
      type: "boolean",
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
