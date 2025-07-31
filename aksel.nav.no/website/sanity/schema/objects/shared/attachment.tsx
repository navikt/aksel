import { defineField, defineType } from "sanity";
import { DownloadIcon } from "@navikt/aksel-icons";

export const Attachment = defineType({
  title: "Vedlegg med nedlastning",
  name: "attachment",
  type: "file",
  icon: () => <DownloadIcon aria-hidden />,
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
      validation: (Rule) =>
        Rule.required().error("Vedlegg trenger beskrivelse."),
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
        media: () => <DownloadIcon aria-hidden />,
      };
    },
  },
});
