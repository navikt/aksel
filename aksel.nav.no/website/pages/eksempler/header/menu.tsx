import { withDsExample } from "@/web/examples/withDsExample";
import { Dropdown, InternalHeader, Spacer } from "@navikt/ds-react";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Spacer />
      <Dropdown>
        <InternalHeader.UserButton
          as={Dropdown.Toggle}
          name="Ola Normann"
          description="Enhet: Skien"
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

export default withDsExample(Example, { variant: "full" });

export const args = {
  index: 3,
};
