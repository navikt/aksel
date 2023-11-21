import { withDsExample } from "@/web/examples/withDsExample";
import { Link } from "@navikt/ds-react";

import NextLink from "next/link";
const NextExample = () => (
  <Link as={NextLink} href="#">
    Lenke til ny side
  </Link>
);

/*

import { Link as ReactRouterLink } from "react-router-dom";
const ReactRouterExample = () => (
  <Link as={ReactRouterLink} to="#">
    Lenke til ny side
  </Link>
);

import { Link as RemixLink } from "@remix-run/react";
const RemixExample = () => (
  <Link as={RemixLink} to="#">
    Lenke til ny side
  </Link>
);

*/

export default withDsExample(NextExample);

/* Storybook story */
export const Demo = {
  render: NextExample,
};

export const args = {
  index: 5,
  desc: "Bruk 'as'-propen hvis du bruker et rammeverk som har sin egen link-komponent.",
  sandbox: false,
};
