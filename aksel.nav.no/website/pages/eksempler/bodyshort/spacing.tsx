import { BodyShort } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <BodyShort spacing>Trenger du hjelp til å komme i jobb?</BodyShort>
      <BodyShort>Trenger hjelp til å utføre utdanning</BodyShort>
    </div>
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
