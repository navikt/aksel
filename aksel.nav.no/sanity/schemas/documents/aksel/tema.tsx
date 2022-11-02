import { groups } from "@/lib";

export default {
  title: "Aksel Tema",
  name: "aksel_tema",
  type: "document",
  groups,
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      group: "innhold",
      validation: (Rule) => Rule.required().error("Temaet må ha et navn"),
    },
    {
      title: "Kort Intro/Oppsummering",
      description: "Brukes i kort og innganger",
      name: "oppsummering",
      type: "string",
      group: "innhold",
      validation: (Rule) =>
        Rule.required()
          .max(65)
          .error("Temaet burde ha en kort oppsummering/intro på max 65tegn"),
    },
    {
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst_enkel",
      group: "innhold",
    },
    {
      title: "Ansvarlig for tema",
      description: "Legg til redaktør som har forvaltningsansvaret for temaet",
      name: "ansvarlig",
      type: "reference",
      to: [{ type: "editor" }],
      validation: (Rule) => Rule.required(),
      group: "innhold",
    },
    {
      title: "Bruk seksjonsinndeling",
      description:
        "Vil ikke vise artikler som ikke er lagt til i seksjoner hvis valgt!",
      name: "bruk_seksjoner",
      type: "boolean",
      group: "innhold",
      initialValue: false,
    },
    {
      title: "Seksjonering",
      description:
        "Del inn artiklene i flere seksjoner (vises ikke i preview før publisering desverre)",
      name: "seksjoner",
      type: "array",
      group: "innhold",
      hidden: ({ parent }) => !parent?.bruk_seksjoner,
      of: [
        {
          type: "object",
          title: "Seksjon",
          name: "seksjon",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Tittel",
              validation: (Rule) =>
                Rule.required().error("Seksjonen må ha et navn"),
            },
            {
              title: "Beskrivelse",
              name: "beskrivelse",
              type: "riktekst_enkel",
            },
            {
              name: "sider",
              type: "array",
              title: "Sider",
              of: [
                {
                  type: "reference",
                  name: "ref",
                  title: "Side",
                  validation: (Rule) =>
                    Rule.required().error("Seksjonen må ha minst en referanse"),
                  to: [{ type: "aksel_artikkel" }],
                  options: {
                    filter: ({ document, parent }) => {
                      const selected = parent
                        .filter((x) => !!x._ref)
                        .map((x) => x._ref);
                      return {
                        filter: "references($refId) && !(_id in $docIds)",
                        params: {
                          refId: document._id.replace("drafts.", ""),
                          docIds: selected,
                        },
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
