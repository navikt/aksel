import {
  ChevronDownIcon,
  PersonPlusIcon,
  TasklistIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
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
        <ActionMenu.Group label="Sak #12345">
          <ActionMenu.Item onSelect={console.info} icon={<PersonPlusIcon />}>
            Tildel selv
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} icon={<TasklistIcon />}>
            Godkjenn
          </ActionMenu.Item>
          <ActionMenu.Divider />
          <ActionMenu.Item
            variant="danger"
            onSelect={console.info}
            icon={<TrashIcon />}
          >
            Slett sak
          </ActionMenu.Item>
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
  index: 8,
};
