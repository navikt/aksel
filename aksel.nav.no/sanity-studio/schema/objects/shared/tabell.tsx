import { defineType } from "sanity";
import { TableIcon } from "@navikt/aksel-icons";

export const Tabell = defineType({
  title: "Tabell",
  name: "tabell_v2",
  type: "table",
  icon: () => <TableIcon aria-hidden />,
});
