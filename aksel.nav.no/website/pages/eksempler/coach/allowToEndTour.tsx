import { useRef } from "react";
import { Button, Coach } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Coach
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
  index: 3,
};
