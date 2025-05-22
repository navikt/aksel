import { defineQuery } from "next-sanity";
import { BodyShort, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import ChronologicalList from "./ChronologicalList";
import FilterChips from "./FilterChips";
import SearchField from "./SearchField";

export default async () => {
  const year = new Date().getFullYear();
  const { data: logsData } = await sanityFetch({
    query: defineQuery(
      `*[_type == "ds_endringslogg_artikkel" && endringsdato >= $year && endringsdato <= $nextYear]{heading, slug, endringsdato, endringstype, fremhevet, herobilde, innhold} | order(endringsdato desc)`,
    ),
    params: { year: `${year}`, nextYear: `${year + 1}` },
  });
  return (
    <>
      <VStack
        gap="space-24"
        paddingBlock="space-12 space-0"
        /** Make search and filter sticky */
        // style={{
        //   position: "sticky",
        //   top: "calc(var(--website-header-height))",
        //   background: "var(--ax-bg-default)",
        //   zIndex: 1,
        // }}
      >
        <SearchField />
        <FilterChips />
      </VStack>
      <VStack paddingBlock="space-32 space-0">
        {logsData?.length > 0 ? (
          <ChronologicalList list={logsData} />
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
    </>
  );
};
