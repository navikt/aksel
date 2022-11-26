import { Ruler } from "@navikt/ds-icons";
import { defineField, defineType } from "sanity";

export const KodeEksempler = defineType({
  title: "Kode-eksempler",
  name: "kode_eksempler",
  type: "object",
  fields: [
    defineField({
      title: "tittel",
      name: "title",
      type: "string",
      initialValue: "Kode-eksempler",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      title: "Eksempler",
      name: "dir",
      type: "reference",
      to: [{ type: "kode_eksempler_fil" }],
      options: {
        filter: "dir == true",
      },
    }),
  ],
  icon: Ruler,
  preview: {
    select: {
      dir: "dir.title",
    },
    prepare({ dir }) {
      return {
        title: "Komponent-demo",
        subtitle: dir ?? "",
        media: Ruler,
      };
    },
  },
});
