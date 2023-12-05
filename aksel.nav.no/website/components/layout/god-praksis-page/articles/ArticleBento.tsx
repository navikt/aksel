import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import { ArticleCard } from "./ArticleCard";

function ArticleBento({ name, results }) {
  return (
    <>
      <Box>
        <HStack justify="space-between">
          <Heading level="2" size="medium" className="text-aksel-heading">
            {name}
          </Heading>
          <Button
            variant="tertiary-neutral"
            size="small"
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition="right"
          >
            Se alle
          </Button>
        </HStack>
        <Box paddingBlock="5 0">
          <HGrid gap="6" columns="1fr 1fr 1fr" className="aksel-bento">
            <ArticleCard
              main
              title={results[0].heading}
              content={results[0].ingress}
              innholdstype={results[0].innholdstype}
              undertema={results[0].undertema}
              slug={results[0].slug}
            />

            <ArticleCard
              title={results[1].heading}
              content={results[1].ingress}
              innholdstype={results[1].innholdstype}
              undertema={results[1].undertema}
              slug={results[1].slug}
            />
            <ArticleCard
              title={results[2].heading}
              content={results[2].ingress}
              innholdstype={results[2].innholdstype}
              undertema={results[2].undertema}
              slug={results[2].slug}
            />
          </HGrid>
        </Box>
      </Box>
    </>
  );
}

export default ArticleBento;
