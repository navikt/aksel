import { MenuElipsisHorizontalCircleIcon } from "@navikt/aksel-icons";
import { Button, Dropdown, HStack, Link, Table } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
          <Table.HeaderCell scope="col" align="right">
            Prosent
          </Table.HeaderCell>
          <Table.HeaderCell scope="col" align="right">
            Handlinger
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ name, percent }, i) => (
          <Table.Row key={i + name}>
            <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
            <Table.DataCell align="right">{percent}&nbsp;%</Table.DataCell>
            <Table.DataCell align="right">
              <Dropdown defaultOpen={i === 0}>
                <HStack justify="end">
                  <Button
                    as={Dropdown.Toggle}
                    icon={<MenuElipsisHorizontalCircleIcon title="Meny" />}
                    size="small"
                    variant="tertiary"
                  />
                </HStack>
                <Dropdown.Menu>
                  <Dropdown.Menu.GroupedList>
                    <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
                      Legg på vent
                    </Dropdown.Menu.GroupedList.Item>
                    <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
                      Meld av
                    </Dropdown.Menu.GroupedList.Item>
                    <Dropdown.Menu.Divider />
                    <Dropdown.Menu.GroupedList.Item
                      as={Link}
                      href="#"
                      underline={false}
                    >
                      Annuller
                    </Dropdown.Menu.GroupedList.Item>
                  </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
              </Dropdown>
            </Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const data = [
  {
    name: "Jakobsen, Markus",
    percent: 100,
  },
  {
    name: "Halvorsen, Mari",
    percent: 50,
  },
  {
    name: "Christiansen, Mathias",
    percent: 95,
  },
  {
    name: "Fredriksen, Leah",
    percent: 100,
  },
  {
    name: "Evensen, Jonas",
    percent: 9,
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
