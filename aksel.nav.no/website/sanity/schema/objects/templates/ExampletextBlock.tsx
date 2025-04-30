import { defineField, defineType } from "sanity";
import { Chat2Icon } from "@navikt/aksel-icons";
import { ExpansionCardT } from "../shared/expansion-card";

type ExampletextBlockT = {
  _key: string;
  _type: "exampletext_block";
  title?: string;
  text?: string;
  readMore?: boolean;
};

type ContentTypesWeCareAbout = ExampletextBlockT | ExpansionCardT;

export const ExampletextBlock = defineType({
  name: "exampletext_block",
  title: "Eksempel/Standard tekst",
  type: "object",
  icon: () => <Chat2Icon aria-hidden />,
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      initialValue: "Eksempeltekst",
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (!context.document) return true;
          const content = context.document.content as ContentTypesWeCareAbout[];
          let blocksWithThisTitle = 0;

          content.forEach((block) => {
            if (block._type === "exampletext_block" && block.title === value) {
              blocksWithThisTitle++;
            } else if (block._type === "expansioncard") {
              blocksWithThisTitle += block.body
                .filter((subBlock) => subBlock._type === "exampletext_block")
                .filter((subBlock) => subBlock.title === value).length;
            }
          });

          if (blocksWithThisTitle > 1) {
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
  ],
  preview: {
    select: {
      title: "title",
      text: "text",
    },
    prepare: ({ title, text }) => {
      return { title, subtitle: "Eksempel/Standard tekst", description: text };
    },
  },
});
