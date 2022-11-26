import { toPlainText } from "../../../util";
import { LightBulb } from "@navikt/ds-icons";
import { defineField, defineType } from "sanity";

export const Tips = defineType({
  name: "tips",
  title: "Tips",
  type: "object",
  icon: LightBulb,
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
      eksperiment: "eksperiment",
    },
    prepare(selection) {
      return {
        title: toPlainText(selection?.body ?? []) ?? "",
        subtitle: "Tips",
        media: LightBulb,
      };
    },
  },
});
