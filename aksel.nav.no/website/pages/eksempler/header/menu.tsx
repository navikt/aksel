import { Dropdown, Header } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Header>
      <Header.Title as="h1">Sykepenger</Header.Title>
      <Dropdown>
        <Header.UserButton
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
    </Header>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 3,
};
