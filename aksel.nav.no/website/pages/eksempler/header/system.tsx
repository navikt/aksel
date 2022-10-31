import { System } from "@navikt/ds-icons";
import { Dropdown, Header } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Header>
      <Header.Title as="h1">Sykepenger</Header.Title>
      <Dropdown>
        <Header.Button as={Dropdown.Toggle} className="ml-auto">
          <System
            style={{ fontSize: "1.5rem" }}
            title="Systemer og oppslagsverk"
          />
        </Header.Button>

        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>
              Systemer og oppslagsverk
            </Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item>
              A.Inntekt
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
      <Header.User name="Ola Normann" />
    </Header>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 4,
};
