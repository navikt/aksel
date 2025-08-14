import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { defineQuery } from "next-sanity";
import { Metadata } from "next/types";
import { validRange as semverValidRange } from "semver";
import { Heading, VStack } from "@navikt/ds-react";
import { PageProps } from "@/app/(routes)/next-types";
import { sanityFetch } from "@/app/_sanity/live";
import { ENDRINGSLOGG_FIELDS, ENDRINGSLOGG_QUERY } from "@/app/_sanity/queries";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { capitalizeText } from "@/ui-utils/format-text";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import FilterChips from "./_ui/FilterChips";
import LogEntryList from "./_ui/LogEntryList";
import SearchField from "./_ui/SearchField";
import { bumpHeadingLevels } from "./_ui/utils";

export const metadata: Metadata = {
  title: "Endringslogg",
  description:
    "Endringsloggen til Aksel gir deg en oversikt over oppdatert kode, design og dokumentasjon.",
  openGraph: {
    images: "https://aksel.nav.no/images/og/endringslogg/OG-Endringslogg.png",
  },
};

const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear + 1 - startYear },
  (_, value) => `${startYear + value}`,
).reverse();
const categories = ["kode", "design", "dokumentasjon"];

const getMonthAndYear = (dateStr: string | null) => {
  return format(new Date(dateStr || 0), "MMMM yyy", { locale: nb });
};

export default async function Page({ searchParams }: PageProps) {
  const {
    periode: paramYear = "",
    kategori: paramCategory = "",
    fritekst: paramTextFilter = "",
  } = await searchParams;
  const yearFilter = years.includes(paramYear.toString())
    ? paramYear.toString()
    : paramYear === "alle"
      ? null
      : currentYear.toString();
  const categoryFilter = categories.includes(paramCategory.toString())
    ? paramCategory.toString()
    : null;

  /**
   * Proposed change
   * - Check if paramTextFilter is a valid semver version range with `validRange`:  console.info("valid", semverValidRange(">=1.0.0 <2.0.0"));
   * - If it is, assume we want to filter by semver version
   * - - We probably want to ignore periode and kategori filters when this is true
   * - If it is not, treat it as a regular text filter
   * - When true we need to do a few things:
   * - - Fetch all "code" entries: Only need title and _id
   * - - Filter the entries by semver version range using `satisfies`: console.info(semverSatisfies("1.0.1", ">=1.0.0 <2.0.0"));
   * - - Now we can fetch the full entries for the filtered results.
   * - - @note: Might be just as fast to fetch code all entries, needs to be tested.
   *
   */
  const isSemverSearch = semverValidRange(paramTextFilter.toString().trim());
  console.warn("isSemver:", isSemverSearch, paramTextFilter.toString().trim());

  const textFilter = paramTextFilter.toString().trim().split(" ");

  const yearQuery = yearFilter
    ? " && endringsdato >= $year && endringsdato <= $nextYear"
    : "";
  const categoryQuery = categoryFilter ? " && endringstype == $category" : "";
  const textQuery =
    // content[].caption refers captions on images in content
    // "[heading, endringsdato, endringstype, pt::text(content[]), content[].caption]";
    "[heading, endringsdato, endringstype, content[].children[].text, content[].caption]";

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
      }]{${ENDRINGSLOGG_FIELDS}} | order(endringsdato desc)`,
    ) as typeof ENDRINGSLOGG_QUERY,
    params: {
      year: `${yearFilter}`,
      nextYear: `${yearFilter && +yearFilter + 1}`,
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
    logEntry.content = bumpHeadingLevels(logEntry.content) || null;
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
      title: capitalizeText(monthYear),
    };
  });

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <div>
        <DesignsystemetEyebrow type="ds_artikkel" />
        <Heading level="1" size="xlarge" spacing data-aksel-heading-color>
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
      </div>

      <TableOfContents
        feedback={{
          name: "Endringslogg",
          text: "Send innspill",
        }}
        toc={toc}
      />

      <VStack paddingBlock="space-32 space-0">
        {logEntries?.length > 0 ? (
          <LogEntryList list={groupedByMonth} />
        ) : (
          <EmptyStateCard />
        )}
      </VStack>
    </DesignsystemetPageLayout>
  );
}
