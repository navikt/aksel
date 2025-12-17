import {
  BarChartIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  MenuGridIcon,
  PersonGroupIcon,
  PersonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, InternalHeader, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Spacer />
      <ActionMenu>
        <ActionMenu.Trigger>
          <InternalHeader.Button>
            <MenuGridIcon fontSize="1.5rem" title="Systemer og oppslagsverk" />
          </InternalHeader.Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Gosys">
            <ActionMenu.Item onSelect={console.info} icon={<PersonIcon />}>
              Personoversikt
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={console.info} icon={<PersonGroupIcon />}>
              Arbeidsgiveroversikt
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={console.info} icon={<HandshakeIcon />}>
              Samhandlere
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={console.info}
              disabled
              icon={<BarChartIcon />}
            >
              Oppgavestatistikk
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={console.info}
              icon={<MagnifyingGlassIcon />}
            >
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

      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "18rem",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
