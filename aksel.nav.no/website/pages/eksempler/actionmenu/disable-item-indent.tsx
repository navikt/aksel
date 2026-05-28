import { ChevronDownIcon, PersonIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-4">
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            data-color="neutral"
            variant="secondary"
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition="right"
          >
            Meny
          </Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Handlinger">
            <ActionMenu.Item
              onSelect={console.info}
              icon={<PersonIcon aria-hidden />}
            >
              Personoversikt
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={console.info} disableItemIndent>
              Søk journalpost
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={console.info}>
              Oppgavestatistikk
            </ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 13,
  desc: "Alle ActionMenu.Item i en ActionMenu.Group får innrykk hvis minst én av dem har en venstrestilt markør (f.eks. ikon, radio eller checkbox). Dette kan overstyres for individuelle elementer ved å bruke `disableItemIndent`-prop på ActionMenu.Item.",
};
