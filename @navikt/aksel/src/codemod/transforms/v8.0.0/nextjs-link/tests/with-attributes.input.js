import NextLink from "next/link";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <NextLink href="/" passHref legacyBehavior>
      <Button as="a" className="custom-class" data-testid="button">
        Click me
      </Button>
    </NextLink>
  );
};
