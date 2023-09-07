import { CodeBlockIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const Kode = defineType({
  title: "Kode",
  name: "kode",
  type: "object",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "code",
      title: "Kode",
      type: "code",
      hidden: ({ parent }) => parent?.variant,
      validation: (Rule) => Rule.required(),
      options: {
        languageAlternatives: [
          { value: "tsx", title: "TSX" },
          { value: "javascript", title: "Javascript" },
          { value: "html", title: "HTML" },
          { value: "css", title: "CSS" },
          { value: "scss", title: "SCSS" },
          { value: "less", title: "LESS" },
          { value: "bash", title: "Terminal" },
          { value: "markdown", title: "Markdown" },
        ],
      },
    }),
    defineField({
      title: "Title",
      name: "title",
      description: "Erstatter kodespråk som tittel",
      type: "string",
    }),
  ],
  preview: {
    select: {
      code: "code",
      title: "title",
    },
    prepare: ({ code, title }) => ({
      title: code ? `${code?.code?.slice(0, 50)}...` : "Kode",
      subtitle: title ?? "kode",
      media: CodeBlockIcon,
    }),
  },
});
