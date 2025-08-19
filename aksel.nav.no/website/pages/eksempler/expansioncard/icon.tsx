import { ExternalLinkIcon, PlantIcon } from "@navikt/aksel-icons";
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
    <ExpansionCard aria-label="Demo med ikon">
      <ExpansionCard.Header>
        <HStack wrap={false} gap="4" align="center">
          <div>
            <PlantIcon aria-hidden fontSize="3rem" />
          </div>
          <div>
            <ExpansionCard.Title>Utbetaling av sykepenger</ExpansionCard.Title>
            <ExpansionCard.Description>
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver
            </ExpansionCard.Description>
          </div>
        </HStack>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <Innhold />
      </ExpansionCard.Content>
    </ExpansionCard>
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
  index: 5,
  desc: "Man kan manuelt legge til ikoner eller illustrasjoner vha. HStack.",
};
