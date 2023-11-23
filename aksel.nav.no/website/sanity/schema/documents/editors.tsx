import { SANITY_API_VERSION } from "@/sanity/config";
import Avatar from "boring-avatars";
import React from "react";
import {
  InitialValueResolverContext,
  SlugSourceContext,
  defineField,
  defineType,
} from "sanity";
import { EditorPage } from "../custom-components/EditorPage";
import { EditorPreview } from "../custom-components/EditorPreview";

const navn = [
  "Alpesteinbukk",
  "Amurtiger",
  "Kamel",
  "Blissbukk",
  "Borneoorangutang",
  "Damfrosk",
  "Dåhjort",
  "Elandantilope",
  "Elg",
  "Esel",
  "Oter",
  "Fjellrev",
  "Fugler",
  "Gaupe",
  "Gepard",
  "Gulkinngibbon",
  "Javalangur",
  "Jerv",
  "Krokodille",
  "Labrador",
  "Puddel",
  "Skogskatt",
  "Maine Coon",
  "Lavlandstapir",
  "Beagle",
  "Hysky",
  "Løve",
  "Løvetamarin",
  "Nubisk geit",
  "Papegøye",
  "Ringhalelemur",
  "Rødpanda",
  "Sau",
  "Sjiraff",
  "Stråleskilpadde",
  "Slanger",
  "Steppesebra",
  "Flamingo",
  "Struts",
  "Shetlandsponni",
  "Surikat",
  "Tiger",
  "Ulv",
  "Ekorn",
  "Bever",
  "Lemen",
  "Klatremus",
  "Fjellmarkmus",
  "Dvergmus",
  "Småskogmus",
  "Steinkobbe",
  "Røyskatt",
];

const adjektiv = [
  "aktuell",
  "alvorlig",
  "ansvarlig",
  "berømt",
  "bevisst",
  "klein",
  "eksisterende",
  "fjern",
  "forsiktig",
  "heldig",
  "hjelpsom",
  "hyppig",
  "imponerende",
  "kul",
  "sjarmerende",
  "lykkelig",
  "lys",
  "merkelig",
  "mistenkelig",
  "modig",
  "morsom",
  "nysgjerrig",
  "rå",
  "rask",
  "blå",
  "fersk",
  "grønn",
  "rettferdig",
  "rimelig",
  "ryddig",
  "selvsikker",
  "skarp",
  "skikkelig",
  "skyldig",
  "smal",
  "sprudlende",
  "søt",
  "stolt",
  "streng",
  "sulten",
  "tilgjengelig",
  "vennlig",
  "voksen",
  "ærlig",
  "flittig",
];

const generateName = async (
  ctx: SlugSourceContext | InitialValueResolverContext
) => {
  const names = await ctx
    .getClient({ apiVersion: SANITY_API_VERSION })
    .fetch(`*[_type == "editor"].anon_navn.current`);

  let c = 0;
  let res = "";
  while ((res === "" || names.includes(res)) && c < 1000) {
    const adj = adjektiv[Math.floor(Math.random() * adjektiv.length)];
    const animal = navn[Math.floor(Math.random() * navn.length)];
    res = `${adj.charAt(0).toUpperCase() + adj.slice(1)} ${animal}`;
    c += 1;
  }

  return res;
};

export const Editors = defineType({
  title: "Forfattere",
  name: "editor",
  type: "document",
  components: {
    preview: EditorPreview,
  },
  fields: [
    defineField({
      title: "Navn",
      name: "title",
      description:
        "Det er frivillig å vise navnet ditt på Aksel. Hvis du ikke ønsker at navnet ditt skal være tilgjengelig kan man velge å bare bruke fornavn eller sette seg som 'anonym'",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    }),
    defineField({
      title: "Gjør meg anonym",
      description:
        "På artikler bytter vi ut navnet ditt med et tullenavn. Eks. Sprudlende Tiger hvis valgt",
      name: "anonym",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Anonymt navn",
      name: "anon_navn",
      type: "slug",
      validation: (Rule) =>
        Rule.custom((v, ctx) => {
          return !ctx.document?.anonym ? true : "Må generere et anonymt navn";
        }).error(),

      hidden: ({ parent }) => !parent?.anonym,
      options: {
        source: "anonym",
        slugify: (_, __, ctx) => generateName(ctx),
      },
    }),
    defineField({
      title: "Sanity user-id",
      name: "user_id",
      type: "slug",
      validation: (Rule) =>
        Rule.required().error(
          "Fant allerede en bruker med denne ID-en. Slett dokumentet/brukeren nede i høyre, og last siden på nytt."
        ),
      options: {
        source: (_, { currentUser }) => {
          return currentUser.id;
        },
        slugify: (input) => input,
      },
      initialValue: (_, { currentUser }) => {
        return { current: currentUser.id };
      },
      readOnly: ({ currentUser }) =>
        !currentUser.roles.find((x) => x.name === "developer"),
      hidden: ({ currentUser }) =>
        !currentUser.roles.find((x) => x.name === "developer"),
    }),
    defineField({
      title: "Roller",
      description: "eks: Utvikler, Webanalytiker, uu-spesialist",
      name: "roller",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "profilside",
      type: "string",
      title: "",
      components: {
        field: EditorPage,
      },
      readOnly: true,
      hidden: ({ currentUser, parent }) => {
        const { id, roles } = currentUser;
        return (
          !roles.find(({ name }) =>
            ["developer", "administrator"].includes(name)
          ) && parent?.user_id?.current !== id
        );
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      anonym: "anonym",
    },
    prepare(selection) {
      const { title, anonym } = selection;

      return {
        title,
        subtitle: anonym ? "Profilside | Anonym" : "Profilside",
        media: () => (
          <Avatar
            size={100}
            name={title}
            square
            variant="beam"
            colors={["#D1DAB9", "#92BEA5", "#6F646C", "#671045", "#31233E"]}
          />
        ),
      };
    },
  },
});
