import { useState } from "react";
import { Box, Button, Dialog, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

type Position = "center" | "right" | "left" | "bottom" | "fullscreen";

const Example = () => {
  const [position, setPosition] = useState<Position>("center");
  const [open, setOpen] = useState(false);

  const popupId = "dialog-popup-position-example";

  const openWithPosition = (pos: Position) => {
    setPosition(pos);
    setOpen(true);
  };

  const getDialogProps = (pos: Position) => {
    return {
      "aria-haspopup": "dialog" as const,
      "aria-expanded": pos === position && open,
      "aria-controls": open ? popupId : undefined,
      onClick: () => openWithPosition(pos),
    };
  };

  return (
    <Box paddingBlock="space-64">
      <HStack gap="space-4">
        <Button variant="secondary" {...getDialogProps("center")}>
          Center
        </Button>
        <Button variant="secondary" {...getDialogProps("right")}>
          Right
        </Button>
        <Button variant="secondary" {...getDialogProps("left")}>
          Left
        </Button>
        <Button variant="secondary" {...getDialogProps("bottom")}>
          Bottom
        </Button>
        <Button variant="secondary" {...getDialogProps("fullscreen")}>
          Fullscreen
        </Button>
      </HStack>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup position={position} id={popupId}>
          <Dialog.Header>
            <Dialog.Title>Position: {position}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </Box>
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
