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

export default async () => {
  const year = new Date().getFullYear();
  const { data: logEntries } = await sanityFetch({
    query: defineQuery(
      `*[_type == "ds_endringslogg_artikkel" && endringsdato >= $year && endringsdato <= $nextYear]{heading, slug, endringsdato, endringstype, fremhevet, herobilde, innhold} | order(endringsdato desc)`,
    ),
    params: { year: `${year}`, nextYear: `${year + 1}` },
  });
  // Bump headings to next heading-level for changelog list
  logEntries.forEach((logEntry) => {
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

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack>
        <DesignsystemetEyebrow type="ds_artikkel" />
        <Heading level="1" size="xlarge" spacing>
          Endringslogg
        </Heading>
        <VStack gap="space-24" paddingBlock="space-12 space-0">
          <SearchField />
          <FilterChips />
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
};
