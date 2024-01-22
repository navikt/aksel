import { ExternalLinkIcon, PlantIcon } from "@navikt/aksel-icons";
import { BodyLong, ExpansionCard, HStack, Label, Link } from "@navikt/ds-react";
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
      pengene tilbake fra NAV. Selv om pengene går til arbeidsgiveren din, er vi
      forpliktet til å vise deg informasjonen fordi det handler om deg.
    </BodyLong>
    <Label as="p" spacing>
      Slik beregner vi sykepengene
    </Label>
    <dl className="grid gap-1 border-b border-border-subtle pb-6">
      <div className="flex justify-between border-b border-border-default py-1">
        <dt>Beregnet månedslønn</dt>
        <dd>27 256 kr</dd>
      </div>
      <div className="flex justify-between border-b border-border-default py-1">
        <dt>Omgregnet til årslønn</dt>
        <dd>327 072 kr</dd>
      </div>
      <div className="flex justify-between border-b border-border-default py-1">
        <dt className="font-semibold">Daglig sykepengebeløp</dt>
        <dd>1 258 kr</dd>
      </div>
    </dl>
    <dl className="pt-6">
      <div className="flex justify-between border-b border-border-default py-1">
        <dt>Utbetalinger totalt</dt>
        <dd>5 dager</dd>
      </div>
      <div className="flex justify-between border-b border-border-default py-1">
        <dt className="font-semibold">Sykepengebeløp</dt>
        <dd>5 384 kr</dd>
      </div>
    </dl>
    <BodyLong spacing className="mt-4">
      * Fra dette beløpet blir det trukket skatt og eventuelt andre trekk før
      utbetalingen.
    </BodyLong>
    <div className="grid w-fit gap-2">
      <Link href="#">
        Se tidligere utbetalinger{" "}
        <ExternalLinkIcon aria-hidden fontSize="1.5rem" />
      </Link>
      <Link href="#">
        Les mer om utregningen{" "}
        <ExternalLinkIcon aria-hidden fontSize="1.5rem" />
      </Link>
    </div>
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
