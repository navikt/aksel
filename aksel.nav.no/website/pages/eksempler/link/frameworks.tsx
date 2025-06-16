import NextLink from "next/link";
import { Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <Link as={NextLink} href="/eksempel">
    Lenke til ny side
  </Link>
);

/*

import { Link as ReactRouterLink } from "react-router";
const ReactRouterExample = () => (
  <Link as={ReactRouterLink} to="/eksempel">
    Lenke til ny side
  </Link>
);

import { Link as RemixLink } from "@remix-run/react";
const RemixExample = () => (
  <Link as={RemixLink} to="/eksempel">
    Lenke til ny side
  </Link>
);

*/

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Bruk 'as'-propen hvis du bruker et rammeverk som har sin egen link-komponent.",
  sandbox: false,
};
