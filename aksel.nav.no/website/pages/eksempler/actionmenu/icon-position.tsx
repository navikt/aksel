import {
  ArrowDownRightIcon,
  ChevronDownIcon,
  CloudIcon,
  PencilIcon,
  StarIcon,
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
        <ActionMenu.Group label="Group 1">
          <ActionMenu.Item
            onSelect={() => console.info("Item 1 clicked")}
            icon={<StarIcon aria-hidden />}
          >
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Item
            onSelect={() => console.info("Item 2 clicked")}
            icon={<PencilIcon aria-hidden />}
            iconPosition="right"
          >
            Item 2
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Group 2">
          <ActionMenu.Sub>
            <ActionMenu.SubTrigger icon={<ArrowDownRightIcon aria-hidden />}>
              Submenu 1
            </ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={() => console.info("Subitem 1 clicked")}
              >
                Subitem 1
              </ActionMenu.Item>
            </ActionMenu.SubContent>
          </ActionMenu.Sub>
          <ActionMenu.Sub>
            <ActionMenu.SubTrigger
              icon={<CloudIcon aria-hidden />}
              iconPosition="right"
            >
              Submenu 2
            </ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={() => console.info("Subitem 1 clicked")}
              >
                Subitem 1
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
