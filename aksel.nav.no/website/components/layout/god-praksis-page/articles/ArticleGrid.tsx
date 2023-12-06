import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import { ArticleCard } from "./ArticleCard";

function ArticleGrid({ name, articles }) {
  return (
    <div>
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
        <HGrid gap="6" columns={{ xs: 1, md: 2, lg: 3 }}>
          {articles &&
            articles.map((article, idx) => (
              <ArticleCard
                key={idx}
                title={article.heading}
                content={article.ingress}
                innholdstype={article.innholdstype}
                undertema={article.undertema}
                slug={article.slug}
                isNew={article.isNew}
              />
            ))}
        </HGrid>
      </Box>
    </div>
  );
}

export default ArticleGrid;
