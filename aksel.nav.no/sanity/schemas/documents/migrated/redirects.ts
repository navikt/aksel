const limits = [
  "/blogg/",
  "/artikkel/",
  "/prinsipper/",
  "/designsystem/side/",
  "/designsystem/komponenter/",
];

export default {
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    {
      name: "source",
      title: "Fra",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((_, { parent }) => {
          if (!parent?.source?.startsWith?.("/")) {
            return "Kan bare redirecte fra relativ-url, eks /min/gamle/sideurl";
          }
          const valid = limits.find(
            (x) => parent?.source?.startsWith?.(x) && parent.source > x
          );

          if (!valid) {
            return `Kan bare redirecte fra sider som starter med en av disse url-ene ${limits.join(
              ", "
            )}`;
          }
          return true;
        }),
    },
    {
      name: "destination",
      title: "Til",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "permanent",
      title: "Permanent",
      type: "boolean",
      initialValue: () => true,
    },
  ],
  __experimental_omnisearch_visibility: false,
};
