import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const KodeEksempler = defineType({
  title: "Komponent-eksempel",
  name: "kode_eksempler",
  type: "object",
  icon: ComponentIcon,
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
  preview: {
    select: {
      dir: "dir.title",
    },
    prepare({ dir }) {
      return {
        title: "Komponent-demo",
        subtitle: dir ?? "",
        media: ComponentIcon,
      };
    },
  },
});
