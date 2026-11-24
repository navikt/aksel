import { useRef } from "react";
import { Button } from "@navikt/ds-react";
import { Coach } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Coach
      type="anchor"
      anchorRef={buttonRef}
      title="Et stegs coach"
      description="Denne coachen har kun ett steg."
    >
      <Coach.ShowTourTrigger>
        <Coach.Beacon>
          <Button ref={buttonRef}>Opprett oppgave</Button>
        </Coach.Beacon>
      </Coach.ShowTourTrigger>
    </Coach>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 4,
};
