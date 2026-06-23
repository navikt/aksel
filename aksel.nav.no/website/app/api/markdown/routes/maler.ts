import {
  ALL_TEMPLATES_MARKDOWN_QUERY,
  TEMPLATES_BY_SLUG_MARKDOWN_QUERY,
} from "@/app/_sanity/queries";
import type { ALL_TEMPLATES_MARKDOWN_QUERY_RESULT } from "@/app/_sanity/query-types";
import { createRoute } from "../helpers/create-route";

type MalerItem = ALL_TEMPLATES_MARKDOWN_QUERY_RESULT[number];

export default createRoute<MalerItem>({
  query: ALL_TEMPLATES_MARKDOWN_QUERY,
  slugQuery: TEMPLATES_BY_SLUG_MARKDOWN_QUERY,
  xmlTag: "templates",
  heading: "Mønster og maler satt opp med Aksel",
  description: "Oversikt over mønster og maler satt opp med Aksel-systemet",
  buildAttributes: (item) => ({
    name: item.heading!,
    status: item.status?.tag ?? "stable",
    category: item.kategori ?? "Ukjent",
  }),
});
