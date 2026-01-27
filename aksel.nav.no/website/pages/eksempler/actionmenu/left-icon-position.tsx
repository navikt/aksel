import {
  CheckmarkCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PersonIcon,
  XMarkOctagonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
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
          <ActionMenu.Item
            onSelect={console.info}
            icon={<MagnifyingGlassIcon aria-hidden />}
          >
            Søk journalpost
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Sak #12345">
          <ActionMenu.Sub>
            <ActionMenu.SubTrigger icon={<PencilIcon aria-hidden />}>
              Endre status
            </ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<CheckmarkCircleIcon aria-hidden />}
              >
                Godkjent
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<XMarkOctagonIcon aria-hidden />}
              >
                Avslått
              </ActionMenu.Item>
            </ActionMenu.SubContent>
          </ActionMenu.Sub>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
};
