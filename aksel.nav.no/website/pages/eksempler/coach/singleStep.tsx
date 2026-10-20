import { useRef, useState } from "react";
import { Button, Coach, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [showTour, setShowTour] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <HStack gap="space-16">
        <Button
          ref={buttonRef}
          onClick={() => setShowTour(true)}
          variant="secondary"
        >
          Start
        </Button>
      </HStack>
      <Coach
        showTour={showTour}
        endTour={() => {
          setShowTour(false);
        }}
        type="anchor"
        anchorRef={buttonRef}
        title="Et stegs coach"
        description="Denne coachen har kun ett steg."
      />
    </>
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
