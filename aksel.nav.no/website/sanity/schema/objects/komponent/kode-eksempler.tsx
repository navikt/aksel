import { ComponentIcon } from "@navikt/aksel-icons";
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
    }),
  ],
  preview: {
    select: {
      dir: "dir.title",
      variant: "dir.variant",
    },
    prepare({ dir, variant }) {
      return {
        title: "Komponent-demo",
        subtitle: `${variant} | ${dir}`,
        media: ComponentIcon,
      };
    },
  },
});
