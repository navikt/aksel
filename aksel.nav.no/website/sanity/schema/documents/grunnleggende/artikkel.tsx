import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { artikkelPreview } from "../presets/artikkel-preview";
import { hiddenFields } from "../presets/hidden-fields";
import { editorField } from "../presets/editors";
import { titleField } from "../presets/title-field";
import { sanitySlug } from "../presets/slug";

const prefix = "designsystem/side/";

export default defineType({
  title: "Artikkel",
  name: "ds_artikkel",
  type: "document",
  groups,
  ...artikkelPreview,
  fields: [
    ...hiddenFields,
    editorField,
    titleField,
    sanitySlug(prefix, 3),
    defineField({
      title: "Innhold",
      name: "content",
      type: "riktekst_grunnleggende",
      group: "innhold",
    }),
  ],
});
