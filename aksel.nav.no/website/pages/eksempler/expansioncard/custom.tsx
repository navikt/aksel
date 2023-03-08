import { ExternalLinkIcon, StarIcon } from "@navikt/aksel-icons";
import { BodyLong, ExpansionCard, Label, Link } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="subtle-card min-h-[40rem] max-w-lg">
      <ExpansionCard>
        <ExpansionCard.Header avatar={<StarIcon aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Innhold />
        </ExpansionCard.Content>
      </ExpansionCard>

      <style>{`
        .subtle-card {
          --ac-expansioncard-bg: var(--a-deepblue-50);
          --ac-expansioncard-avatar-bg: var(--a-surface-alt-3-subtle);
          --ac-expansioncard-avatar-icon: var(--a-icon-alt-3);
          --ac-expansioncard-open-border-color: var(--a-border-alt-3);
        }`}</style>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "Tokens lar deg lett gjøre stilendringene du trenger uten å måtte overskrive css-klasser.",
};

export const args = {
  index: 0,
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
    <dl className="border-border-subtle grid gap-1 border-b pb-6">
      <div className="border-border-default flex justify-between border-b py-1">
        <dt>Beregnet månedslønn</dt>
        <dd>27 256 kr</dd>
      </div>
      <div className="border-border-default flex justify-between border-b py-1">
        <dt>Omgregnet til årslønn</dt>
        <dd>327 072 kr</dd>
      </div>
      <div className="border-border-default flex justify-between border-b py-1">
        <dt className="font-semibold">Daglig sykepengebeløp</dt>
        <dd>1 258 kr</dd>
      </div>
    </dl>
    <dl className="pt-6">
      <div className="border-border-default flex justify-between border-b py-1">
        <dt>Utbetalinger totalt</dt>
        <dd>5 dager</dd>
      </div>
      <div className="border-border-default flex justify-between border-b py-1">
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
