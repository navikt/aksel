import { useRef, useState } from "react";
import { Button, Popover } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = useState(false);

  return (
    <div className="mb-10">
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
        flip={false}
        placement="right"
      >
        <Popover.Content style={{ maxWidth: "calc(50vw - 80px)" }}>
          Denne popoveren holder seg til høyre selv om det er bedre plass under,
          fordi <code>flip</code> er satt til <code>false</code>.
        </Popover.Content>
      </Popover>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "Ved å sette `flip` til `false` tvinger du popoveren til å respektere valgt `placement` selv om det ikke er plass.",
};

export const args = {
  index: 4,
};
