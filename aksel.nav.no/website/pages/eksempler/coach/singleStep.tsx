import { useRef } from "react";
import { Button, Coach } from "@navikt/ds-react";
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
      <Coach.Mark>
        <Button ref={buttonRef}>Opprett oppgave</Button>
      </Coach.Mark>
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
