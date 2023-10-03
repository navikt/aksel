import { DocPencilIcon } from "@navikt/aksel-icons";
import { defineField, defineType } from "sanity";

export const UuFeedback = defineType({
  name: "uufeedback",
  title: "UU-feedback",
  type: "object",
  description: "Egen feedback for tilgjengelighetserklæringen",
  icon: DocPencilIcon,
  fields: [
    defineField({
      title: "Vis feedback",
      name: "vis",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
