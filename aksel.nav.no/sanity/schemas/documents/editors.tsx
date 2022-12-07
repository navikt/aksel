// MIGRERT

import { People } from "@navikt/ds-icons";
import React from "react";
import profilePage from "../../components/profile/profile-page";
import { isEditorUnique } from "@/lib";
import userStore from "part:@sanity/base/user";
import sanityClient from "part:@sanity/base/client";

const navn = [
  "Alpesteinbukk",
  "Amurtiger",
  "Kamel",
  "Blissbukk",
  "Borneoorangutang",
  "Damfrosk",
  "Dvergsilkeape",
  "Dåhjort",
  "Edderkoppape",
  "Elandantilope",
  "Elg",
  "Esel",
  "Oter",
  "Fjellrev",
  "Flodsvin",
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
  "Sjimpanse",
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
  "Fjordfe",
  "Ekorn",
  "Bever",
  "Lemen",
  "Klatremus",
  "Fjellmarkmus",
  "Dvergmus",
  "Småskogmus",
  "Steinkobbe",
  "Røyskatt",
  "Moskusfe",
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

const client = sanityClient.withConfig({ apiVersion: "2020-06-19" });

const generateName = async () => {
  console.log("ran");
  const names = await client.fetch(`*[_type == "editor"].anon_navn.current`);

  let c = 0;
  let res = "";
  while ((res === "" || names.includes(res)) && c < 1000) {
    const adj = adjektiv[Math.floor(Math.random() * adjektiv.length)];
    const animal = navn[Math.floor(Math.random() * navn.length)];
    res = `${adj.charAt(0).toUpperCase() + adj.slice(1)} ${animal}`;
    c += 1;
  }

  console.log(res);
  return res;
};

const generateInitialName = async () => ({
  current: await generateName(),
});

export default {
  title: "Redaktører",
  name: "editor",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    },
    {
      title: "Sanity bruker-id",
      name: "user_id",
      type: "slug",
      validation: (Rule) => Rule.required().error("Må ha Id"),
      options: {
        isUnique: isEditorUnique,
        source: async () => {
          const { id } = await userStore.getUser("me");
          return id;
        },
        slugify: (input) => input,
      },
    },
    {
      title: "Gjør meg anonym",
      description:
        "På artikler bytter vi ut navnet ditt med et tullenavn. Eks. Sprudlende Tiger",
      name: "anonym",
      type: "boolean",
      initialValue: true,
      hidden: true,
    },
    {
      hidden: true,
      title: "Anonymt navn",
      name: "anon_navn",
      type: "slug",
      initialValue: () => generateInitialName(),
      readOnly: true,
    },
    {
      title: "Roller",
      description: "eks: Utvikler, Webanalytiker, uu-spesialist",
      name: "roller",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "profile_page",
      type: "string",
      title: "Profil",
      inputComponent: profilePage,
      hidden: ({ currentUser, parent }) => {
        const { id, roles } = currentUser;
        return (
          !roles.find(({ name }) => name === "administrator") &&
          parent?.user_id?.current !== id
        );
      },
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        media: () => <People />,
      };
    },
  },
};
