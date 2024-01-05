import Link from "next/link";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Link href="#" passHref legacyBehavior>
      <Button as="a">Lenke</Button>
    </Link>
  );
};

/*

import { Link as ReactRouterLink } from "react-router-dom";
const ReactRouterExample = () => (
  <Button as={ReactRouterLink} to="#">
    Lenke
  </Button>
);

import { Link as RemixLink } from "@remix-run/react";
const RemixExample = () => (
  <Button as={RemixLink} to="#">
    Lenke
  </Button>
);

*/

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
  desc: "OverridableComponent lar deg endre hvilken html-tag komponenten rendres med.",
};
