import { defineField, defineType } from "sanity";
import { bloggKategorier } from "../../../config";
import { artikkelPreview } from "../presets/artikkel-preview";
import { writersField } from "../presets/editors";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { ingressField } from "../presets/ingress";
import BaseSEOPreset from "../presets/seo";
import { sanitySlug } from "../presets/slug";
import { titleField } from "../presets/title-field";
import { validateHeadingLevels } from "../presets/validate-heading-levels";

const prefix = "produktbloggen/";

export const Blogg = defineType({
  title: "Bloggpost",
  name: "aksel_blogg",
  type: "document",
  groups: SanityTabGroups,
  ...artikkelPreview("Produktbloggen"),
  fields: [
    ...hiddenFields,
    titleField,
    writersField,
    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "innhold",
      options: {
        list: bloggKategorier.map((x) => ({ title: x.title, value: x.value })),
        layout: "radio",
      },
    }),
    sanitySlug(prefix, 2),
    ingressField,
    defineField({
      title: "Innhold",
      description:
        "Innholdet i artikkelen er riktekst. Tips: klikk på ikon i høyre hjørne for å skrive i fullskjerm.",
      name: "content",
      type: "riktekst_blogg",
      group: "innhold",
      validation: (Rule) => {
        return Rule.custom(validateHeadingLevels);
      },
    }),
    BaseSEOPreset,
  ],
});
