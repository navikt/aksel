import { defineField, defineType } from "sanity";
import { FileCodeIcon, FileImageIcon, FileTextIcon } from "@navikt/aksel-icons";
import { capitalizeText } from "@/ui-utils/format-text";
import SanityTabGroups from "../presets/groups";
import BaseSEOPreset from "../presets/seo";
import { titleField } from "../presets/title-field";

export const EndringsloggArtikkel = defineType({
  title: "Endringsloggartikkel",
  name: "ds_endringslogg_artikkel",
  type: "document",
  groups: SanityTabGroups,
  fields: [
    titleField,

    defineField({
      title: "URL",
      name: "slug",
      type: "slug",
      description: "Inkluder gjerne dato eller versjon",
      validation: (Rule) => Rule.required(),
      group: "settings",
      options: {
        source: "heading",
      },
    }),
    defineField({
      title: "Endringsdato",
      name: "endringsdato",
      description: "Datoen styrer hvor kortet vises i endringsloggen",
      validation: (Rule) => Rule.required(),
      type: "datetime",
    }),
    defineField({
      title: "Type endring",
      name: "endringstype",
      description: "Dette bestemmer hva slags kort som vises",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Dokumentasjon", value: "dokumentasjon" },
          { title: "Kode (hentes automagisk fra GitHub)", value: "kode" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Innhold",
      name: "content",
      group: "innhold",
      description:
        'Dette innholdet vises på innlegget i endringsloggen. Er det "mye" innhold vil en "Vis mer"-knapp dukke opp.',
      type: "riktekst_grunnleggende",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: '"Vis mer"-knapp',
      name: "visMer",
      description:
        'Skjuler deler av innholdet bak en "Vis mer"-knapp. OBS: Dobbeltsjekk at det er nok innhold til at det gir mening å bruke denne.',
      type: "boolean",
      initialValue: false,
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
          to: [
            { type: "ds_artikkel" },
            { type: "komponent_artikkel" },
            { type: "templates_artikkel" },
          ],
          options: {
            disableNew: true,
          },
        },
      ],
    }),
    BaseSEOPreset,
  ],

  preview: {
    select: {
      heading: "heading",
      endringsdato: "endringsdato",
      endringstype: "endringstype",
    },
    prepare(selection) {
      const { heading, endringsdato, endringstype } = selection;
      if (!endringsdato || !endringstype) {
        return {
          title: heading,
        };
      }
      return {
        title: heading,
        subtitle: `${endringsdato.split("T")[0]} | ${capitalizeText(
          endringstype,
        )}`,
        media: typeToIcon[endringstype],
      };
    },
  },
});

const typeToIcon = {
  design: <FileImageIcon aria-hidden fontSize="1.6rem" />,
  dokumentasjon: <FileTextIcon aria-hidden fontSize="1.6rem" />,
  kode: <FileCodeIcon aria-hidden fontSize="1.6rem" />,
};
