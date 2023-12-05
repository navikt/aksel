import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import { ArticleCard } from "./ArticleCard";

function ArticleBento({ name, articles }) {
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
              title={articles[0].heading}
              content={articles[0].ingress}
              innholdstype={articles[0].innholdstype}
              undertema={articles[0].undertema}
              slug={articles[0].slug}
            />

            <ArticleCard
              title={articles[1].heading}
              content={articles[1].ingress}
              innholdstype={articles[1].innholdstype}
              undertema={articles[1].undertema}
              slug={articles[1].slug}
            />
            <ArticleCard
              title={articles[2].heading}
              content={articles[2].ingress}
              innholdstype={articles[2].innholdstype}
              undertema={articles[2].undertema}
              slug={articles[2].slug}
            />
          </HGrid>
        </Box>
      </Box>
    </>
  );
}

export default ArticleBento;
