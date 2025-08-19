import { ExternalLinkIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  ExpansionCard,
  HStack,
  Label,
  Link,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-24">
      <ExpansionCard aria-label="Heading-size large demo">
        <ExpansionCard.Header>
          <ExpansionCard.Title as="h2" size="large">
            Utbetaling av sykepenger
          </ExpansionCard.Title>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Innhold />
        </ExpansionCard.Content>
      </ExpansionCard>
      <ExpansionCard aria-label="Heading-size medium demo">
        <ExpansionCard.Header>
          <ExpansionCard.Title as="h3" size="medium">
            Utbetaling av sykepenger
          </ExpansionCard.Title>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Innhold />
        </ExpansionCard.Content>
      </ExpansionCard>
      <ExpansionCard aria-label="Heading-size small demo">
        <ExpansionCard.Header>
          <ExpansionCard.Title as="h4" size="small">
            Utbetaling av sykepenger
          </ExpansionCard.Title>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Innhold />
        </ExpansionCard.Content>
      </ExpansionCard>
    </VStack>
  );
};

const Innhold = () => (
  <>
    <Label as="p" spacing>
      Beløpet går til arbeidsgiveren din
    </Label>
    <BodyLong spacing>
      Vi har registrert at du får sykepenger fra Bedriften AS, som skal ha
      pengene tilbake fra Nav. Selv om pengene går til arbeidsgiveren din, er vi
      forpliktet til å vise deg informasjonen fordi det handler om deg.
    </BodyLong>
    <BodyShort spacing weight="semibold">
      Slik beregner vi sykepengene
    </BodyShort>
    <VStack as="dl" gap="space-4" paddingBlock="0 space-24">
      <Box asChild borderWidth="0 0 1 0">
        <HStack paddingBlock="space-4" justify="space-between">
          <dt>Beregnet månedslønn</dt>
          <dd>27 256 kr</dd>
        </HStack>
      </Box>
      <Box asChild borderWidth="0 0 1 0">
        <HStack paddingBlock="space-4" justify="space-between">
          <dt>Omregnet til årslønn</dt>
          <dd>327 072 kr</dd>
        </HStack>
      </Box>
      <Box asChild>
        <HStack paddingBlock="space-4" justify="space-between">
          <BodyShort as="dt" weight="semibold">
            Daglig sykepengebeløp
          </BodyShort>
          <dd>1 258 kr</dd>
        </HStack>
      </Box>
    </VStack>
    <Box paddingBlock="space-24 0">
      <Box asChild>
        <HStack paddingBlock="space-4" justify="space-between">
          <dt>Utbetalinger totalt</dt>
          <dd>5 dager</dd>
        </HStack>
      </Box>
      <Box asChild>
        <HStack paddingBlock="space-4" justify="space-between">
          <BodyShort as="dt" weight="semibold">
            Sykepengebeløp
          </BodyShort>
          <dd>5 384 kr</dd>
        </HStack>
      </Box>
    </Box>
    <BodyLong spacing>
      * Fra dette beløpet blir det trukket skatt og eventuelt andre trekk før
      utbetalingen.
    </BodyLong>
    <HStack gap="space-8">
      <Link href="#">
        Se tidligere utbetalinger{" "}
        <ExternalLinkIcon aria-hidden fontSize="1.5rem" />
      </Link>
      <Link href="#">
        Les mer om utregningen{" "}
        <ExternalLinkIcon aria-hidden fontSize="1.5rem" />
      </Link>
    </HStack>
  </>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
