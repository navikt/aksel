import { toPlainText } from "@portabletext/react";
import { defineField, defineType } from "sanity";
import { LightBulbIcon } from "@navikt/aksel-icons";

export const Tips = defineType({
  name: "tips",
  title: "Tips",
  type: "object",
  icon: () => <LightBulbIcon aria-hidden />,
  fields: [
    defineField({
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error("Tips-modul må ha noe innhold"),
    }),
  ],
  preview: {
    select: {
      body: "body",
    },
    prepare: ({ body }) => {
      return {
        title: body ? toPlainText(body) : "Tomt innhold",
        subtitle: "Tips-modul",
      };
    },
  },
});
