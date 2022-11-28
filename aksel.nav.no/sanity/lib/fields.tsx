import { allDocumentTypes } from "../config";

export const editorField = {
  title: "Redaktører",
  description: "Legg til alle som har bidratt med denne siden!",
  name: "contributors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editor" }] }],
  group: "settings",
  validation: (Rule) => Rule.required(),
};

export const privateField = {
  title: "Sidetilganger",
  name: "tilgang",
  type: "object",
  description: "Styrer tilgang for side-innhold",
  hidden: true,
  fields: [
    {
      title: "Privat",
      name: "privat",
      type: "boolean",
    },
  ],
  initialValue: {
    privat: true,
  },
};

export const publishedAtField = {
  title: "Publiseringsdato",
  name: "publishedAt",
  type: "datetime",
  group: "settings",
  description: "Synlig bare for admins. Setter publiseringsdato for dokument",
  hidden: ({ currentUser }) =>
    !currentUser.roles.find((x) => x.name === "administrator"),
};

export const migratedField = {
  title: "Migrert riktekst",
  name: "isMigrated",
  type: "boolean",
  hidden: true,
  initialValue: true,
};

export const titleField = {
  title: "Sidetittel",
  name: "heading",
  type: "string",
  group: "innhold",
  description:
    "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
  validation: (Rule) =>
    Rule.required()
      .max(60)
      .error("Siden bør ha en kort og konsis heading (<h1>)"),
};

export const ingressField = {
  title: "Ingress",
  name: "ingress",
  description: "Side, innganger og seo description-tag",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) =>
    Rule.required().max(210).error("Ingress kan ikke være på over 210 tegn"),
};

export const innholdFieldNew = {
  title: "Innhold",
  name: "content",
  type: "riktekst_aksel",
  group: "innhold",
};

export const innholdFieldPrinsipp = {
  title: "Innhold",
  name: "content",
  type: "riktekst_prinsipp",
  group: "innhold",
};

export const relevanteArtiklerField = {
  title: "Relevante artikler",
  description:
    "Legg til relaterte artikler som du tenker er relevant å lese (maks 3)",
  name: "relevante_artikler",
  type: "array",
  group: "innhold",
  validation: (Rule) =>
    Rule.max(3).error("Kan ikke ha mer enn 3 relevante artikler lagt til"),
  of: [
    {
      type: "reference",
      weak: true,
      to: [...allDocumentTypes.map((x) => ({ type: x }))],
    },
  ],
};

export const innholdFieldNewNested = (name?: string, type?: string) => {
  const fields = {
    ...innholdFieldNew,
    type: type ?? "riktekst_ds_artikkel",
    name: name ?? "content",
  };
  delete fields.group;
  return fields;
};
