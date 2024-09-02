import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ActionMenu defaultOpen>
      <ActionMenu.Trigger>
        <Button>Open</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Gosys">
          <ActionMenu.Item onSelect={console.info} shortcut="CTRL+P">
            Personoversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="CTRL+A">
            Arbeidsgiveroversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="CTRL+S">
            Samhandlere
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="CTRL+O">
            Oppgavestatistikk
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="CTRL+K">
            Søk journalpost
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Systemer og oppslagsverk">
          <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Aa-registeret
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>Modia</ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Du vil selv måtte legge til funksjonalitet for å lytte til tastatursnarveier.",
};
