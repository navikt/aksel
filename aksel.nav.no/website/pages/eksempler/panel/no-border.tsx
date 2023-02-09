import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Panel>
      <Heading spacing level="2" size="large">
        Søk om økonomisk sosialhjelp
      </Heading>
      <BodyLong>
        Du kan søke om det du trenger økonomisk støtte til. Det er bare ett
        søknadsskjema, og du beskriver selv hva du vil søke om. NAV-kontoret vil
        gjøre en konkret og individuell vurdering av din søknad. Har du sendt en
        søknad og ønsker å sende dokumentasjon, kan du gjøre dette under dine
        søknader.
      </BodyLong>
    </Panel>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
