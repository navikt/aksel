export const codeBefore = `import { Alert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
`;

export const codeBeforeWithoutExportDefaultDsExample = `import { Alert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
  );
};

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
`;

export const codeAfter = `import { Alert } from "@navikt/ds-react";

const Example = () => {
  return (
    <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
  );
};`;

export const codeBeforeExpansionCardIcon = `import { ExternalLinkIcon, PlantIcon } from "@navikt/aksel-icons";
import { BodyLong, ExpansionCard, Label, Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="subtle-card">
      <ExpansionCard aria-label="Demo med custom-styling">
        <ExpansionCard.Header>
          <div className="with-icon">
            <div className="icon">
              <PlantIcon aria-hidden />
            </div>
            <div>
              <ExpansionCard.Title>
                Utbetaling av sykepenger
              </ExpansionCard.Title>
              <ExpansionCard.Description>
                For at yrkesskadedekningen skal gjelde, er det som hovedregel
                krav til tid, sted og arbeidsoppgaver
              </ExpansionCard.Description>
            </div>
          </div>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Innhold />
        </ExpansionCard.Content>
      </ExpansionCard>

      <style>{\`
        .with-icon {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon {
          font-size: 3rem;
          flex-shrink: 0;
          display: grid;
          place-content: center;
        }\`}</style>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Man kan manuelt legge til ikoner eller illustrasjoner med egen styling.",
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
    <Label as="p" spacing>
      Slik beregner vi sykepengene
    </Label>
    <dl className="border-border-subtle grid gap-1 border-b pb-6">
      <div className="border-border-default flex justify-between border-b py-1">
        <dt>Beregnet månedslønn</dt>
        <dd>27 256 kr</dd>
      </div>
      <div className="border-border-default flex justify-between border-b py-1">
        <dt>Omregnet til årslønn</dt>
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
`;

export const codeAfterExpansionCardIcon = `import { ExternalLinkIcon, PlantIcon } from "@navikt/aksel-icons";
import { BodyLong, ExpansionCard, Label, Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="subtle-card">
      <ExpansionCard aria-label="Demo med custom-styling">
        <ExpansionCard.Header>
          <div className="with-icon">
            <div className="icon">
              <PlantIcon aria-hidden />
            </div>
            <div>
              <ExpansionCard.Title>
                Utbetaling av sykepenger
              </ExpansionCard.Title>
              <ExpansionCard.Description>
                For at yrkesskadedekningen skal gjelde, er det som hovedregel
                krav til tid, sted og arbeidsoppgaver
              </ExpansionCard.Description>
            </div>
          </div>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Innhold />
        </ExpansionCard.Content>
      </ExpansionCard>

      <style>{\`
        .with-icon {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon {
          font-size: 3rem;
          flex-shrink: 0;
          display: grid;
          place-content: center;
        }\`}</style>
    </div>
  );
};`;
