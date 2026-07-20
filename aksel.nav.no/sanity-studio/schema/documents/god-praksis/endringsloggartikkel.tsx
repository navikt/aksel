import { defineField, defineType } from "sanity";
import { sanitizeSlug } from "../../schema.utils";
import SanityTabGroups from "../presets/groups";
import { titleField } from "../presets/title-field";

export const EndringsloggArtikkelGodPraksis = defineType({
  title: "Endringsloggartikkel God praksis",
  name: "gp_endringslogg_artikkel",
  type: "document",
  groups: SanityTabGroups,
  fields: [
    titleField,

    defineField({
      title: "URL",
      name: "slug",
      type: "slug",
      description: "Inkluder gjerne dato eller versjon",
      validation: (Rule) =>
        Rule.custom((slug) => {
          if (!slug?.current) {
            return "URL er påkrevd";
          }
          if (sanitizeSlug(slug.current) !== slug.current) {
            return `URL kan kun bestå av bokstaver (a-z), tall, understrek og bindestrek. Trykk 'generer' for å fikse dette automatisk.`;
          }
          return true;
        }),
      options: {
        slugify: sanitizeSlug,
        source: "heading",
      },
      group: "innhold",
    }),
    defineField({
      title: "Endringsdato",
      name: "endringsdato",
      description:
        "Datoen styrer rekkefølgen på oppdateringene i endringsloggen.",
      validation: (Rule) => Rule.required(),
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      title: "Innhold",
      name: "content",
      group: "innhold",
      type: "riktekst_standard",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Artikler",
      name: "artikler",
      group: "innhold",
      description: "Artikler denne oppdateringen gjelder.",
      type: "array",
      options: {
        sortable: false,
      },
      of: [
        {
          type: "reference",
          to: [{ type: "aksel_artikkel" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      heading: "heading",
      endringsdato: "endringsdato",
    },
    prepare(selection) {
      const { heading, endringsdato } = selection;
      if (!endringsdato) {
        return {
          title: heading,
        };
      }
      return {
        title: heading,
        subtitle: `${endringsdato.split("T")[0]}`,
      };
    },
  },
});
