import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import { ArticleCard } from "./ArticleCard";

function ArticleGrid({ name, results }) {
  return (
    <>
      <style>
        {`
          .gp-article-card-main {
            grid-column: span 2;
            grid-row: span 2;
          }
          `}
      </style>
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
          <HGrid gap="6" columns={3}>
            {results &&
              results.map((article, idx) => (
                <ArticleCard
                  key={idx}
                  title={article.heading}
                  content={article.ingress}
                />
              ))}
          </HGrid>
        </Box>
      </Box>
    </>
  );
}

export default ArticleGrid;
