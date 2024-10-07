import { defineField, defineType } from "sanity";
import { TerminalIcon } from "@navikt/aksel-icons";
import SnippetLazy from "@/cms/code-snippet/SnippetLazy";

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
  components: {
    preview: (values) => (<SnippetLazy node={values as any} />) as any,
  },
  preview: {
    select: {
      title: "title",
      code: "code",
    },
  },
});
