import NextLink from "next/link";
import { Button } from "@navikt/ds-react";

const Example = () => {
  return <Button as={NextLink} href="#">Lenke</Button>;
};
