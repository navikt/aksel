import PackageJson from "@navikt/ds-react/package.json";
import { ALL_KOMPONENTS_MARKDOWN_QUERY } from "@/app/_sanity/queries";
import type { ALL_KOMPONENTS_MARKDOWN_QUERY_RESULT } from "@/app/_sanity/query-types";
import { createRoute } from "./create-route";

type KomponentItem = ALL_KOMPONENTS_MARKDOWN_QUERY_RESULT[number];

export default createRoute<KomponentItem>({
  query: ALL_KOMPONENTS_MARKDOWN_QUERY,
  xmlTag: "component",
  heading: "Alle komponenter i Aksel",
  description: "Oversikt over alle komponenter i Aksel",
  buildAttributes: (item) => ({
    name: item.heading!,
    status: item.status?.tag ?? "stable",
    category: item.kategori ?? "Ukjent",
    packages: (item.kodepakker ?? []).join(", ") || "Ukjent",
    version: PackageJson?.version,
  }),
  getIntro: (item) => item.intro?.body,
});
