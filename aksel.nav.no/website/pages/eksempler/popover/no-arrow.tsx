import { withDsExample } from "@/web/examples/withDsExample";
import { Button, Popover } from "@navikt/ds-react";
import { useRef, useState } from "react";

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
        arrow={false}
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
