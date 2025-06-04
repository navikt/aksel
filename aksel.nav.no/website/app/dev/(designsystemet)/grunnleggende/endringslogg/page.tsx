import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { defineQuery } from "next-sanity";
import { Heading, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import ChronologicalList from "./_ui/ChronologicalList";
import EndringsloggTableOfContents from "./_ui/EndringsloggTableOfContents";
import FilterChips from "./_ui/FilterChips";
import SearchField from "./_ui/SearchField";

const fields =
  "heading, slug, endringsdato, endringstype, fremhevet, herobilde, innhold, visMer";
// It's not imported anywhere - Only for generating types
export const ENDRINGSLOGG_QUERY = defineQuery(
  `*[_type == "ds_endringslogg_artikkel"]{${fields}}`,
);

const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear + 1 - startYear },
  (_, value) => startYear + value,
).reverse();
const categories = ["kode", "design", "dokumentasjon"];

const getMonthAndYear = (dateStr) => {
  return format(new Date(dateStr), "MMMM yyy", { locale: nb });
};

export default async function Page({ searchParams }) {
  const {
    arstall: paramYear,
    kategori: paramCategory,
    fritekst: paramTextFilter,
  } = await searchParams;
  const filterYear = years.includes(+paramYear)
    ? +paramYear
    : paramYear === "ingen"
      ? null
      : currentYear;
  const filterCategory = categories.includes(paramCategory)
    ? paramCategory
    : null;
  const filterText = paramTextFilter;

  const yearFilter = " && endringsdato >= $year && endringsdato <= $nextYear";
  const categoryFilter = " && endringstype == $category";
  const textFilter =
    " && [heading, endringsdato, endringstype, innhold[].children[].text] match $textFilter";
  const sanityObject = {
    query: defineQuery(
      `*[_type == "ds_endringslogg_artikkel"${filterYear ? yearFilter : ""}${
        filterCategory ? categoryFilter : ""
      }${filterText ? textFilter : ""}]{${fields}} | order(endringsdato desc)`,
    ) as any,
    params: {
      year: `${filterYear}`,
      nextYear: `${filterYear && filterYear + 1}`,
      category: `${filterCategory}`,
      textFilter: `${paramTextFilter}*`,
    },
  };

  const { data: logEntries } =
    await sanityFetch<typeof ENDRINGSLOGG_QUERY>(sanityObject);

  // Bump headings to next heading-level for changelog list
  logEntries.forEach((logEntry) => {
    if (logEntry.innhold && logEntry.innhold?.length > 0)
      logEntry.innhold.forEach((block) => {
        if (block._type === "block") {
          if (block.style === "h2") {
            block.style = "h3";
          } else if (block.style === "h3") {
            block.style = "h4";
          } else if (block.style === "h4") {
            block.style = "h5";
          }
        }
      });
  });

  const groupedByMonth = logEntries.reduce<ENDRINGSLOGG_QUERYResult[]>(
    (acc, logEntry) => {
      const monthKey = getMonthAndYear(logEntry.endringsdato);
      const lastGroup = acc[acc.length - 1];
      if (
        !lastGroup ||
        getMonthAndYear(lastGroup[0].endringsdato) !== monthKey
      ) {
        acc.push([logEntry]);
      } else {
        lastGroup.push(logEntry);
      }
      return acc;
    },
    [],
  );

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack>
        <DesignsystemetEyebrow type="ds_artikkel" />
        <Heading level="1" size="xlarge" spacing>
          Endringslogg
        </Heading>
        <VStack gap="space-24" paddingBlock="space-12 space-0">
          <SearchField />
          <FilterChips
            years={years}
            selectedYear={filterYear}
            categories={categories}
            selectedCategory={filterCategory}
          />
        </VStack>
        <VStack paddingBlock="space-32 space-0">
          {logEntries?.length > 0 ? (
            <ChronologicalList list={groupedByMonth} />
          ) : (
            <EmptyStateCard />
          )}
        </VStack>
      </VStack>
      <EndringsloggTableOfContents logEntries={groupedByMonth} />
    </DesignsystemetPageLayout>
  );
}
