import { Facilitet } from "@navikt/ds-icons";

export default {
  title: "Tokens",
  name: "tokens",
  type: "object",
  icon: Facilitet,
  fields: [
    {
      title: "Tittel/beskrivelse",
      name: "title",
      type: "string",
    },
    {
      title: "Tokens",
      name: "tokenlist",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ds_tokens" }] }],
    },
  ],
};
