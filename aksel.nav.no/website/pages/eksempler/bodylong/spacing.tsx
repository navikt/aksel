import { BodyLong } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <BodyLong spacing>
        Amet dolore non tempor incididunt dolor est enim aute commodo cillum
        quis. Ex esse veniam ipsum quis. Pariatur duis do qui exercitation ut
        laboris sit veniam nostrud nulla esse.
      </BodyLong>
      <BodyLong>
        Magna aliqua et adipisicing nostrud elit ea. Id ipsum ut laborum ut
        adipisicing magna laboris pariatur commodo quis nulla ea aliquip mollit.
        Nisi aliquip voluptate laboris nisi eiusmod labore eu non.
      </BodyLong>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
