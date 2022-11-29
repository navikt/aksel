import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { artikkelPreview } from "../presets/artikkel-preview";
import { hiddenFields } from "../presets/hidden-fields";
import { editorField } from "../presets/editors";
import { titleField } from "../presets/title-field";
import { sanitySlug } from "../presets/slug";
import { grunnleggendeKategorier } from "../../../config";

const prefix = "designsystem/side/";

export const GrunnleggendeArtikkel = defineType({
  title: "Ds-Artikkel",
  name: "ds_artikkel",
  type: "document",
  groups,
  ...artikkelPreview,
  fields: [
    ...hiddenFields,
    editorField,
    titleField,
    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: grunnleggendeKategorier.map((x) => ({ title: x, value: x })),
        layout: "radio",
      },
    }),
    sanitySlug(prefix, 3),
    defineField({
      title: "Innhold",
      name: "content",
      type: "riktekst_grunnleggende",
      group: "innhold",
    }),
  ],
});
