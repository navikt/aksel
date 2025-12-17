import { useState } from "react";
import { PencilIcon } from "@navikt/aksel-icons";
import { Button, Dialog, Table, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<true | "trap-focus">(true);

  const currentData = TableData.find((data) => data.id === editingRow);

  return (
    <div>
      <VStack marginBlock="space-16" align="start">
        <Button
          onClick={() =>
            setModalMode((x) => (x === true ? "trap-focus" : true))
          }
        >
          Modal Mode: {modalMode === true ? "true" : "trap-focus"}
        </Button>
      </VStack>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell aria-hidden />
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Fornavn</Table.HeaderCell>
            <Table.HeaderCell textSize="medium">Etternavn</Table.HeaderCell>
            <Table.HeaderCell textSize="small">Rolle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TableData.map((data) => (
            <Table.Row key={data.id} shadeOnHover={false}>
              <Table.DataCell>
                <Button
                  variant="tertiary"
                  data-color="neutral"
                  size="small"
                  icon={<PencilIcon title="Rediger rad" />}
                  onClick={() => setEditingRow(data.id)}
                  aria-haspopup="dialog"
                  aria-expanded={data.id === editingRow}
                  aria-controls={
                    data.id === editingRow ? "dialog-popup-example" : undefined
                  }
                />
              </Table.DataCell>
              <Table.HeaderCell>{data.id}</Table.HeaderCell>
              <Table.DataCell>{data.firstName}</Table.DataCell>
              <Table.DataCell>{data.lastName}</Table.DataCell>
              <Table.DataCell>{data.role}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Dialog
        open={editingRow !== null}
        onOpenChange={() => setEditingRow(null)}
      >
        <Dialog.Popup
          width="small"
          modal={modalMode}
          position="right"
          id="dialog-popup-example"
        >
          {editingRow !== null && (
            <>
              <Dialog.Header>
                <Dialog.Title>Edit: {currentData?.firstName}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>This is the body of the dialog.</Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger>
                  <Button>Close</Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </>
          )}
        </Dialog.Popup>
      </Dialog>
    </div>
  );
};

const TableData = [
  {
    id: 1,
    firstName: "Jean-Luc",
    lastName: "Picard",
    role: "Kaptein",
  },
  {
    id: 2,
    firstName: "William",
    lastName: "Riker",
    role: "Kommandør",
  },
  {
    id: 3,
    firstName: "Geordi",
    lastName: "La Forge",
    role: "Sjefsingeniør",
  },
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 12,
  desc: 'Med modal="trap-focus" vil fokus være låst inne i dialogen, men scrolling på siden og interaksjon med elementer utenfor dialogen er fortsatt mulig. Dette er nyttig for dialoger som ikke skal blokkere hele siden. Merk at dette bare bør brukes i ekspertsystemer hvor brukeren har god kontroll over konteksten utenfor dialogen.',
};
