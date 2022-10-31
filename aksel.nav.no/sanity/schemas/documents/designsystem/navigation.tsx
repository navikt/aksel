export default {
  name: "ds_navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      title: "Designsystem navigajsons-struktur",
      name: "title",
      type: "string",
      readOnly: true,
      hidden: true,
      initialValue: "Designsystem navigajsons-struktur",
    },
    {
      name: "headings",
      title: "Header linker",
      type: "array",
      of: [
        {
          type: "ds_navigation_heading",
          name: "heading",
          title: "Header link",
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Headingmenyen må ha minst en koblet lenke i sidemenyen"),
    },
  ],
};

export const ds_header_heading = {
  name: "ds_navigation_heading",
  title: "Header link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Heading tittel",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Header lenken må ha en tittel"),
    },
    {
      title: "Side selve headingen linker til",
      description:
        "Husk å legge denne til i menyen også, hvis ikke blir den bare tilgjengelig via headern",
      name: "link_ref",
      type: "reference",
      to: [{ type: "komponent_artikkel" }, { type: "ds_artikkel" }],
      validation: (Rule) =>
        Rule.required().error("Header lenken må linke til en startside"),
    },
    {
      title: "Meny for denne headingen",
      name: "menu",
      type: "array",
      validation: (Rule) =>
        Rule.required().error("Sidemeny må ha misnt en lenke"),
      of: [
        {
          title: "Menypunkt",
          name: "item",
          type: "object",
          fields: [
            {
              title: "Menypunkt tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Sidemeny-lenken må ha en tittel"),
            },
            {
              title: "Link til side",
              name: "link",
              type: "reference",
              to: [{ type: "komponent_artikkel" }, { type: "ds_artikkel" }],
              options: {
                modal: {
                  type: "dialog",
                  width: "medium", // 'small' | 'medium' | 'large' | 'full'
                },
              },
              validation: (Rule) =>
                Rule.required().error("Sidemeny-lenken må lenke til en side"),
            },
          ],
        },
        {
          title: "Subheading",
          name: "subheading",
          type: "object",
          fields: [
            {
              title: "Subheading",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Subheading må være fylt ut"),
            },
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: title,
                subtitle: "Subheading",
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
      };
    },
  },
};
