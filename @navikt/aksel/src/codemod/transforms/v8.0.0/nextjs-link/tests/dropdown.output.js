import { NextLink } from "@/app/_ui/next-link/NextLink";
import { Dropdown } from "@navikt/ds-react";

const Example = () => {
  return (
    <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item as={NextLink} href="/">
            Forside
          </Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  );
};
