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
        renderStep={(step, context) => {
          if (context.index === context.totalSteps - 1) {
            return context.defaultContent;
          }
          return (
            <Coach.Step>
              <Coach.Title>{step.title}</Coach.Title>
              <Coach.Image>{step.image}</Coach.Image>
              <Coach.Progress />
              <Coach.Description>{step.description}</Coach.Description>
              <Coach.Footer>
                {context.index > 0 && (
                  <Coach.PreviousTrigger>
                    <Button variant="secondary">Forrige</Button>
                  </Coach.PreviousTrigger>
                )}
                {context.index === context.totalSteps - 1 ? (
                  <Coach.CloseTrigger>
                    <Button>Lukk</Button>
                  </Coach.CloseTrigger>
                ) : (
                  <Coach.NextTrigger>
                    <Button data-color="danger">Neste</Button>
                  </Coach.NextTrigger>
                )}
              </Coach.Footer>
            </Coach.Step>
          );
        }}
        steps={[
          {
            id: "step-1",
            type: "dialog",
            title: "Ulikt format",
            description: "Denne dialogen har ulikt format fra standard.",
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: buttonRef,
            image: (
              <img
                src="/images/og/blogg/image-1.png"
                alt="Alt-tekst for bilde"
                width="700"
              />
            ),
            title: "Ulikt format",
            description: "Denne anchor-steget har ulikt format fra standard.",
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: buttonRef,
            title: "Standard format",
            description: "Denne anchor-steget har standard format.",
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
  index: 5,
};
