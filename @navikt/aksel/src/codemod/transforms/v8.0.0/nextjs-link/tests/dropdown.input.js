import { NextLink } from "@/app/_ui/next-link/NextLink";
import { Dropdown } from "@navikt/ds-react";

const Example = () => {
  return (
    <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Menu.List>
          <NextLink href="/" passHref legacyBehavior>
            <Dropdown.Menu.List.Item as="a">Forside</Dropdown.Menu.List.Item>
          </NextLink>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  );
};
