import { useId, useState } from "react";
import { Button, Popover } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openState, setOpenState] = useState(false);
  const popoverId = useId();

  return (
    <>
      <Button
        ref={setAnchorEl}
        onClick={() => setOpenState(!openState)}
        aria-expanded={openState}
        aria-controls={openState ? popoverId : undefined}
      >
        Åpne popover
      </Button>

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={anchorEl}
        offset={0}
        placement="bottom"
        id={popoverId}
      >
        <Popover.Content>offset = 0</Popover.Content>
      </Popover>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Offset er avstanden mellom elementet og popoveren, og kan overstyres.",
};
