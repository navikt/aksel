import {
  ALL_GRUNNLEGGENDE_MARKDOWN_QUERY,
  GRUNNLEGGENDE_BY_SLUG_MARKDOWN_QUERY,
} from "@/app/_sanity/queries";
import type { ALL_GRUNNLEGGENDE_MARKDOWN_QUERY_RESULT } from "@/app/_sanity/query-types";
import { createRoute } from "../helpers/create-route";

type GrunnleggendeItem = ALL_GRUNNLEGGENDE_MARKDOWN_QUERY_RESULT[number];

export default createRoute<GrunnleggendeItem>({
  query: ALL_GRUNNLEGGENDE_MARKDOWN_QUERY,
  slugQuery: GRUNNLEGGENDE_BY_SLUG_MARKDOWN_QUERY,
  xmlTag: "foundation",
  heading: "Grunnleggende designsystem-oppsett for Aksel",
  description: "Oversikt over grunnleggende oppsett for designsystemet i Aksel",
  buildAttributes: (item) => ({
    name: item.heading ?? "",
    status: item.status?.tag ?? "stable",
    category: item.kategori ?? "Ukjent",
  }),
});
