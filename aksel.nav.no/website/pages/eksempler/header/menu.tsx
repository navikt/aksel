import { Dropdown, InternalHeader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Dropdown>
        <InternalHeader.UserButton
          as={Dropdown.Toggle}
          name="Ola Normann"
          description="Enhet: Skien"
          className="ml-auto"
        />
        <Dropdown.Menu>
          <Dropdown.Menu.List>
            <Dropdown.Menu.List.Item>Logg ut</Dropdown.Menu.List.Item>
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 3,
};
