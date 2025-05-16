import { defineField, defineType } from "sanity";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { sanitySlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

export const EndringsloggArtikkel = defineType({
  title: "Endringsloggartikkel",
  name: "ds_endringsloggartikkel",
  type: "document",
  groups: SanityTabGroups,
  fields: [
    ...hiddenFields,
    titleField,

    sanitySlug("grunnleggende/endringslogg/", 3),
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
        "Bildet vises øverst på kortet/siden og blir brukt som OG-bilde. Anbefalt størrelse er 1200x630px.",
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
