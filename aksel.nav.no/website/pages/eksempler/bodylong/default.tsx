import { BodyLong } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      Amet dolore non tempor incididunt dolor est enim aute commodo cillum quis.
      Ex esse veniam ipsum quis. Pariatur duis do qui exercitation ut laboris
      sit veniam nostrud nulla esse. In aute sint enim reprehenderit ut
      voluptate do id. Laborum irure qui officia aute ipsum. Exercitation dolor
      sunt deserunt non anim.
    </BodyLong>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
