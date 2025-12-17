import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import {
  Button,
  Dialog,
  HStack,
  Table,
  TextField,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [data, setData] = useState<Person[]>(initialPeople);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

  const editingPerson = data.find((p) => p.id === editingPersonId) ?? null;
  const editingIndex = editingPerson
    ? data.findIndex((p) => p.id === editingPersonId)
    : -1;

  const handleSave = (updatedPerson: Person) => {
    setData((prev) =>
      prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
    );
    setEditingPersonId(null);
  };

  const goToPrevious = () => {
    if (editingIndex > 0) {
      setEditingPersonId(data[editingIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (editingIndex < data.length - 1) {
      setEditingPersonId(data[editingIndex + 1].id);
    }
  };

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
          {data.map((person) => (
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
                  onClick={() => setEditingPersonId(person.id)}
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
        onOpenChange={() => setEditingPersonId(null)}
      >
        <Dialog.Popup width="small" position="right">
          {editingPerson && (
            <EditPersonForm
              key={editingPerson.id}
              person={editingPerson}
              onSave={handleSave}
              onPrevious={editingIndex > 0 ? goToPrevious : undefined}
              onNext={editingIndex < data.length - 1 ? goToNext : undefined}
            />
          )}
        </Dialog.Popup>
      </Dialog>
    </>
  );
};

function EditPersonForm({
  person,
  onSave,
  onPrevious,
  onNext,
}: {
  person: Person;
  onSave: (person: Person) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const [role, setRole] = useState(person.role);
  const [department, setDepartment] = useState(person.department);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ ...person, role, department });
  };

  return (
    <VStack asChild overflow="hidden">
      <form onSubmit={handleSubmit}>
        <Dialog.Header withClosebutton={false}>
          <HStack justify="space-between" align="center">
            <Dialog.Title>
              Rediger {person.firstName} {person.lastName}
            </Dialog.Title>
            <HStack gap="space-4">
              <Button
                variant="tertiary"
                size="small"
                icon={<ChevronUpIcon title="Forrige person" />}
                data-color="neutral"
                type="button"
                onClick={onPrevious}
                disabled={!onPrevious}
              />
              <Button
                variant="tertiary"
                size="small"
                icon={<ChevronDownIcon title="Neste person" />}
                data-color="neutral"
                type="button"
                onClick={onNext}
                disabled={!onNext}
              />
              <Dialog.CloseTrigger>
                <Button
                  variant="tertiary"
                  size="small"
                  icon={<XMarkIcon title="Lukk dialog" />}
                  data-color="neutral"
                  type="button"
                />
              </Dialog.CloseTrigger>
            </HStack>
          </HStack>
        </Dialog.Header>
        <Dialog.Body>
          <VStack gap="space-16">
            <TextField
              label="Rolle"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <TextField
              label="Avdeling"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Button type="submit">Lagre</Button>
          <Dialog.CloseTrigger>
            <Button variant="secondary">Avbryt</Button>
          </Dialog.CloseTrigger>
        </Dialog.Footer>
      </form>
    </VStack>
  );
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
}

const initialPeople: Person[] = [
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
  desc: "Eksempel på bruk av Dialog for å redigere data i en tabell. Endringer lagres og vises i tabellen når du klikker Lagre.",
};
