export default {
  title: "Fargekategori",
  name: "ds_color_categories",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Beskrivelse",
      name: "description",
      type: "riktekst_enkel",
    },
    {
      type: "array",
      name: "colors",
      title: "Farger",
      of: [{ type: "ds_color" }],
      options: {
        sortable: false,
      },
    },
  ],
};

export const Color = {
  name: "ds_color",
  title: "Farge",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Navn",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      name: "full_title",
      title: "CSS variabelnavn",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      title: "Fargetype/nivå",
      name: "color_type",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "global",
      readOnly: true,
      options: {
        layout: "radio",
        list: [
          { value: "global", title: "Global" },
          { value: "semantic", title: "Semantic" },
        ],
      },
    },
    {
      name: "color_name",
      title: "Brukt fargenavn",
      type: "string",
      readOnly: true,
      hidden: ({ parent }) => parent?.color_type === "global",
    },
    {
      name: "color_roles",
      title: "Fargeroller",
      type: "array",
      hidden: ({ parent }) => parent?.color_type === "global",
      of: [{ type: "string", name: "role" }],
    },
    {
      name: "color_value",
      title: "Brukt farge",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "color_index",
      title: "Fargeindeks",
      type: "number",
      description:
        "Brukes for å endre rekkefølgen på listen. Farger med indeks 0 vil være først, større tall sorteres under der igjen",
    },
  ],
  __experimental_omnisearch_visibility: false,
};
