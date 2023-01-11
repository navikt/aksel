export default {
  title: "Forside",
  name: "ds_frontpage",
  type: "document",
  fields: [
    {
      name: "body",
      type: "riktekst_enkel",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cards",
      type: "array",
      title: "Cards",
      of: [
        {
          title: "Card",
          name: "card",
          type: "object",
          fields: [
            {
              title: "Lenke",
              name: "link_ref",
              type: "reference",
              to: [{ type: "komponent_artikkel" }, { type: "ds_artikkel" }],
              validation: (Rule) => Rule.required(),
            },
            {
              title: "Tittel",
              name: "title",
              type: "string",
            },
            {
              title: "Innhold",
              name: "content",
              type: "string",
            },
            {
              title: "Pictogram",
              name: "picture",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "title",
                  title: "Alt-tekst",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error("Bilde må ha en alt-tekst"),
                  description: "Beskriv bildet for skjermlesere",
                  options: {
                    isHighlighted: true,
                  },
                },
              ],
              validation: (Rule) =>
                Rule.required().error("Må legge til et pictogram"),
            },
          ],
          options: {
            modal: {
              type: "dialog",
              width: "medium", // 'small' | 'medium' | 'large' | 'full'
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({ title: "Forside designsystemet" }),
  },
};
