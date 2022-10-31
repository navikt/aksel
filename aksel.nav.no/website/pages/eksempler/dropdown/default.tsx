import { Button } from "@navikt/ds-react";
import { Dropdown } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Dropdown>
      <Button as={Dropdown.Toggle}>Toggle</Button>
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Systemer og oppslagsverk
          </Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item>Gosys</Dropdown.Menu.GroupedList.Item>
          <Dropdown.Menu.GroupedList.Item>
            Infotrygd
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
        <Dropdown.Menu.Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>Infotrygd</Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
