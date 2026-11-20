import { useRef } from "react";
import { Button, Coach } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Coach
      steps={[
        {
          id: "step-dialog-with-image",
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
          id: "step-anchor-with-image-and-close",
          type: "anchor",
          anchorRef: buttonRef,
          allowCancelTour: true,
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
          id: "step-anchor-with-image",
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
    >
      <Coach.ShowTourTrigger>
        <Coach.Mark>
          <Button ref={buttonRef}>Opprett oppgave</Button>
        </Coach.Mark>
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
  index: 6,
};
