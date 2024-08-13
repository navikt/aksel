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
      <ActionMenu defaultOpen>
        <ActionMenu.Trigger>
          <InternalHeader.Button>
            <MenuGridIcon
              style={{ fontSize: "1.5rem" }}
              title="Systemer og oppslagsverk"
            />
          </InternalHeader.Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Gosys">
            <ActionMenu.Item
              onSelect={console.log}
              icon={<PersonIcon aria-hidden fontSize="1.25rem" />}
            >
              Personoversikt
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={console.log}
              icon={<PersonGroupIcon aria-hidden fontSize="1.25rem" />}
            >
              Arbeidsgiveroversikt
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={console.log}
              icon={<HandshakeIcon aria-hidden fontSize="1.25rem" />}
            >
              Samhandlere
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={console.log}
              disabled
              icon={<BarChartIcon aria-hidden fontSize="1.25rem" />}
            >
              Oppgavestatistikk
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={console.log}
              icon={<MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />}
            >
              Søk journalpost
            </ActionMenu.Item>
          </ActionMenu.Group>
          <ActionMenu.Separator />
          <ActionMenu.Group label="Systemer og oppslagsverk">
            <ActionMenu.Item onSelect={console.log}>A-inntekt</ActionMenu.Item>
            <ActionMenu.Item onSelect={console.log}>
              Aa-registeret
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={console.log}>Modia</ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>

      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
};
