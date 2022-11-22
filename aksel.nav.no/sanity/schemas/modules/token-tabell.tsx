import { Table } from "@navikt/ds-icons";

export default {
  name: "token_ref",
  title: "Tokens referanse",
  type: "reference",
  to: [{ type: "token_kategori" }],
  validation: (Rule) => Rule.required(),
  icon: Table,
};
