import NextLink from "next/link";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <NextLink href="https://www.nav.no/min-cv" passHref legacyBehavior>
      <Button variant="primary" as="a" role="link">
        Tilbake til CV
      </Button>
    </NextLink>
  );
};
