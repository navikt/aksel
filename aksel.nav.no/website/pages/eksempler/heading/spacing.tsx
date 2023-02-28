import { BodyLong, Heading } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Heading level="3" size="medium" spacing>
        Pengestøtte når du er syk
      </Heading>
      <BodyLong>
        Magna aliqua et adipisicing nostrud elit ea. Id ipsum ut laborum ut
        adipisicing magna laboris pariatur commodo quis nulla ea aliquip mollit.
        Nisi aliquip voluptate laboris nisi eiusmod labore eu non. Deserunt sint
        incididunt est sunt ex labore irure irure est eiusmod.
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
