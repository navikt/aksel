import { defineQuery } from "next-sanity";
import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import TokenTableOfContents from "../darkside/design-tokens/_ui/TokenTableOfContents";
import ChronologicalList from "./_ui/ChronologicalList";
import FilterChips from "./_ui/FilterChips";
import SearchField from "./_ui/SearchField";

const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear + 1 - startYear },
  (_, value) => startYear + value,
).reverse();
const categories = ["kode", "design", "dokumentasjon"];

const queryFilter =
  "{heading, slug, endringsdato, endringstype, fremhevet, herobilde, innhold} | order(endringsdato desc)";
const yearQuery = defineQuery(
  `*[_type == "ds_endringslogg_artikkel" && endringsdato >= $year && endringsdato <= $nextYear]${queryFilter}`,
);
const categoryQuery = defineQuery(
  `*[_type == "ds_endringslogg_artikkel" && endringstype == $category]${queryFilter}`,
);
const yearAndCategoryQuery = defineQuery(
  `*[_type == "ds_endringslogg_artikkel" && endringstype == $category && endringsdato >= $year && endringsdato <= $nextYear]${queryFilter}`,
);
const generalQuery = defineQuery(
  `*[_type == "ds_endringslogg_artikkel"]${queryFilter}`,
);

export default async function Page({ searchParams }) {
  const { arstall: paramYear, kategori: paramCategory } = await searchParams;
  const filterYear = years.includes(+paramYear)
    ? +paramYear
    : paramYear === "ingen"
      ? null
      : currentYear;
  const filterCategory = categories.includes(paramCategory)
    ? paramCategory
    : null;

  const { data: logEntries } = await sanityFetch(
    filterYear && filterCategory
      ? {
          query: yearAndCategoryQuery,
          params: {
            year: `${filterYear}`,
            nextYear: `${filterYear + 1}`,
            category: `${filterCategory}`,
          },
        }
      : filterYear
        ? {
            query: yearQuery,
            params: { year: `${filterYear}`, nextYear: `${filterYear + 1}` },
          }
        : filterCategory
          ? {
              query: categoryQuery,
              params: { category: `${filterCategory}` },
            }
          : { query: generalQuery },
  );
  // Bump headings to next heading-level for changelog list
  logEntries.forEach((logEntry) => {
    if (logEntry.innhold?.length > 0)
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

  // TODO: [endringslogg] Add filtering by year and category

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
            <ChronologicalList list={logEntries} />
          ) : (
            <EmptyStateCard
              actionComponent={
                <BodyShort size="small">
                  Det er ikke sluppet noen endringer i denne perioden.
                </BodyShort>
              }
            />
          )}
        </VStack>
      </VStack>
      <TokenTableOfContents />
    </DesignsystemetPageLayout>
  );
}
