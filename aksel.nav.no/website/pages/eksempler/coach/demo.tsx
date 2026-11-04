import { useRef } from "react";
import { Button, Coach, Table, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const opprettRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLButtonElement>(null);

  return (
    <VStack gap="space-16">
      <Coach
        steps={[
          {
            id: "velkommen",
            type: "dialog",
            allowToEndTour: true,
            title: "Velkommen til oppgavelisten!",
            description:
              "Her får du oversikt over oppgavene dine. Vi viser deg hvordan du legger til oppgaver og finner dem som gjenstår.",
          },
          {
            id: "opprett",
            type: "anchor",
            anchorRef: opprettRef,
            placement: "bottom-end",
            allowToEndTour: true,
            title: "Legg til en oppgave",
            description:
              "Bruk denne knappen når du har noe nytt å gjøre. Etter omvisningen kan du prøve å legge til en oppgave selv.",
          },
          {
            id: "filtrer",
            type: "anchor",
            anchorRef: statusRef,
            placement: "bottom-start",
            allowToEndTour: true,
            title: "Se status på oppgavene",
            description:
              "I denne kolonnen kan du se statusen på oppgavene dine.",
          },
          {
            id: "ferdig",
            type: "dialog",
            allowToEndTour: true,
            title: "Nå er du klar!",
            description: "Prøv å legge til en oppgave.",
          },
        ]}
      >
        <Coach.Mark>
          <Button ref={opprettRef}>Opprett oppgave</Button>
        </Coach.Mark>
      </Coach>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
            <Table.HeaderCell scope="col">Fødselsnr.</Table.HeaderCell>
            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.HeaderCell scope="row">Scott, Michael</Table.HeaderCell>
            <Table.DataCell>03999265463</Table.DataCell>
            <Table.DataCell>
              <span ref={statusRef}>Fullført</span>
            </Table.DataCell>
          </Table.Row>
          <Table.Row key="2">
            <Table.HeaderCell scope="row">Malone, Kevin</Table.HeaderCell>
            <Table.DataCell>02334545234</Table.DataCell>
            <Table.DataCell>Pågående</Table.DataCell>
          </Table.Row>
          <Table.Row key="3">
            <Table.HeaderCell scope="row">Schrute, Dwight</Table.HeaderCell>
            <Table.DataCell>34324234234</Table.DataCell>
            <Table.DataCell>Pågående</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 0,
  title: "Omvisning i en oppgaveliste",
  desc: "En omvisning med dialogsteg, forankrede steg og et egendefinert avslutningssteg. Coach håndterer aktivt steg.",
};
