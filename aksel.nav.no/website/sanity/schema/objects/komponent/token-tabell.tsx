import { TiersIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const TokenTabell = defineType({
  name: "token_ref",
  title: "Tokens referanse",
  type: "reference",
  to: [{ type: "token_kategori" }],
  validation: (Rule) => Rule.required(),
  icon: TiersIcon,
});
