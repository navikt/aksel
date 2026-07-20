import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@navikt/aksel-icons";

export const KodeEksempler = defineType({
  title: "Komponent-eksempel",
  name: "kode_eksempler",
  type: "object",
  icon: () => <ComponentIcon aria-hidden />,
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
    defineField({
      title: "Kompakt visning",
      description:
        "Mindre padding i forhåndsvisningen, og koden er skjult som standard.",
      name: "compact",
      type: "boolean",
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
        media: () => <ComponentIcon aria-hidden />,
      };
    },
  },
});
