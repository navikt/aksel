import { defineField } from "sanity";

export const writersField = defineField({
  title: "Redaksjoner",
  description: "Legg til redaksjoner som har bidratt til artikkelen.",
  name: "writers",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editorial_staff" }] }],
  group: "settings",
  validation: (Rule) => Rule.required(),
});
