import { defineField, defineType } from "sanity";
import { DownloadIcon } from "@navikt/aksel-icons";

export const DownloadBlock = defineType({
  title: "Vedlegg med nedlastning",
  name: "download_block",
  type: "file",
  icon: DownloadIcon,
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Vedlegg trenger tittel."),
    }),
    defineField({
      title: "Filnavn",
      description: "Filtype blir automatisk lagt til.",
      name: "fileName",
      type: "string",
      validation: (Rule) => Rule.required().error("Vedlegg trenger filnavn."),
    }),
    defineField({
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required().error("Vedlegg trenger innhold."),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: "Vedlegg med nedlastning",
        media: DownloadIcon,
      };
    },
  },
});
