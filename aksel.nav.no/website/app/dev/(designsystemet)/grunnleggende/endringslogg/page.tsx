import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { defineQuery } from "next-sanity";
import { Heading, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { ENDRINGSLOGG_QUERY } from "@/app/_sanity/queries";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { capitalize } from "@/utils";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import FilterChips from "./_ui/FilterChips";
import LogEntryList from "./_ui/LogEntryList";
import SearchField from "./_ui/SearchField";
import { bumpHeadingLevels } from "./_ui/utils";

const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear + 1 - startYear },
  (_, value) => startYear + value,
).reverse();
const categories = ["kode", "design", "dokumentasjon"];

const getMonthAndYear = (dateStr: string | null) => {
  return format(new Date(dateStr || 0), "MMMM yyy", { locale: nb });
};

export default async function Page({ searchParams }) {
  const {
    arstall: paramYear,
    kategori: paramCategory,
    fritekst: paramTextFilter,
  } = await searchParams;
  const yearFilter = years.includes(+paramYear)
    ? +paramYear
    : paramYear === "ingen"
      ? null
      : currentYear;
  const categoryFilter = categories.includes(paramCategory)
    ? paramCategory
    : null;
  const textFilter = paramTextFilter?.trim().split(" ");

  const yearQuery = yearFilter
    ? " && endringsdato >= $year && endringsdato <= $nextYear"
    : "";
  const categoryQuery = categoryFilter ? " && endringstype == $category" : "";
  const textQuery =
    // innhold[].caption refers captions on images in innhold
    // "[heading, endringsdato, endringstype, pt::text(innhold[]), innhold[].caption]";
    "[heading, endringsdato, endringstype, innhold[].children[].text, innhold[].caption]";

  const sanityObject = {
    query: defineQuery(
      `*[_type == "ds_endringslogg_artikkel"${yearQuery}${categoryQuery}${
        textFilter
          ? textFilter.reduce(
              (queryString, _, index) =>
                `${queryString} && ${textQuery} match $textFilter${index}`,
              "",
            )
          : ""
      }]{
        heading,
        slug,
        endringsdato,
        endringstype,
        fremhevet,
        herobilde,
        innhold,
        visMer
      } | order(endringsdato desc)`,
    ) as typeof ENDRINGSLOGG_QUERY,
    params: {
      year: `${yearFilter}`,
      nextYear: `${yearFilter && yearFilter + 1}`,
      category: `${categoryFilter}`,
      ...(textFilter
        ? textFilter?.reduce((acc, text, index) => {
            acc[`textFilter${index}`] = `*${text}*`;
            return acc;
          }, {})
        : {}),
    },
  };

  const { data: logEntries } = await sanityFetch(sanityObject);

  logEntries.forEach((logEntry) => {
    logEntry.innhold = bumpHeadingLevels(logEntry.innhold) || null;
  });

  const groupedByMonth = logEntries.reduce(
    (acc: ENDRINGSLOGG_QUERYResult[], logEntry): ENDRINGSLOGG_QUERYResult[] => {
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

  const toc = groupedByMonth.map((entry) => {
    const monthYear = format(
      new Date(entry[0].endringsdato || ""),
      "MMMM yyy",
      { locale: nb },
    );
    return {
      id: monthYear.replace(" ", "-"),
      title: capitalize(monthYear),
    };
  });

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
            selectedYear={yearFilter}
            categories={categories}
            selectedCategory={categoryFilter}
          />
        </VStack>
        <VStack paddingBlock="space-32 space-0">
          {logEntries?.length > 0 ? (
            // TODO: [endringslogg] Should we preload only the 5-10 most recent entries, no year filter, and add a See more updates-button here as per figma sketches?
            <LogEntryList list={groupedByMonth} />
          ) : (
            <EmptyStateCard />
          )}
        </VStack>
      </VStack>
      <TableOfContents
        feedback={{
          name: "Endringslogg",
          text: "Send innspill",
        }}
        toc={toc}
      />
    </DesignsystemetPageLayout>
  );
}
