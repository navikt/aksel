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
        steps={[
          {
            id: "step-1",
            type: "dialog",
            title: "Dialog med bilde",
            description: "Denne dialogen har et bilde.",
            image: (
              <img
                src="/images/og/blogg/image-1.png"
                alt="Alt-tekst for bilde"
                width="700"
              />
            ),
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: buttonRef,
            allowToEndTour: true,
            title: "Anchor med bilde",
            description:
              "Dette anchoret har et bilde, og en lukkeknapp øverst til høyre.",
            image: (
              <img
                src="/images/og/blogg/image-1.png"
                alt="Alt-tekst for bilde"
                width="700"
              />
            ),
          },
          {
            id: "step-2",
            type: "anchor",
            anchorRef: buttonRef,
            title: "Anchor med bilde",
            description: "Dette anchoret har et bilde.",
            image: (
              <img
                src="/images/og/blogg/image-2.png"
                alt="Alt-tekst for bilde"
                width="700"
              />
            ),
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
  index: 6,
};
