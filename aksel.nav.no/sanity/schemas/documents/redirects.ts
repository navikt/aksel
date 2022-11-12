export default {
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    {
      name: "source",
      title: "Fra",
      type: "string",
    },
    {
      name: "destination",
      title: "Til",
      type: "string",
    },
    {
      name: "permanent",
      title: "Permanent",
      type: "boolean",
      initialValue: () => true,
    },
  ],
};
