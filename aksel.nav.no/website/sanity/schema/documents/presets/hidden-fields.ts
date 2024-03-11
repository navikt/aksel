import { defineField } from "sanity";

const publishedAt = defineField({
  title: "Publiseringsdato (dev only)",
  name: "publishedAt",
  type: "datetime",
  group: "settings",
  readOnly: ({ currentUser }) =>
    !currentUser?.roles.find((x) => x.name === "developer"),
  hidden: ({ currentUser }) =>
    !currentUser?.roles.find((x) => x.name === "developer"),
});

export const hiddenFields = [publishedAt];
