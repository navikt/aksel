import { ChevronDownIcon } from "@navikt/aksel-icons";
import { defineField, defineType } from "sanity";

export const ExpansionCard = defineType({
  name: "expansioncard",
  title: "ExpansionCard",
  description:
    "ExpansionCard brukes hvis man har en seksjon man ønsker å skjule. Bruke Accordion om du trenger flere seksjoner etter hverandre",
  type: "object",
  icon: ChevronDownIcon,
  fields: [
    defineField({
      title: "Heading",
      name: "heading",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("ExpansionCard må ha en heading"),
    }),
    defineField({
      title: "Heading nivå",
      name: "heading_level",
      description: "ExpansionCard kan ikke brukes som h2",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "h3", title: "H3" },
          { value: "h4", title: "H4" },
        ],
        layout: "radio",
      },
      initialValue: "h3",
    }),
    defineField({
      title: "Description (valgfritt)",
      name: "description",
      type: "string",
    }),
    defineField({
      title: "Innhold",
      description:
        "Hvis du bruker Heading, husk å dobbelsjekke heading-nivået.",
      name: "body",
      type: "riktekst_accordion",
      validation: (Rule) =>
        Rule.required().error("ExpansionCard må ha innhold"),
    }),
  ],
  preview: {
    select: {
      body: "body",
      heading: "heading",
    },
    prepare(selection) {
      return {
        title: selection?.heading,
        subtitle: `ExpansionCard`,
        media: ChevronDownIcon,
      };
    },
  },
});
