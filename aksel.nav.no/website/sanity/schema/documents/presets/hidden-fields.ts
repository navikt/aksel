import { defineField } from "sanity";

const publishedAt = defineField({
  title: "Publiseringsdato",
  name: "publishedAt",
  type: "datetime",
  group: "settings",
  hidden: true,
  /* hidden: ({ currentUser }) =>
    !currentUser.roles.find((x) => x.name === "administrator"), */
});

const lastUpdatedAt = defineField({
  title: "Sist oppdatert",
  name: "lastUpdatedAt",
  type: "datetime",
  group: "settings",
  hidden: true,
});

export const hiddenFields = [publishedAt, lastUpdatedAt];
