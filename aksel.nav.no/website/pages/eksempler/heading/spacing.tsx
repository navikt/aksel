import { BodyLong, Heading } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Heading level="3" size="medium" spacing>
        Pengestøtte når du er syk
      </Heading>
      <BodyLong>
        Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til
        barnebidrag fra en eller begge foreldre mens du fullfører videregående
        skole eller tilsvarende.
      </BodyLong>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
