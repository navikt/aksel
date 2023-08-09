import { BodyLong, Link } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      Officia incididunt{" "}
      <Link href="#" underline={false}>
        lenke til ny side
      </Link>{" "}
      occaecat commodo id ad aliquip.
    </BodyLong>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
