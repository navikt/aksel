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
            <ArticleCard {...articles[0]} />

            <ArticleCard {...articles[1]} />
            <ArticleCard {...articles[2]} />
          </HGrid>
        </Box>
      </Box>
    </>
  );
}

export default ArticleBento;
