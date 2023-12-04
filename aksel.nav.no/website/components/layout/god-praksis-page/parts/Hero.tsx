import { BodyLong, Box, Heading } from "@navikt/ds-react";

function Hero() {
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline="10"
      paddingBlock="10 6"
      className="bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100"
    >
      <Heading level="1" size="xlarge" className="text-aksel-heading">
        Alle tema
      </Heading>
      <BodyLong>
        Alle som jobber med produktutvikling i NAV sitter på kunnskap og
        erfaring som er nyttig for andre. Derfor deler vi god praksis med
        hverandre her.
      </BodyLong>
    </Box>
  );
}

export default Hero;
