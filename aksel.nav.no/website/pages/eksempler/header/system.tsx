import { MenuGridIcon } from "@navikt/aksel-icons";
import { Dropdown, InternalHeader, Spacer } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Spacer />
      <Dropdown>
        <InternalHeader.Button as={Dropdown.Toggle}>
          <MenuGridIcon
            style={{ fontSize: "1.5rem" }}
            title="Systemer og oppslagsverk"
          />
        </InternalHeader.Button>

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
      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 4,
};
