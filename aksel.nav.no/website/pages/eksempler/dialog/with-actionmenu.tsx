import { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
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
          <ActionMenu.Item
            onSelect={() => setOpen(true)}
            aria-haspopup="dialog"
          >
            Åpne dialog
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Overskrift</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
              incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt
              duis laborum. Proident aute culpa qui nostrud velit adipisicing
              minim.
            </BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { minHeight: "360px" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 16,
  desc: "Merk at fokus returneres til menyknappen når dialogen lukkes, selv om dialogen ble åpnet fra en ActionMenu.",
};
