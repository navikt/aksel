export default {
  title: "Tokens",
  name: "token_kateogri",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
  ],
  __experimental_omnisearch_visibility: false,
};
