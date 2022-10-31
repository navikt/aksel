import { Heading } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid gap-2">
      <Heading level="1" size="xlarge">
        Pengestøtte når du er syk
      </Heading>
      <Heading level="2" size="large">
        Pengestøtte når du er syk
      </Heading>
      <Heading level="3" size="medium">
        Pengestøtte når du er syk
      </Heading>
      <Heading level="4" size="small">
        Pengestøtte når du er syk
      </Heading>
      <Heading level="5" size="xsmall">
        Pengestøtte når du er syk
      </Heading>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
  desc: "Du må selv velge hvilken h-tag Heading rendres som ved hjelp av level-prop.",
};
