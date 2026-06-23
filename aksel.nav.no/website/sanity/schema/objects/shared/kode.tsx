import { defineField, defineType } from "sanity";
import { TerminalIcon } from "@navikt/aksel-icons";

const codeField = defineField({
  name: "code",
  title: "Kode",
  type: "code",
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
});

const codeTitleField = defineField({
  title: "Title",
  name: "title",
  description: "Erstatter kodespråk som tittel",
  type: "string",
});

export const Kode = defineType({
  title: "Kode",
  name: "kode",
  type: "object",
  icon: () => <TerminalIcon aria-hidden />,
  fields: [
    codeField,
    codeTitleField,
    defineField({
      type: "array",
      name: "blokker",
      title: "Kodeblokker",
      of: [{ type: "code_block" }],
      validation: (Rule) => Rule.max(4),
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

export const CodeBlock = defineType({
  title: "Kodeblokk",
  name: "code_block",
  type: "object",
  fields: [codeField, codeTitleField],

  preview: {
    select: {
      title: "title",
      code: "code",
    },
    prepare: ({ title, code }) => {
      return {
        title: title ?? code?.language ?? "Kode",
        subtitle: code?.code ?? ":(",
      };
    },
  },
});
