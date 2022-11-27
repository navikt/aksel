import { defineField } from "sanity";

export const editorField = defineField({
  title: "Redaktører",
  description: "Legg til alle som har bidratt med denne siden!",
  name: "contributors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editor" }] }],
  group: "settings",
  validation: (Rule) => Rule.required(),
});
