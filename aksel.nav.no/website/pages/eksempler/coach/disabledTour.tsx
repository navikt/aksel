import { useRef } from "react";
import { Button, Coach } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const opprettRef = useRef<HTMLButtonElement>(null);

  return (
    <Coach
      disableTour={true}
      steps={[
        {
          id: "velkommen",
          type: "dialog",
          allowToEndTour: true,
          title: "Velkommen til oppgavelisten!",
          description:
            "Her får du oversikt over oppgavene dine. Vi viser deg hvordan du legger til oppgaver og finner dem som gjenstår.",
        },
        {
          id: "opprett",
          type: "anchor",
          anchorRef: opprettRef,
          placement: "bottom-end",
          allowToEndTour: true,
          title: "Legg til en oppgave",
          description:
            "Bruk denne knappen når du har noe nytt å gjøre. Etter omvisningen kan du prøve å legge til en oppgave selv.",
        },
      ]}
    >
      <Coach.Mark>
        <Button ref={opprettRef}>Opprett oppgave</Button>
      </Coach.Mark>
    </Coach>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 8,
  desc: "Når `disableTour` er satt til `true`, vil `Coach.Mark` ikke vises og omvisningen vil være deaktivert.",
};
