import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { artikkelPreview } from "../presets/artikkel-preview";
import { hiddenFields } from "../presets/hidden-fields";
import { editorField } from "../presets/editors";
import { titleField } from "../presets/title-field";
import { ingressField } from "../presets/ingress";
import { SEOFields } from "../presets/seo";
import { sanitySlug } from "../presets/slug";
import { bloggKategorier } from "../../../config";

const prefix = "produktbloggen/";

export const Blogg = defineType({
  title: "Bloggpost",
  name: "aksel_blogg",
  type: "document",
  groups,
  ...artikkelPreview("Produktbloggen"),
  fields: [
    ...hiddenFields,
    titleField,
    editorField,
    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      type: "riktekst_standard",
      group: "innhold",
    }),
    SEOFields,
  ],
});
