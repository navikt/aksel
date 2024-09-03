import { MenuElipsisVerticalIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button, Table } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Status</Table.HeaderCell>
          <Table.HeaderCell aria-label="" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ id, status }, i) => {
          return (
            <Table.Row key={i + status}>
              <Table.HeaderCell scope="row">{id}</Table.HeaderCell>
              <Table.DataCell>{status}</Table.DataCell>
              <Table.DataCell align="right">
                <ActionMenu defaultOpen={i === 1}>
                  <ActionMenu.Trigger>
                    <Button
                      variant="tertiary-neutral"
                      icon={<MenuElipsisVerticalIcon title="Saksmeny" />}
                      size="small"
                    />
                  </ActionMenu.Trigger>
                  <ActionMenu.Content>
                    <ActionMenu.Group label={`Sak #${id}`}>
                      <ActionMenu.Item onSelect={console.info}>
                        Ta sak
                      </ActionMenu.Item>
                      <ActionMenu.Sub>
                        <ActionMenu.SubTrigger>
                          Endre status
                        </ActionMenu.SubTrigger>
                        <ActionMenu.SubContent>
                          <ActionMenu.Item onSelect={console.info}>
                            Avslått
                          </ActionMenu.Item>
                          <ActionMenu.Item onSelect={console.info}>
                            Godkjent
                          </ActionMenu.Item>
                          <ActionMenu.Sub>
                            <ActionMenu.SubTrigger>
                              Andre valg
                            </ActionMenu.SubTrigger>
                            <ActionMenu.SubContent>
                              <ActionMenu.Item onSelect={console.info}>
                                Til godkjenning
                              </ActionMenu.Item>
                              <ActionMenu.Item onSelect={console.info}>
                                Under behandling
                              </ActionMenu.Item>
                              <ActionMenu.Item onSelect={console.info}>
                                Under kontroll
                              </ActionMenu.Item>
                            </ActionMenu.SubContent>
                          </ActionMenu.Sub>
                        </ActionMenu.SubContent>
                      </ActionMenu.Sub>
                      <ActionMenu.Sub>
                        <ActionMenu.SubTrigger>
                          Tildel saksbehandler
                        </ActionMenu.SubTrigger>
                        <ActionMenu.SubContent>
                          <ActionMenu.Group label="Saksbehandlere">
                            <ActionMenu.Item onSelect={console.info}>
                              Ola Normann
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info}>
                              Bo Ramberg
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info} disabled>
                              Ole Olsen
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info} disabled>
                              Janne Nilssen
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info}>
                              Karin Jakobsen
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info}>
                              Kari Nordmann
                            </ActionMenu.Item>
                          </ActionMenu.Group>
                        </ActionMenu.SubContent>
                      </ActionMenu.Sub>

                      <ActionMenu.Divider />

                      <ActionMenu.Item variant="danger" onSelect={console.info}>
                        Slett sak
                      </ActionMenu.Item>
                    </ActionMenu.Group>
                  </ActionMenu.Content>
                </ActionMenu>
              </Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const data = [
  {
    id: "03121",
    status: "Avslått",
  },
  {
    id: "16066",
    status: "Mottatt",
  },
  {
    id: "18124",
    status: "Godkjent",
  },
  {
    id: "24082",
    status: "Mottatt",
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Undermenyer lar deg forenkle komplekse grensesnitt og filter ved å flytte innholdet til en godt strukturert meny. Vi anbefaler på det meste to nivåer med undermenyer.",
};
