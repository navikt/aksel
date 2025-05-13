import { defineQuery } from "next-sanity";
import { BodyLong, BodyShort, VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import FilterChips from "./FilterChips";
import SearchField from "./SearchField";

export default async () => {
  const year = new Date().getFullYear();
  const { data: logsData } = await sanityFetch({
    query: defineQuery(
      `*[_type == "ds_endringsloggartikkel" && endringsdato >= $year && endringsdato <= $nextYear]{endringsdato, endringstype, fremhevet, heading, innhold, merinnhold, vismer, slug}`,
    ),
    params: { year: `${year}`, nextYear: `${year + 1}` },
  });
  return (
    <VStack gap="space-8">
      <VStack gap="space-40">
        <SearchField />
        <FilterChips />

        <BodyLong size="large">{JSON.stringify(logsData)}</BodyLong>

        <EmptyStateCard
          actionComponent={
            <BodyShort size="small">
              Det er ikke sluppet noen endringer i denne perioden.
            </BodyShort>
          }
        />
      </VStack>
    </VStack>
  );
};
