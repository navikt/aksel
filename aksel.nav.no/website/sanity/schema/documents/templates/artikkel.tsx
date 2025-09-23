import { defineField, defineType } from "sanity";
import { templatesKategorier } from "../../../config";
import { artikkelPreview } from "../presets/artikkel-preview";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { oppdateringsvarsel } from "../presets/oppdateringsvarsel";
import BaseSEOPreset from "../presets/seo";
import { kategoriSlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

const prefix = "monster-maler/";

export const TemplatesArtikkel = defineType({
  title: "Mønster/Maler artikkel",
  name: "templates_artikkel",
  type: "document",
  groups: SanityTabGroups,
  ...artikkelPreview("Mønster/Maler", 6),
  fields: [
    oppdateringsvarsel,
    ...hiddenFields,
    titleField,

    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          ...templatesKategorier.map((x) => ({
            title: x.title,
            value: x.value,
          })),
          { title: "Frittstående", value: "standalone" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Sidebar index",
      description:
        "Overstyrer sortering av artikler i sidebar. Hvis feltet er tomt, sorteres den alfabetisk.",
      name: "sidebarindex",
      type: "number",
      group: "settings",
    }),
    kategoriSlug(prefix),
    defineField({
      title: "Metadata",
      name: "status",
      group: "innhold",
      type: "object",
      fields: [
        {
          title: "Status",
          name: "tag",
          type: "string",
          initialValue: "new",
          options: {
            list: [
              { title: "Beta", value: "beta" },
              { title: "New", value: "new" },
              { title: "Stable", value: "ready" },
              { title: "Legacy", value: "deprecated" },
            ],
            layout: "radio",
          },
        },
        {
          name: "bilde",
          title: "Thumbnail",
          type: "image",
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      title: "Github discussions link",
      name: "gh_discussions",
      type: "url",
      group: "settings",
    }),

    defineField({
      title: "Innhold",
      description:
        "Innholdet i artikkelen er riktekst. Tips: klikk på ikon i høyre hjørne for å skrive i fullskjerm.",
      name: "content",
      type: "riktekst_templates",
      group: "innhold",
    }),
    BaseSEOPreset,
  ],
});
