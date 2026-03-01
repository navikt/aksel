import NextLink from "next/link";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <Button
      className="custom-class"
      data-testid="button"
      as={NextLink}
      href="/"
    >
      Click me
    </Button>
  );
};
