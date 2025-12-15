import NextLink from "next/link";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <NextLink href="#" passHref legacyBehavior>
      <Button as="a">Lenke</Button>
    </NextLink>
  );
};

/*

import { Link as ReactRouterLink } from "react-router";
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
  desc: "[OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) lar deg endre hvilken HTML-tag komponenten rendres med. For vanlige lenker kan dette være en `<a>`-tag, men for f.eks. React Router eller Remix kan det være en `<Link>`-komponent.",
  sandbox: false,
};
