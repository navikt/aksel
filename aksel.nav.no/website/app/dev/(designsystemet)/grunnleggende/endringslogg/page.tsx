import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { defineQuery } from "next-sanity";
import { Heading, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import FilterChips from "./_ui/FilterChips";
import LogEntryList from "./_ui/LogEntryList";
import SearchField from "./_ui/SearchField";

const fields =
  "heading, slug, endringsdato, endringstype, fremhevet, herobilde, innhold, visMer";
type ENDRINGSLOGG_QUERY =
  `*[_type == "ds_endringslogg_artikkel"]{${typeof fields}}`;

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
      }]{${fields}} | order(endringsdato desc)`,
    ) as ENDRINGSLOGG_QUERY,
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

  const { data: logEntries } =
    await sanityFetch<ENDRINGSLOGG_QUERY>(sanityObject);

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

  const toc = groupedByMonth.map((entry) => {
    const monthYearTag = format(
      new Date(entry[0].endringsdato || ""),
      "MMMM-yyy",
      {
        locale: nb,
      },
    );
    const monthYearLowercase = format(
      new Date(entry[0].endringsdato || ""),
      "MMMM yyy",
      {
        locale: nb,
      },
    );
    const monthYear =
      monthYearLowercase.charAt(0).toUpperCase() + monthYearLowercase.slice(1);
    return {
      id: monthYearTag,
      title: monthYear,
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
        showChangelogLink={true}
        toc={toc}
      />
    </DesignsystemetPageLayout>
  );
}
