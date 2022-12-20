import { DocumentVideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const Video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: "bruk_embed",
      title: "Bruk Microsoft-streams embed",
      type: "boolean",
    }),
    defineField({
      name: "embed",
      title: "Iframe",
      description:
        "Trykk share og legg inn iframe her fra Microsoft-streams. Husk å velge størrelse og slå av autplay og show info!",
      type: "text",
      rows: 3,
      hidden: ({ parent }) => !parent?.bruk_embed,
    }),
    defineField({
      name: "webm",
      title: "Video i WebM format",
      description: "Vi anbefaler å bruke Webm formatet om mulig!",
      type: "file",
      options: {
        accept: "video/webm",
      },
      hidden: ({ parent }) => parent?.bruk_embed,
    }),
    defineField({
      name: "fallback",
      title: "Video i Mp4 format (fallback)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      hidden: ({ parent }) => parent?.bruk_embed,
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
