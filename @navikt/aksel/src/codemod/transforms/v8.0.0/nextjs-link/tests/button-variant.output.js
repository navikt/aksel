import NextLink from "next/link";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <Button
      variant="primary"
      role="link"
      as={NextLink}
      href="https://www.nav.no/min-cv"
    >
      Tilbake til CV
    </Button>
  );
};
