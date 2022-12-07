import { defineField, defineType } from "sanity";

export const Skrivehjelp = defineType({
  title: "Skrivehjelp",
  name: "skrivehjelp",
  type: "document",
  fields: [
    defineField({
      title: "Test doc skrivehjelp",
      name: "testDoc_writeHelp",
      type: "riktekst_enkel",
    }),
  ],
});
