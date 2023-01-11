import { defineField, defineType } from "sanity";
import { artikkelPreview } from "./presets/artikkel-preview";
import { groups } from "./presets/groups";
import { hiddenFields } from "./presets/hidden-fields";
import { sanitySlug } from "./presets/slug";
import { titleField } from "./presets/title-field";

const prefix = "side/";

export const Standalone = defineType({
  title: "Standalone-sider",
  name: "aksel_standalone",
  type: "document",
  groups,
  ...artikkelPreview("Standalone-artikkel"),
  fields: [
    ...hiddenFields,
    titleField,
    sanitySlug(prefix, 2),
    defineField({
      title: "Innhold",
      name: "content",
      type: "riktekst_standard",
      group: "innhold",
    }),
  ],
});
