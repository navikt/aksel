import { useState } from "react";
import {
  Button,
  Dialog,
  type DialogPopupProps,
  HStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

type Position = DialogPopupProps["position"];

const Example = () => {
  const [position, setPosition] = useState<Position>("center");
  const [open, setOpen] = useState(false);

  const openWithPosition = (pos: Position) => {
    setPosition(pos);
    setOpen(true);
  };

  return (
    <div>
      <PositionButtons
        onPositionSelect={openWithPosition}
        position={position}
        open={open}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup position={position} id="dialog-popup-position-example">
          <Dialog.Header>
            <Dialog.Title>Position: {position}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <PositionButtons
              onPositionSelect={openWithPosition}
              position={position}
              open={open}
            />
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

function PositionButtons({
  onPositionSelect,
  position,
  open,
}: {
  onPositionSelect: (pos: Position) => void;
  position: Position;
  open: boolean;
}) {
  const getDialogProps = (pos: Position) => {
    return {
      "aria-haspopup": "dialog" as const,
      "aria-expanded": pos === position && open,
      "aria-controls": open ? "dialog-popup-position-example" : undefined,
      onClick: () => onPositionSelect(pos),
    };
  };

  return (
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
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { minHeight: "360px" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
