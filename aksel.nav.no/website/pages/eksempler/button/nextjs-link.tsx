import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import Link from "next/link";

const Example = () => {
  return (
    <Link href="#" passHref legacyBehavior>
      <Button as="a">Lenke</Button>
    </Link>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
  desc: "OverridableComponent lar deg endre hvilken html-tag komponenten rendres med.",
};
