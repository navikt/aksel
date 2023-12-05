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
            />

            <ArticleCard
              title={results[1].heading}
              content={results[1].ingress}
            />
            <ArticleCard
              title={results[2].heading}
              content={results[2].ingress}
            />
          </HGrid>
        </Box>
      </Box>
    </>
  );
}

export default ArticleBento;
