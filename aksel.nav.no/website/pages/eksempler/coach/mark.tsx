import { useRef, useState } from "react";
import { Button, Coach } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [showTour, setShowTour] = useState<boolean>(false);
  const markRef = useRef(null);
  return (
    <>
      <Coach.Mark onClick={() => setShowTour(true)}>
        <Button ref={markRef}>New feature</Button>
      </Coach.Mark>
      <Coach
        showTour={showTour}
        endTour={() => setShowTour(false)}
        steps={[
          {
            id: "new-feature",
            type: "anchor",
            anchorRef: markRef,
            title: "Ny funksjon!",
            description: "Her kan du lære om den nye funksjonen.",
          },
        ]}
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
  index: 7,
};
