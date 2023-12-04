import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, HStack, Heading } from "@navikt/ds-react";

function ArticleList() {
  return (
    <Box paddingBlock="10 0">
      <HStack justify="space-between">
        <Heading level="2" size="medium" className="text-aksel-heading">
          Siste
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
        <div>card</div>
        <div>card</div>
        <div>card</div>
        <div>card</div>
      </Box>
    </Box>
  );
}

export default ArticleList;
