import { defineField, defineType } from "sanity";

export const CookieTracker = defineType({
  title: "Cookie Tracker",
  name: "cookie_tracker",
  type: "document",
  fields: [
    defineField({
      title: "Totalt antall cookie-banner klikk",
      type: "number",
      name: "total",
    }),
    defineField({
      title: "Godkjent alle cookies",
      type: "number",
      name: "accept",
    }),
    defineField({
      title: "Bare nødvendige cookies",
      type: "number",
      name: "decline",
    }),
  ],
  preview: {
    select: {
      total: "total",
      accept: "accept",
    },
    prepare: ({ total, accept }) => {
      return {
        title: "Cookie Tracker",
        subtitle: `Akseptert: ${accept}/${total}`,
      };
    },
  },
});
