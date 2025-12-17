import { useState } from "react";
import { PencilIcon } from "@navikt/aksel-icons";
import { Button, Dialog, Table, TextField, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
            <Table.HeaderCell scope="col">Rolle</Table.HeaderCell>
            <Table.HeaderCell scope="col">Avdeling</Table.HeaderCell>
            <Table.HeaderCell aria-hidden />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {people.map((person) => (
            <Table.Row key={person.id} shadeOnHover={false}>
              <Table.HeaderCell scope="row">
                {person.firstName} {person.lastName}
              </Table.HeaderCell>
              <Table.DataCell>{person.role}</Table.DataCell>
              <Table.DataCell>{person.department}</Table.DataCell>
              <Table.DataCell>
                <Button
                  variant="tertiary-neutral"
                  size="small"
                  icon={<PencilIcon aria-hidden />}
                  onClick={() => setEditingPerson(person)}
                >
                  Rediger
                </Button>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Dialog
        open={editingPerson !== null}
        onOpenChange={() => setEditingPerson(null)}
      >
        <Dialog.Popup width="small" position="right">
          {editingPerson && (
            <EditPersonForm
              person={editingPerson}
              onClose={() => setEditingPerson(null)}
            />
          )}
        </Dialog.Popup>
      </Dialog>
    </>
  );
};

function EditPersonForm({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <Dialog.Header>
        <Dialog.Title>
          Rediger {person.firstName} {person.lastName}
        </Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        <VStack gap="space-16">
          <TextField label="Rolle" defaultValue={person.role} />
          <TextField label="Avdeling" defaultValue={person.department} />
        </VStack>
      </Dialog.Body>
      <Dialog.Footer>
        <Button type="submit">Lagre</Button>
        <Dialog.CloseTrigger>
          <Button variant="secondary">Avbryt</Button>
        </Dialog.CloseTrigger>
      </Dialog.Footer>
    </form>
  );
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
}

const people: Person[] = [
  {
    id: 1,
    firstName: "Jean-Luc",
    lastName: "Picard",
    role: "Kaptein",
    department: "Bro",
  },
  {
    id: 2,
    firstName: "William",
    lastName: "Riker",
    role: "Kommandør",
    department: "Bro",
  },
  {
    id: 3,
    firstName: "Geordi",
    lastName: "La Forge",
    role: "Sjefsingeniør",
    department: "Maskinrom",
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
  desc: "Eksempel på bruk av Dialog for å redigere data i en tabell. Dialogen åpnes ved å klikke på rediger-knappen, og lukkes ved å klikke på avbryt eller lagre.",
};
