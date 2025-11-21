import { useRef, useState } from "react";
import { Button, Popover } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = useState(false);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpenState(!openState)}
        aria-expanded={openState}
      >
        Åpne popover
      </Button>

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={buttonRef.current}
        offset={0}
        placement="bottom"
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
