import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const UuFeedback = defineType({
  name: "uufeedback",
  title: "UU-feedback",
  type: "object",
  description: "Egen feedback for tilgjengelighetserklæringen",
  icon: ComposeIcon,
  fields: [
    defineField({
      title: "Vis feedback",
      name: "vis",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
