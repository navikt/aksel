import {
  BarChartIcon,
  ChevronDownIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  PersonGroupIcon,
  PersonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: "20rem" }}>
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            variant="secondary-neutral"
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition="right"
          >
            Meny
          </Button>
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
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Ved å gruppere elementer i ActionMenu vil menyen bli mer oversiktlig og lettere å navigere. Dette vil være ekstra viktig for komplese menyer som inneholder ulike kontekster og funksjonalitet.",
};
