import PackageJson from "@navikt/ds-react/package.json";
import {
  ALL_KOMPONENTS_MARKDOWN_QUERY,
  KOMPONENT_BY_SLUG_MARKDOWN_QUERY,
} from "@/app/_sanity/queries";
import type { ALL_KOMPONENTS_MARKDOWN_QUERY_RESULT } from "@/app/_sanity/query-types";
import { createRoute } from "../helpers/create-route";

type KomponentItem = ALL_KOMPONENTS_MARKDOWN_QUERY_RESULT[number];

const description = `
Oversikt over alle komponenter i Aksel

<system-prop-definitions>
  type BreakpointsAlias = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  type SpaceDelimitedAttribute<T extends string> =
    | \${T}
    | \${T} \${T}
    | \${T} \${T} \${T}
    | \${T} \${T} \${T} \${T}

  type FixedResponsiveT<T> = {
    [Breakpoint in BreakpointsAlias]?: T;
  };

  type ResponsiveProp<T> = T | FixedResponsiveT<T>;

  <example>
    margin={{xs: "space-2", md: "space-8", lg: "space-12 space-8 space-4 space-2"}}
  </example>
</system-prop-definitions>
`;

export default createRoute<KomponentItem>({
  query: ALL_KOMPONENTS_MARKDOWN_QUERY,
  slugQuery: KOMPONENT_BY_SLUG_MARKDOWN_QUERY,
  xmlTag: "component",
  heading: "Alle komponenter i Aksel",
  description,
  buildAttributes: (item) => ({
    name: item.heading!,
    status: item.status?.tag ?? "stable",
    category: item.kategori ?? "Ukjent",
    packages: (item.kodepakker ?? []).join(", ") || "Ukjent",
    version: PackageJson?.version,
  }),
  getIntro: (item) => item.intro?.body,
});
