import { defineField, defineType } from "sanity";
import { TerminalIcon } from "@navikt/aksel-icons";

export const Kode = defineType({
  title: "Kode",
  name: "kode",
  type: "object",
  icon: () => <TerminalIcon aria-hidden />,
  fields: [
    defineField({
      name: "code",
      title: "Kode",
      type: "code",
      hidden: ({ parent }) => parent?.variant,
      validation: (Rule) => Rule.required(),
      initialValue: {
        language: "tsx",
      },
      options: {
        language: "tsx",
        languageAlternatives: [
          { value: "tsx", title: "TSX" },
          { value: "javascript", title: "Javascript" },
          { value: "html", title: "HTML" },
          { value: "css", title: "CSS" },
          { value: "scss", title: "SCSS" },
          { value: "less", title: "LESS" },
          { value: "bash", title: "Terminal" },
          { value: "markdown", title: "Markdown" },
          { value: "yaml", title: "YAML" },
          { value: "diff", title: "Diff" },
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
      title: "title",
      code: "code",
    },
    prepare: ({ title, code }) => {
      return {
        title: title || code.language,
        subtitle: "Kode modul",
        description: code.code,
      };
    },
  },
});
