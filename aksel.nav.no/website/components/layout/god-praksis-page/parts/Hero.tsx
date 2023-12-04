import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Heading, VStack } from "@navikt/ds-react";

function Hero() {
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline="10"
      paddingBlock="10 6"
      className="bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100"
    >
      <VStack gap="6" align="start">
        <Heading
          size="xlarge"
          as="button"
          className="py-2 pl-6 pr-4 text-aksel-heading bg-surface-subtle flex gap-2 items-center rounded-full shadow-xsmall"
        >
          Alle tema{" "}
          <ChevronDownIcon aria-hidden className="shrink-0 w-12 h-12" />
        </Heading>
        <BodyLong>
          Alle som jobber med produktutvikling i NAV sitter på kunnskap og
          erfaring som er nyttig for andre. Derfor deler vi god praksis med
          hverandre her.
        </BodyLong>
      </VStack>
    </Box>
  );
}

export default Hero;
