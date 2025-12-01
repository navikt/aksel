import { toPlainText } from "@portabletext/react";
import { defineField, defineType } from "sanity";
import { LanguageIcon } from "@navikt/aksel-icons";

export const Language = defineType({
  name: "language",
  title: "Språk",
  type: "object",
  icon: () => <LanguageIcon aria-hidden />,
  fields: [
    defineField({
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Språk",
      name: "language",
      type: "string",
      options: { list: [{ title: "Engelsk", value: "en" }] },
      initialValue: "en",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      body: "body",
      language: "language",
    },
    prepare(selection) {
      return {
        title: selection.body ? toPlainText(selection.body) : "Tomt innhold",
        subtitle: `lang=${selection.language}`,
      };
    },
  },
});
