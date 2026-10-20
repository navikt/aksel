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
          Start turen
        </Button>
      </HStack>
      <Coach
        showTour={showTour}
        endTour={() => {
          setShowTour(false);
        }}
        steps={[
          {
            id: "step-1",
            type: "dialog",
            title: "Lukkbar dialog",
            allowToEndTour: true,
            description:
              "Denne dialogen kan avslutte turen ved å trykke på krysset øverst til høyre.",
          },
          {
            id: "step-2",
            type: "dialog",
            title: "Ikke lukkbar dialog",
            description:
              "Denne dialogen har ikke knapp øverst til høyre og kan ikke avslutte turen.",
          },
          {
            id: "step-3",
            type: "anchor",
            anchorRef: buttonRef,
            title: "Lukkbar anchor",
            allowToEndTour: true,
            description:
              "Denne anchoren kan avslutte Coachen ved å trykke på krysset øverst til høyre.",
          },
          {
            id: "step-4",
            type: "anchor",
            anchorRef: buttonRef,
            title: "Ikke lukkbar anchor",
            description:
              "Denne anchoren har ikke knapp øverst til høyre og kan ikke avslutte turen.",
          },
          {
            id: "step-5",
            type: "anchor",
            anchorRef: buttonRef,
            title: "Siste steg",
            description:
              "Dette er siste steg i turen og kan dermed alltid avslutte turen.",
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
  index: 3,
};
