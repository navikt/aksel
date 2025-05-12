import { defineField, defineType } from "sanity";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { kategoriSlug } from "../presets/slug";
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
    kategoriSlug(prefix),
    defineField({
      name: "fremhevet",
      title: "Fremhevet",
      description: "...",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "endringsdato",
      title: "Endringsdato",
      description: "Datoen styrer hvor kortet vises i endringsloggen.",
      validation: (Rule) => Rule.required(),
      type: "date",
    }),
    defineField({
      title: "Innhold",
      name: "innhold",
      description: "Dette innholdet vises på innlegget i endringsloggen",
      type: "riktekst_grunnleggende",
    }),
    defineField({
      name: "vismer",
      title: "Vis mer",
      description: "Mer innhold i innlegget som vises/åpnes med en knapp",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      hidden: ({ document }) => !document?.vismer,
      title: 'Innhold i "vis mer"',
      name: "merinnhold",
      description: 'Dette innholdet vises når noen klikker på "Vis mer"',
      type: "riktekst_grunnleggende",
    }),
  ],
});
