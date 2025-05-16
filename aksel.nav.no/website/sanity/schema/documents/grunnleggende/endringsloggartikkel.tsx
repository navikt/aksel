import { defineField, defineType } from "sanity";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { endringsloggSlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

const prefix = "grunnleggende/";

export const EndringsloggArtikkel = defineType({
  title: "Endringslogg artikkel",
  name: "ds_endringsloggartikkel",
  type: "document",
  groups: SanityTabGroups,
  fields: [
    ...hiddenFields,
    titleField,

    endringsloggSlug(prefix),
    defineField({
      title: "Endringsdato",
      name: "endringsdato",
      description: "Datoen styrer hvor kortet vises i endringsloggen.",
      validation: (Rule) => Rule.required(),
      type: "datetime",
    }),
    defineField({
      title: "Type endring",
      name: "endringstype",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Dokumentasjon", value: "dokumentasjon" },
          { title: "Kode", value: "kode" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Fremhevet",
      name: "fremhevet",
      description:
        "Dette valget legger på styling på oppdateringen som gjør at den tiltrekker seg mer oppmerksomhet.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      hidden: ({ document }) => !document?.fremhevet,
      title: "Fremhevet herobilde",
      name: "herobilde",
      description:
        "Bildet vises øverst på kortet/siden og blir bruks som OG-bilde. Anbefalt størrelse er 1200x630px.",
      type: "image",
    }),
    defineField({
      title: "Innhold",
      name: "innhold",
      description:
        'Dette innholdet vises på innlegget i endringsloggen. Er det "mye" innhold vil en "Vis mer"-knapp dukke opp.',
      type: "riktekst_grunnleggende",
    }),
  ],
});
