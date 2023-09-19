import { defineField, defineType } from "sanity";
import { toPlainText } from "@portabletext/react";
import { LightBulbIcon } from "@navikt/aksel-icons";

export const Tips = defineType({
  name: "tips",
  title: "Tips",
  type: "object",
  icon: LightBulbIcon,
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
    prepare(selection) {
      return {
        title: toPlainText(selection?.body ?? []) ?? "",
        subtitle: "Tips",
        media: LightBulbIcon,
      };
    },
  },
});
