import { DocumentVideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const Video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: "webm",
      title: "Video i WebM format",
      description:
        "Vi anbefaler å bruke Webm formatet. Formatet minsker fil-størrelse + perseverer kvalitet bedre",
      type: "file",
      options: {
        accept: "video/webm",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fallback",
      title: "Video i Mp4 format (fallback)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),
    defineField({
      name: "alt",
      title: "Alt tekst for skjermlesere",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Videotekst",
      description: "Kort beskrivelse som vises rett under videon",
      type: "string",
    }),
    defineField({
      name: "transkripsjon",
      title: "Transkripsjon",
      description:
        "Hvis videoen inneholder lyd, anbelfaler vi å skrive en transkripsjon som kan leses under videoen.",
      type: "text",
    }),
  ],
});
