import { createClient, groq } from "next-sanity";
import { FileValue, defineField, defineType } from "sanity";
import { VideoplayerIcon } from "@navikt/aksel-icons";
import { clientConfig } from "@/sanity/config";

const sanityClient = createClient({
  ...clientConfig,
  withCredentials: true,
});

const query = groq`*[_id == $id][0]{size}`;

const validateFileSize = (maxSizeInMb: number, file?: FileValue) => {
  if (!file || !file.asset?._ref) {
    return true;
  }

  return sanityClient
    .fetch(query, { id: file.asset._ref })
    .then((res) =>
      res.size > 1024 * 1024 * maxSizeInMb
        ? `Maks filstørrelse er ${maxSizeInMb} MB`
        : true,
    );
};

export const Video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: () => <VideoplayerIcon aria-hidden />,
  fields: [
    defineField({
      name: "webm",
      title: "Video i WebM-format",
      description: `Vi bruker WebM fordi det har bedre komprimering enn f.eks. MP4.
        For å konvertere kan du f.eks. bruke Handbrake (https://handbrake.fr/).
        OBS: Ikke legg inn store/lange videoer! Da er det bedre å lenke til en ekstern kilde.`,
      type: "file",
      options: {
        accept: "video/webm",
      },
      validation: (Rule) =>
        Rule.required().custom((file) => validateFileSize(30, file)),
    }),
    defineField({
      name: "fallback",
      title: "Video i MP4-format (fallback)",
      description: "For eldre nettlesere som ikke støtter WebM",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      validation: (Rule) => Rule.custom((file) => validateFileSize(60, file)),
    }),
    defineField({
      name: "track",
      title: "Undertekster (VTT)",
      type: "file",
      options: {
        accept: ".vtt",
      },
    }),
    defineField({
      name: "alt",
      title: "Alt-tekst for skjermlesere",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Videotekst",
      description: "Kort beskrivelse som vises rett under videoen",
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
